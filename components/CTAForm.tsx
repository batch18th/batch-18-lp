"use client";

import { useEffect } from "react";
import { CheckCircle2, LockKeyhole, Send, Sparkles } from "lucide-react";

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const formId = "6a09eaabc571dfdc0b696534";
const rootSelector = ".ff-6a09eaabc571dfdc0b696534";
const flodeskConfig =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJtZXNzYWdlIiwibWVzc2FnZSI6IiIsInJlZGlyZWN0VXJsIjoiIn0sImNvaSI6ZmFsc2UsInNob3dGb3JSZXR1cm5WaXNpdG9ycyI6dHJ1ZSwibm90aWZpY2F0aW9uIjpmYWxzZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ0NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWQiOmZhbHNlLCJnb29nbGVBbmFseXRpY3NJZCI6IiJ9fQ==";

type SubmissionData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

type FieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  tab: string;
  type?: string;
  required?: boolean;
  className?: string;
};

function TextField({
  id,
  label,
  name,
  placeholder,
  tab,
  type = "text",
  required = true,
  className = ""
}: FieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-bold text-ink">
        {label}
      </label>
      <input
        id={id}
        className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-ink shadow-[0_1px_0_rgba(15,23,42,0.03)] outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
        type={type}
        maxLength={255}
        name={name}
        placeholder={placeholder}
        data-ff-tab={tab}
        required={required}
      />
    </div>
  );
}

