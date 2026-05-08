import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your consultation request has been received. Please check your email or WhatsApp for the next steps."
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center">
        <Image
          src="/logo.png"
          alt="SOM Digital"
          width={360}
          height={160}
          priority
          className="mb-10 h-auto w-48 sm:w-64"
        />

        <div className="rounded-lg border border-brand-100 bg-slate-50 p-6 shadow-soft sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-50 text-brand-700">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="mt-7 text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            Thank you. Your request is received.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            I will check your details and contact you by email or WhatsApp with
            the next step.
          </p>

          <div className="mt-8 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2">
            <div>
              <Mail className="h-5 w-5 text-brand-700" aria-hidden="true" />
              <p className="mt-3 font-semibold text-ink">Check your email</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Look for the call details and next step.
              </p>
            </div>
            <div>
              <MessageCircle
                className="h-5 w-5 text-brand-700"
                aria-hidden="true"
              />
              <p className="mt-3 font-semibold text-ink">Watch WhatsApp</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                I may message you to confirm the call.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md border border-brand-700 px-6 py-3 text-base font-semibold text-brand-800 transition hover:bg-brand-50 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Back to Landing Page
          </Link>
        </div>
      </div>
    </main>
  );
}
