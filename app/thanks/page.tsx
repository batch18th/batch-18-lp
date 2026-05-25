import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailCheck, MessageSquareText, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "Request Received | SOM Digital",
  description:
    "Your free 1:1 digital marketing consultation request has been received.",
  openGraph: {
    title: "Request Received | SOM Digital",
    description:
      "Your free 1:1 digital marketing consultation request has been received.",
    url: "https://landing.sombahadurtamang.com/thanks",
    type: "website"
  }
};

const nextSteps = [
  {
    icon: MailCheck,
    text: "Check your email and phone for my confirmation message."
  },
  {
    icon: MessageSquareText,
    text: "Keep your business details and current marketing challenges ready."
  },
  {
    icon: Route,
    text: "I will guide you with a customized digital marketing plan for your business."
  }
];

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f0] px-5 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-white/80 bg-white p-6 text-center shadow-[0_28px_90px_rgba(31,62,100,0.14)] sm:p-10 lg:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-100">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </div>

          <p className="mt-8 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            REQUEST RECEIVED
          </p>

          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
            Your Free 1:1 Digital Marketing Consultation Request Has Been
            Received.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Thank you for sharing your details. I will review your business
            information and contact you shortly through your active email or
            phone number with the next steps.
          </p>

          <div className="mt-9 overflow-hidden rounded-3xl border border-slate-100 bg-slate-950 shadow-[0_18px_46px_rgba(31,62,100,0.16)]">
            <div className="aspect-video">
              <iframe
                src="https://player.vimeo.com/video/1195289270?badge=0&autopause=0&player_id=0&app_id=58479"
                title="Digital marketing consultation next steps"
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-9 rounded-3xl border border-slate-100 bg-[#fcfdff] p-5 text-left sm:p-7">
            <h2 className="text-center text-2xl font-bold tracking-normal text-ink">
              What happens next?
            </h2>

            <div className="mt-6 grid gap-4">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.text}
                    className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_32px_rgba(31,62,100,0.06)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-700">
                        Step {index + 1}
                      </p>
                      <p className="mt-1 text-base font-semibold leading-7 text-slate-700">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-xl text-sm font-semibold leading-6 text-slate-500">
            Need immediate help? Contact: batch18th1990@gmail.com
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-700 px-7 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(36,91,150,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
