"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  website: "",
  message: ""
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Active Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.whatsapp.trim()) {
    errors.whatsapp = "WhatsApp Number is required.";
  }

  if (!values.businessName.trim()) {
    errors.businessName = "Business Name is required.";
  }

  return errors;
}

export default function CTAForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSuccessMessage("");
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit the form.");
      }

      setValues(initialState);
      setSuccessMessage(
        "Thank you! Your form has been submitted successfully. We will contact you soon."
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="book-call" className="bg-white px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Book your free call
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            Tell me about your business
          </h2>
          <p className="mt-3 text-xl font-semibold text-brand-800">
            I will use this to prepare for your consultation.
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Fill out the form. After that, we will connect and talk about your
            marketing plan.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-soft sm:p-8"
        >
          {successMessage ? (
            <div
              className="mb-6 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4 text-green-800"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="font-semibold leading-6">{successMessage}</p>
            </div>
          ) : null}

          {submitError ? (
            <p
              className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 font-semibold text-red-700"
              role="alert"
            >
              {submitError}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full Name"
              id="fullName"
              value={values.fullName}
              onChange={(value) => updateField("fullName", value)}
              placeholder="Enter your full name"
              error={errors.fullName}
              required
            />
            <Field
              label="Active Email"
              id="email"
              value={values.email}
              onChange={(value) => updateField("email", value)}
              placeholder="you@example.com"
              error={errors.email}
              type="email"
              required
            />
            <Field
              label="WhatsApp Number"
              id="whatsapp"
              value={values.whatsapp}
              onChange={(value) => updateField("whatsapp", value)}
              placeholder="+977 98XXXXXXXX"
              error={errors.whatsapp}
              required
            />
            <Field
              label="Business Name"
              id="businessName"
              value={values.businessName}
              onChange={(value) => updateField("businessName", value)}
              placeholder="Your business name"
              error={errors.businessName}
              required
            />
            <Field
              label="Website / Facebook URL"
              id="website"
              value={values.website}
              onChange={(value) => updateField("website", value)}
              placeholder="https://example.com"
              error={errors.website}
              type="url"
              className="sm:col-span-2"
            />
            <Field
              label="Anything you want to say"
              id="message"
              value={values.message}
              onChange={(value) => updateField("message", value)}
              placeholder="Tell me what you need help with"
              error={errors.message}
              textarea
              className="sm:col-span-2"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? "Booking..." : "Book Free Consultation"}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </button>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
              <LockKeyhole className="h-4 w-4 text-brand-700" aria-hidden="true" />
              We respect your privacy. No spam.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  required = false,
  textarea = false,
  className = ""
}: {
  label: string;
  id: keyof FormState;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  const controlClassName =
    "mt-2 w-full rounded-md border bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";
  const borderClassName = error ? "border-red-400" : "border-slate-200";

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-brand-700"> *</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`${controlClassName} ${borderClassName} resize-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${controlClassName} ${borderClassName}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
