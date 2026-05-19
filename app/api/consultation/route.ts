import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recipientEmail = "batch18th1990@gmail.com";
const successMessage =
  "Thank you! Your form has been submitted successfully. We will contact you soon.";
const defaultSheetName = "Consultation Leads";
const sheetHeaders = [
  "Submitted At",
  "Full Name",
  "Active Email",
  "WhatsApp Number",
  "Business Name",
  "Website / Facebook URL",
  "Message"
];

type ConsultationRequest = {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  businessName?: string;
  website?: string;
  message?: string;
};

function required(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

async function signJwt(unsignedToken: string, privateKey: string) {
  const crypto = await import("node:crypto");
  const normalizedKey = privateKey.replace(/\\n/g, "\n");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  return base64Url(signer.sign(normalizedKey));
}

async function getGoogleAccessToken() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!serviceAccountEmail || !privateKey) {
    throw new Error(
      "Google Sheets is not configured. Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY."
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    })
  );
  const unsignedToken = `${header}.${claim}`;
  const signature = await signJwt(unsignedToken, privateKey);
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const result = (await response.json()) as { access_token?: string; error?: string };

  if (!response.ok || !result.access_token) {
    console.error("[consultation] Google token error", result);
    throw new Error("Unable to authenticate with Google Sheets.");
  }

  return result.access_token;
}

async function googleSheetsRequest<T>(
  accessToken: string,
  url: string,
  init?: RequestInit
) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });
  const text = await response.text();
  const result = text ? (JSON.parse(text) as T) : ({} as T);

  if (!response.ok) {
    console.error("[consultation] Google Sheets request error", {
      status: response.status,
      url,
      result
    });
    throw new Error("Google Sheets request failed.");
  }

  return result;
}

