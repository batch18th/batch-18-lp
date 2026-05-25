import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CalendarCheck } from "lucide-react";

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
    <main className="min-h-screen bg-[#fbf7f0] px-5 py-10 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-white/80 bg-white p-6 text-center shadow-[0_28px_90px_rgba(31,62,100,0.14)] sm:p-9 lg:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-100">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </div>

          <p className="mt-8 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Request Received
          </p>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
            Thank You! Your Free Consultation Request Has Been Received.
          </h1>

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-slate-950 shadow-[0_18px_46px_rgba(31,62,100,0.16)]">
            <div className="aspect-video">
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

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Please watch this short video carefully. Then click the button below
            to book your FREE 1:1 Digital Marketing Consultation Call.
          </p>

          <Link
            href="#"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-4 text-base font-bold text-white shadow-[0_16px_34px_rgba(36,91,150,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book My Free Consultation Call
          </Link>
        </section>
      </div>
    </main>
  );
}