export default function CTAForm() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    const form = root?.querySelector<HTMLFormElement>('[data-ff-el="form"]');

    if (!root || !form) {
      return;
    }

    if (!document.querySelector('script[data-flodesk-universal="module"]')) {
      (function loadFlodesk(w, d, t, h, s, n) {
        w.FlodeskObject = n;
        const fn = function flodeskQueue(...args: unknown[]) {
          const current = w.fd;
          if (!current) {
            return;
          }
          current.q = current.q || [];
          current.q.push(args);
        };
        w.fd = w.fd || fn;

        const f = d.getElementsByTagName(t)[0];
        const v = "?v=" + Math.floor(new Date().getTime() / (120 * 1000)) * 60;

        const moduleScript = d.createElement("script");
        moduleScript.async = true;
        moduleScript.type = "module";
        moduleScript.src = h + s + ".mjs" + v;
        moduleScript.dataset.flodeskUniversal = "module";
        f.parentNode?.insertBefore(moduleScript, f);

        const fallbackScript = d.createElement("script");
        fallbackScript.async = true;
        fallbackScript.noModule = true;
        fallbackScript.src = h + s + ".js" + v;
        fallbackScript.dataset.flodeskUniversal = "nomodule";
        f.parentNode?.insertBefore(fallbackScript, f);
      })(window, document, "script", "https://assets.flodesk.com", "/universal", "fd");
    }

    window.fd?.("form:handle", {
      formId,
      rootEl: rootSelector
    });

    let redirectTimer: number | undefined;
    let syncStarted = false;
    let latestSubmissionData: SubmissionData | null = null;

    const collectSubmissionData = (): SubmissionData => {
      const getValue = (selector: string) =>
        root
          .querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)
          ?.value.trim() || "";

      return {
        fullName: getValue('[name="firstName"]'),
        email: getValue('[name="email"]'),
        whatsapp: getValue('[name="fields.whatsapp"]'),
        businessName: getValue('[name="fields.businessName"]'),
        website: getValue('[name="fields.websiteOrFacebookPageLink"]'),
        message: getValue('[name="fields."]')
      };
    };

    const rememberSubmissionData = () => {
      latestSubmissionData = collectSubmissionData();
    };

    const syncAfterFlodeskSuccess = async () => {
      if (syncStarted) {
        return;
      }

      if (
        root.dataset.ffStage === "success" ||
        root.classList.contains("fd-has-success") ||
        Boolean(root.querySelector(".fd-has-success"))
      ) {
        syncStarted = true;
        const submissionData = latestSubmissionData || collectSubmissionData();

        console.log("[flodesk] Successful submission detected", submissionData);

        try {
          const response = await fetch("/api/consultation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(submissionData)
          });
          const result = await response.json();

          console.log("[flodesk] Backend sync response", {
            status: response.status,
            result
          });

          if (!response.ok) {
            throw new Error(result.message || "Backend sync failed.");
          }

          window.clearTimeout(redirectTimer);
          redirectTimer = window.setTimeout(() => {
            window.location.assign("/thanks");
          }, 1800);
        } catch (error) {
          syncStarted = false;
          console.error("[flodesk] Backend sync failed", error);
        }
      }
    };

    form.addEventListener("submit", rememberSubmissionData);

    const observer = new MutationObserver(() => {
      void syncAfterFlodeskSuccess();
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-ff-stage", "class"],
      childList: true,
      subtree: true
    });

    void syncAfterFlodeskSuccess();

    return () => {
      window.clearTimeout(redirectTimer);
      form.removeEventListener("submit", rememberSubmissionData);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="book-call"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-5 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative bg-[linear-gradient(145deg,#12345a_0%,#245b96_56%,#4c8dd8_100%)] p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute inset-x-8 top-0 h-px bg-white/30" />
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-bold">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Free 1:1 consultation
            </p>

            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-normal sm:text-4xl">
              Tell me about your business and I'll guide you clearly.
            </h2>

            <p className="mt-5 text-lg leading-8 text-blue-50">
              Fill the form and I'll contact you with the next step for your
              free digital marketing consultation.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Understand what is stopping your growth",
                "Get a simple direction for more leads and sales",
                "Receive a plan made around your business"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <p className="font-semibold leading-6 text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-100"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold leading-6 text-blue-50">
                  Your details are kept private. No spam, only consultation
                  follow-up.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div
              className="ff-6a09eaabc571dfdc0b696534"
              data-ff-el="root"
              data-ff-version="3"
              data-ff-type="inline"
              data-ff-name="inlineNoImage"
              data-ff-stage="default"
            >
              <div
                data-ff-el="config"
                data-ff-config={flodeskConfig}
                className="hidden"
              />

              <form
                className="space-y-7"
                action={`https://form.flodesk.com/forms/${formId}/submit`}
                method="post"
                data-ff-el="form"
              >
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
                    Book the call
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-normal text-ink sm:text-3xl">
                    Book Your Free Consultation
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Fill in the details below and take the first step toward
                    better marketing.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2" data-ff-el="fields">
                  <TextField
                    id={`${formId}-firstName`}
                    label="Full Name *"
                    name="firstName"
                    placeholder="Enter your full name"
                    tab="firstName::email"
                  />
                  <TextField
                    id={`${formId}-email`}
                    label="Active Email *"
                    name="email"
                    type="email"
                    placeholder="Enter your active email"
                    tab="email:firstName:fields.whatsapp"
                  />
                  <TextField
                    id={`${formId}-whatsapp`}
                    label="WhatsApp Number *"
                    name="fields.whatsapp"
                    placeholder="Enter your WhatsApp number"
                    tab="fields.whatsapp:email:fields.businessName"
                  />
                  <TextField
                    id={`${formId}-businessName`}
                    label="Business Name *"
                    name="fields.businessName"
                    placeholder="Enter your business name"
                    tab="fields.businessName:fields.whatsapp:fields.websiteOrFacebookPageLink"
                  />
                  <TextField
                    id={`${formId}-website`}
                    label="Website / Facebook URL *"
                    name="fields.websiteOrFacebookPageLink"
                    placeholder="Paste your website or Facebook page link"
                    tab="fields.websiteOrFacebookPageLink:fields.businessName:fields."
                    className="sm:col-span-2"
                  />

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor={`${formId}-message`}
                      className="block text-sm font-bold text-ink"
                    >
                      Anything you want to say
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      className="min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-ink shadow-[0_1px_0_rgba(15,23,42,0.03)] outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
                      maxLength={255}
                      name="fields."
                      placeholder="Tell me what you need help with"
                      data-ff-tab="fields.:fields.websiteOrFacebookPageLink:submit"
                    />
                  </div>

                  <input
                    type="text"
                    maxLength={255}
                    name="confirm_email_address"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div data-ff-el="footer">
                  <button
                    type="submit"
                    className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-4 text-base font-bold text-white shadow-[0_18px_35px_rgba(36,91,150,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-100"
                    data-ff-el="submit"
                    data-ff-tab="submit"
                  >
                    Submit & Book My Free Call
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="mt-4 text-center text-sm font-medium leading-6 text-slate-500">
                    We respect your privacy. No spam.
                  </p>
                </div>

                <div
                  className="hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800 data-[ff-stage=success]:block"
                  data-ff-el="success"
                >
                  Thank you! Your form has been submitted successfully. We will
                  contact you soon.
                </div>

                <div
                  className="hidden rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700"
                  data-ff-el="error"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