async function appendToGoogleSheet(data: ConsultationRequest) {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || defaultSheetName;

  console.log("[consultation] Google Sheets target", {
    GOOGLE_SPREADSHEET_ID: spreadsheetId || "NOT CONFIGURED",
    GOOGLE_SHEET_NAME: sheetName
  });

  if (!spreadsheetId) {
    throw new Error("Google Sheets is not configured. Missing GOOGLE_SPREADSHEET_ID.");
  }

  const accessToken = await getGoogleAccessToken();
  const encodedSpreadsheetId = encodeURIComponent(spreadsheetId);
  const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodedSpreadsheetId}`;

  const metadata = await googleSheetsRequest<{
    sheets?: Array<{ properties?: { title?: string } }>;
  }>(accessToken, metadataUrl);

  const tabExists = metadata.sheets?.some(
    (sheet) => sheet.properties?.title === sheetName
  );

  if (!tabExists) {
    console.log("[consultation] Google Sheet tab missing. Creating tab.", {
      sheetName
    });

    const createTabResponse = await googleSheetsRequest<unknown>(
      accessToken,
      `${metadataUrl}:batchUpdate`,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName
                }
              }
            }
          ]
        })
      }
    );

    console.log("[consultation] Google Sheet tab created", createTabResponse);

    const headerResponse = await googleSheetsRequest<unknown>(
      accessToken,
      `https://sheets.googleapis.com/v4/spreadsheets/${encodedSpreadsheetId}/values/${encodeURIComponent(
        `${sheetName}!A1:G1`
      )}?valueInputOption=USER_ENTERED`,
      {
        method: "PUT",
        body: JSON.stringify({
          values: [sheetHeaders]
        })
      }
    );

    console.log("[consultation] Google Sheet headers written", headerResponse);
  }

  const appendResponse = await googleSheetsRequest<unknown>(
    accessToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${encodedSpreadsheetId}/values/${encodeURIComponent(
      `${sheetName}!A:G`
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({
        values: [
          [
            new Date().toISOString(),
            data.fullName || "",
            data.email || "",
            data.whatsapp || "",
            data.businessName || "",
            data.website || "",
            data.message || ""
          ]
        ]
      })
    }
  );

  console.log("[consultation] Google Sheets append response", appendResponse);

  return {
    spreadsheetId,
    sheetName,
    appendResponse
  };
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ConsultationRequest;

    if (
      !required(data.fullName) ||
      !isEmail(data.email) ||
      !required(data.whatsapp) ||
      !required(data.businessName)
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields correctly." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? user;

    const plainText = [
      "New landing page form submission",
      "",
      `Name: ${data.fullName}`,
      `Phone number: ${data.whatsapp}`,
      `Email address: ${data.email}`,
      `Business name: ${data.businessName}`,
      `Website / Facebook URL: ${data.website || "Not provided"}`,
      "",
      "Message or requirements:",
      data.message || "Not provided"
    ].join("\n");

    const html = `
      <h2>New landing page form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Phone number:</strong> ${escapeHtml(data.whatsapp)}</p>
      <p><strong>Email address:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Business name:</strong> ${escapeHtml(data.businessName)}</p>
      <p><strong>Website / Facebook URL:</strong> ${escapeHtml(
        data.website || "Not provided"
      )}</p>
      <p><strong>Message or requirements:</strong></p>
      <p>${escapeHtml(data.message || "Not provided").replaceAll("\n", "<br />")}</p>
    `;

    const sheetResult = await appendToGoogleSheet(data);

    if (host && user && pass && from) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass
        }
      });

      console.log("[consultation] Sending email using SMTP", {
        to: recipientEmail,
        from,
        replyTo: data.email
      });

      const emailResponse = await transporter.sendMail({
        from,
        to: recipientEmail,
        replyTo: data.email,
        subject: `New consultation request from ${data.fullName}`,
        text: plainText,
        html
      });

      console.log("[consultation] SMTP email response", emailResponse);

      return NextResponse.json({
        message: successMessage,
        emailRecipient: recipientEmail,
        googleSpreadsheetId: sheetResult.spreadsheetId,
        googleSheetName: sheetResult.sheetName
      });
    }

    if (process.env.FORMSPREE_ENDPOINT) {
      console.log("[consultation] Sending email using Formspree", {
        endpoint: process.env.FORMSPREE_ENDPOINT,
        to: recipientEmail
      });

      const formspreeResponse = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "Full Name": data.fullName,
          "Active Email": data.email,
          "WhatsApp Number": data.whatsapp,
          "Business Name": data.businessName,
          "Website / Facebook URL": data.website || "Not provided",
          Message: data.message || "Not provided",
          _replyto: data.email
        })
      });

      if (!formspreeResponse.ok) {
        throw new Error("Formspree submission failed.");
      }

      const formspreeBody = await formspreeResponse.text();
      console.log("[consultation] Formspree response", {
        status: formspreeResponse.status,
        body: formspreeBody
      });

      return NextResponse.json({
        message: successMessage,
        emailRecipient: recipientEmail,
        googleSpreadsheetId: sheetResult.spreadsheetId,
        googleSheetName: sheetResult.sheetName
      });
    }

    console.log("[consultation] Sending email using FormSubmit", {
      to: recipientEmail
    });

    const formSubmitResponse = await fetch(
      `https://formsubmit.co/ajax/${recipientEmail}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _subject: `New consultation request from ${data.fullName}`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          "Full Name": data.fullName,
          "Active Email": data.email,
          "WhatsApp Number": data.whatsapp,
          "Business Name": data.businessName,
          "Website / Facebook URL": data.website || "Not provided",
          Message: data.message || "Not provided",
          "Plain Text Backup": plainText,
          "HTML Backup": html
        })
      }
    );

    if (!formSubmitResponse.ok) {
      throw new Error("FormSubmit submission failed.");
    }

    const formSubmitBody = await formSubmitResponse.text();
    console.log("[consultation] FormSubmit response", {
      status: formSubmitResponse.status,
      body: formSubmitBody
    });

    return NextResponse.json({
      message: successMessage,
      emailRecipient: recipientEmail,
      googleSpreadsheetId: sheetResult.spreadsheetId,
      googleSheetName: sheetResult.sheetName
    });
  } catch (error) {
    console.error("[consultation] Submission processing failed", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
      },
      { status: 500 }
    );
  }
}
