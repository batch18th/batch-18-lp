import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recipientEmail = "batch18th1990@gmail.com";
const successMessage =
  "Thank you! Your form has been submitted successfully. We will contact you soon.";

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

      await transporter.sendMail({
        from,
        to: recipientEmail,
        replyTo: data.email,
        subject: `New consultation request from ${data.fullName}`,
        text: plainText,
        html
      });

      return NextResponse.json({ message: successMessage });
    }

    if (process.env.FORMSPREE_ENDPOINT) {
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

      return NextResponse.json({ message: successMessage });
    }

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

    return NextResponse.json({ message: successMessage });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
