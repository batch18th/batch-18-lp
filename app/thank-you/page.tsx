import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | SOM Digital",
  description:
    "Thank you. Your free 1:1 consultation request has been received.",
  openGraph: {
    title: "Thank You | SOM Digital",
    description:
      "Your free 1:1 consultation request has been received.",
    url: "https://landing.sombahadurtamang.com/thank-you",
    type: "website"
  }
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-5 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-brand-100 bg-white p-7 text-center shadow-soft sm:p-10 lg:p-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-100">
            <CheckCircle2 className="h-11 w-11" aria-hidden="true" />
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
            Request Received
          </p>

          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
            Thank You! Your Free 1:1 Consultation Request Has Been Received.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            I will review your business details and contact you shortly through
            email or phone.
          </p>

          <Link
            href="/"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-700 px-7 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(36,91,150,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
