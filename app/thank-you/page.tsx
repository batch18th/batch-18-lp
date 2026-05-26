import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailCheck, PhoneCall, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | SOM Digital",
  description:
    "Your free digital marketing consultation request has been received.",
  openGraph: {
    title: "Thank You | SOM Digital",
    description:
      "Your free digital marketing consultation request has been received.",
    url: "https://landing.sombahadurtamang.com/thank-you",
    type: "website"
  }
};

const nextSteps = [
  {
    icon: MailCheck,
    text: "I will review your business details."
  },
  {
    icon: PhoneCall,
    text: "I will contact you to confirm your consultation call."
  },
  {
    icon: Route,
    text: "During the call, I will provide a customized digital marketing plan for your business."
  }
];

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f0] px-4 py-6 text-ink sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <section className="w-full rounded-[1.75rem] border border-white/80 bg-white p-4 text-center shadow-[0_28px_90px_rgba(31,62,100,0.14)] sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-100 sm:h-16 sm:w-16">
            <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
          </div>

          <p className="mt-7 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Request Received
          </p>

          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
            Thank You! Your Free Consultation Request Has Been Received.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            I&apos;ll review your details and contact you soon to schedule your
            1:1 Digital Marketing Consultation Call.
          </p>

          <div className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-950 shadow-[0_18px_46px_rgba(31,62,100,0.16)] sm:rounded-3xl">
            <div className="aspect-video w-full">
              <iframe
                src="https://player.vimeo.com/video/1195289270?badge=0&autopause=0&player_id=0&app_id=58479"
                title="Free digital marketing consultation next steps"
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mx-auto mt-7 max-w-4xl rounded-3xl border border-slate-100 bg-[#fcfdff] p-4 text-left sm:p-6">
            <h2 className="text-center text-2xl font-bold tracking-normal text-ink">
              What happens next?
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.text}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_32px_rgba(31,62,100,0.06)]"
                  >
                    <div className="flex items-start gap-3 md:block">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 md:mx-auto">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="md:mt-4 md:text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-700">
                          Step {index + 1}
                        </p>
                        <p className="mt-1 text-base font-semibold leading-7 text-slate-700">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-700 px-7 py-3 text-base font-bold text-white shadow-[0_16px_34px_rgba(36,91,150,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
