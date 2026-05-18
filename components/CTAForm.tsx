"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const flodeskMarkup = `
<link rel="preload" href="https://assets.flodesk.com/flodesk-sans.css" as="style">
<link rel="stylesheet" href="https://assets.flodesk.com/flodesk-sans.css">
<style>
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 *,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 *::before,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 *::after { box-sizing: border-box; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 [tabindex="-1"]:focus { outline: none !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h1,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h2,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h3,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h4,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h5,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 h6 { margin-top: 0; margin-bottom: 0.7em; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 p { margin-top: 0; margin-bottom: 1rem; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 ol,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 ul,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 dl { margin-top: 0; margin-bottom: 1.4rem; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 label { display: inline-block; font-weight: bolder; margin-bottom: 0.7rem; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 input,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 button,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 select,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 textarea { margin: 0; font-size: inherit; font-family: inherit; line-height: inherit; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 [hidden] { display: none !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-control { width: 100%; display: block; outline: none; position: relative; -webkit-appearance: none; appearance: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-control::placeholder { color: transparent !important; opacity: 0 !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-label { top: 0; left: 0; right: 0; margin: 0; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-control:not(:placeholder-shown)+.fd-form-label { opacity: 0; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-feedback { margin: 5px 0 0 0; font-size: 0.8em; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group { margin: 0 0 15px; position: relative; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-success .fd-form-feedback,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-success .fd-form-check { color: #02dba8 !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-success .fd-form-control { color: #02dba8 !important; border-color: #02dba8 !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-error .fd-form-feedback,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-error .fd-form-check { color: #C84E41 !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-error .fd-form-control { color: #C84E41 !important; border-color: #C84E41 !important; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-group.fd-has-error .fd-form-feedback { display: block; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-btn { cursor: pointer; display: inline-flex; outline: none; max-width: 100%; -webkit-appearance: none; appearance: none; font-style: normal; text-align: center; align-items: center; text-shadow: none; white-space: normal; justify-content: center; text-decoration: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-content { position: relative; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-has-success .fd-form-content { display: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-success { width: 100%; display: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-has-success .fd-form-success,
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534[data-ff-stage="success"] .ff-6a09eaabc571dfdc0b696534__success { display: block; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-form-error { display: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .fd-has-error .fd-form-error { display: block; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__container { margin: 0 auto; overflow: hidden; position: relative; max-width: 620px; background: #ffffff; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__wrapper { display: flex; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__form { color: #333333; width: 100%; margin: 0; padding: 70px; font-size: 16px; text-align: center; font-family: Helvetica, sans-serif; font-weight: 300; line-height: 1.6; letter-spacing: 0.1px; text-transform: none; }
  @media (max-width: 767px) { [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__form { padding: 25px; word-wrap: anywhere; word-break: break-word; white-space: normal; overflow-wrap: break-word; } }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__title { color: #000000; width: 100%; margin: 0 0 25px 0; display: block; font-size: 37px; text-align: center; font-family: Helvetica, sans-serif; font-weight: 700; line-height: 1; letter-spacing: 0px; text-transform: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__subtitle { width: 100%; margin: 0 0 30px 0; display: block; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534[data-ff-stage="success"] .ff-6a09eaabc571dfdc0b696534__content { display: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__fields { margin: 0 0 15px; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__field { font-size: 13px; text-align: left; font-family: Helvetica, sans-serif; font-weight: 400; letter-spacing: 0.1px; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__control { color: #000000; border: 1px solid #dddddd; height: 46px; padding: 12px 20px; font-size: 13px; background: transparent; text-align: left; font-family: Helvetica, sans-serif; font-weight: 400; line-height: 20px; border-radius: 0px; letter-spacing: 0.1px; text-transform: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__label { color: #000000; border: 1px solid transparent; padding: 12px 20px; font-size: 13px; text-align: left; font-family: Helvetica, sans-serif; font-weight: 400; line-height: 20px; letter-spacing: 0.1px; text-transform: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__footer { text-align: center; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__button { color: #ffffff; width: 100%; border: 1px solid #000000; display: inline-block; padding: 12px 20px; font-size: 13px; background: #000000; text-align: center; font-family: Helvetica, sans-serif; font-weight: 400; line-height: 20px; border-radius: 0px; letter-spacing: 0.1px; text-transform: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__success { display: none; }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__success-message { color: #333333; width: 100%; display: block; font-size: 16px; word-wrap: anywhere; min-height: 1.6em; text-align: center; word-break: break-word; font-family: Helvetica, sans-serif; font-weight: 300; line-height: 1.6; white-space: normal; overflow-wrap: break-word; letter-spacing: 0.1px; pointer-events: auto; text-transform: none; }
</style>
<style>
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__container {
    max-width: 100%;
    border-radius: 1.25rem;
    background: transparent;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__form {
    padding: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    text-align: left;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__title {
    color: #102033;
    font-family: inherit;
    font-size: 30px;
    line-height: 1.08;
    text-align: left;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__subtitle {
    color: #475569;
    font-size: 16px;
    line-height: 1.7;
    text-align: left;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__fields {
    display: grid;
    gap: 16px;
    margin-bottom: 22px;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__field {
    margin: 0;
    font-family: inherit;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__control {
    min-height: 52px;
    border: 1px solid #dbe4ef;
    border-radius: 0.5rem;
    background: #ffffff;
    color: #102033;
    font-family: inherit;
    font-size: 16px;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__control:focus {
    border-color: #245b96;
    box-shadow: 0 0 0 4px rgba(36, 91, 150, 0.12);
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__label {
    color: #64748b;
    font-family: inherit;
    font-size: 15px;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__button {
    min-height: 52px;
    border: 1px solid #245b96;
    border-radius: 0.5rem;
    background: #245b96;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    transition: transform 180ms ease, background 180ms ease;
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__button:hover {
    background: #224977;
    transform: translateY(-1px);
  }
  [data-ff-el="root"].ff-6a09eaabc571dfdc0b696534 .ff-6a09eaabc571dfdc0b696534__success-message {
    border: 1px solid #bbf7d0;
    border-radius: 0.75rem;
    background: #f0fdf4;
    color: #166534;
    padding: 16px;
    font-family: inherit;
    font-weight: 700;
    text-align: left;
  }
</style>

<div class="ff-6a09eaabc571dfdc0b696534" data-ff-el="root" data-ff-version="3" data-ff-type="inline" data-ff-name="inlineNoImage" data-ff-stage="default">
  <!--tpl {% block config %} tpl-->
  <div data-ff-el="config" data-ff-config="eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJtZXNzYWdlIiwibWVzc2FnZSI6IiIsInJlZGlyZWN0VXJsIjoiIn0sImNvaSI6ZmFsc2UsInNob3dGb3JSZXR1cm5WaXNpdG9ycyI6dHJ1ZSwibm90aWZpY2F0aW9uIjpmYWxzZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ0NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWQiOmZhbHNlLCJnb29nbGVBbmFseXRpY3NJZCI6IiJ9fQ==" style="display: none"></div>
  <!--tpl {% endblock %} tpl-->
  <div class="ff-6a09eaabc571dfdc0b696534__container">
    <div class="ff-6a09eaabc571dfdc0b696534__wrapper">
      <form class="ff-6a09eaabc571dfdc0b696534__form" action="https://form.flodesk.com/forms/6a09eaabc571dfdc0b696534/submit" method="post" data-ff-el="form">
        <div class="ff-6a09eaabc571dfdc0b696534__title">
          <div style="word-break:break-word">
            <div data-paragraph="true">Free 1:1 Consultation Call</div>
          </div>
        </div>
        <div class="ff-6a09eaabc571dfdc0b696534__subtitle">
          <div style="word-break:break-word">
            <div data-paragraph="true">Book a Free Digital Marketing consultation call with me and get a customized digital marketing &nbsp;strategy for your business.</div>
          </div>
        </div>
        <div class="ff-6a09eaabc571dfdc0b696534__content fd-form-content" data-ff-el="content">
          <div class="ff-6a09eaabc571dfdc0b696534__fields" data-ff-el="fields">
            <!--tpl {% block fields %} tpl-->

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-firstName" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="firstName" placeholder="First name" data-ff-tab="firstName::email" required />
              <label for="ff-6a09eaabc571dfdc0b696534-firstName" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div>First name</div></div></label>
            </div>

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-email" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="email" placeholder="Email address" data-ff-tab="email:firstName:fields.whatsapp" required />
              <label for="ff-6a09eaabc571dfdc0b696534-email" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div>Email address</div></div></label>
            </div>

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-IaGkVaFuj0" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="fields.whatsapp" placeholder="WhatsApp Number" data-ff-tab="fields.whatsapp:email:fields.businessName" required />
              <label for="ff-6a09eaabc571dfdc0b696534-IaGkVaFuj0" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div>WhatsApp Number</div></div></label>
            </div>

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-U2CVEt4L8q" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="fields.businessName" placeholder="Business Name" data-ff-tab="fields.businessName:fields.whatsapp:fields.websiteOrFacebookPageLink" required />
              <label for="ff-6a09eaabc571dfdc0b696534-U2CVEt4L8q" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div>Business Name</div></div></label>
            </div>

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-PQT5xHpiUA" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="fields.websiteOrFacebookPageLink" placeholder="Website or Facebook Page Link" data-ff-tab="fields.websiteOrFacebookPageLink:fields.businessName:fields." required />
              <label for="ff-6a09eaabc571dfdc0b696534-PQT5xHpiUA" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div>Website or Facebook Page Link</div></div></label>
            </div>

            <div class="ff-6a09eaabc571dfdc0b696534__field fd-form-group">
              <input id="ff-6a09eaabc571dfdc0b696534-2cSojY0roQ" class="ff-6a09eaabc571dfdc0b696534__control fd-form-control" type="text" maxlength="255" name="fields." placeholder="" data-ff-tab="fields.:fields.websiteOrFacebookPageLink:submit" />
              <label for="ff-6a09eaabc571dfdc0b696534-2cSojY0roQ" class="ff-6a09eaabc571dfdc0b696534__label fd-form-label"><div><div></div></div></label>
            </div>

            <input type="text" maxlength="255" name="confirm_email_address" style="display: none" />
            <!--tpl {% endblock %} tpl-->
          </div>

          <div class="ff-6a09eaabc571dfdc0b696534__footer" data-ff-el="footer">
            <button type="submit" class="ff-6a09eaabc571dfdc0b696534__button fd-btn" data-ff-el="submit" data-ff-tab="submit">
              <div><span data-draw-element="editable">Subscribe</span></div>
            </button>
          </div>
        </div>
        <div class="ff-6a09eaabc571dfdc0b696534__success fd-form-success" data-ff-el="success">
          <div class="ff-6a09eaabc571dfdc0b696534__success-message"><div><div><div data-paragraph="true">Thank you for subscribing!</div></div></div></div>
        </div>
        <div class="ff-6a09eaabc571dfdc0b696534__error fd-form-error" data-ff-el="error"></div>
      </form>
    </div>
  </div>
</div>
`;

export default function CTAForm() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(
      ".ff-6a09eaabc571dfdc0b696534"
    );

    if (!root) {
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
        const sm = d.createElement("script");
        sm.async = true;
        sm.type = "module";
        sm.src = h + s + ".mjs" + v;
        sm.dataset.flodeskUniversal = "module";
        f.parentNode?.insertBefore(sm, f);
        const sn = d.createElement("script");
        sn.async = true;
        sn.noModule = true;
        sn.src = h + s + ".js" + v;
        sn.dataset.flodeskUniversal = "nomodule";
        f.parentNode?.insertBefore(sn, f);
      })(window, document, "script", "https://assets.flodesk.com", "/universal", "fd");
    }

    window.fd?.("form:handle", {
      formId: "6a09eaabc571dfdc0b696534",
      rootEl: ".ff-6a09eaabc571dfdc0b696534"
    });

    let redirectTimer: number | undefined;
    const redirectAfterSuccess = () => {
      if (
        root.dataset.ffStage === "success" ||
        root.classList.contains("fd-has-success") ||
        Boolean(root.querySelector(".fd-has-success"))
      ) {
        window.clearTimeout(redirectTimer);
        redirectTimer = window.setTimeout(() => {
          window.location.assign("/thanks");
        }, 1800);
      }
    };

    const observer = new MutationObserver(redirectAfterSuccess);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-ff-stage", "class"],
      childList: true,
      subtree: true
    });

    redirectAfterSuccess();

    return () => {
      window.clearTimeout(redirectTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="book-call"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-brand-100 bg-white p-5 shadow-soft sm:p-8 lg:grid-cols-[0.82fr_1fr] lg:items-start lg:p-10">
        <div className="lg:sticky lg:top-8">
          <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
            Book your free call
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            Tell me about your business
          </h2>
          <p className="mt-4 text-xl font-semibold leading-8 text-brand-800">
            Submit this Flodesk form and your details will be captured inside
            Flodesk.
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            After Flodesk confirms the submission, you will be redirected to the
            next page.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-5">
            {[
              "Flodesk lead capture stays active",
              "Your email automation can still trigger",
              "You will be redirected only after successful submission"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
                  aria-hidden="true"
                />
                <p className="font-semibold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
          dangerouslySetInnerHTML={{ __html: flodeskMarkup }}
        />
      </div>
    </section>
  );
}
