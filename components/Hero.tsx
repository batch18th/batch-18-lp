import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-700" />
      <div className="mx-auto grid min-h-[86vh] max-w-6xl items-center gap-10 px-5 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <Image
            src="/logo.png"
            alt="SOM Digital"
            width={360}
            height={160}
            priority
            className="mb-10 h-auto w-48 sm:w-64"
          />

          <p className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
            Free 1:1 Marketing Call
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl lg:text-6xl">
            Get a Simple Marketing Plan for Your Business
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Book a free call. I will look at your business and tell you what to
            do next to get more inquiries, leads, and sales.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#book-call"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-brand-700 px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-200"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            <p className="text-sm font-medium text-slate-500">
              No payment. No pressure. Just clear advice.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg border border-brand-100 bg-brand-50 p-5 shadow-soft sm:p-7">
            <p className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
              What happens on the call?
            </p>
            <div className="mt-7 divide-y divide-brand-200 border-y border-brand-200">
              {[
                "We talk about your business",
                "We find what is not working",
                "You get a clear plan for what to do next"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 py-4 text-base font-semibold text-slate-700"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
