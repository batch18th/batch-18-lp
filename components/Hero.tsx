import Image from "next/image";
import { ArrowRight, BarChart3, CheckCircle2, MessageSquareText, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#EEF4FF,transparent_34%),linear-gradient(180deg,#ffffff_0%,#F8FAFC_100%)] px-5 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-600" />

      <header className="mx-auto flex max-w-6xl justify-center py-4">
        <Image
          src="/logo.png"
          alt="SOM Digital"
          width={360}
          height={160}
          priority
          className="h-auto w-44 sm:w-56"
        />
      </header>

      <div className="mx-auto grid max-w-6xl items-center gap-12 pt-8 lg:grid-cols-[1fr_0.92fr] lg:pt-14">
        <div>
          <p className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 shadow-sm">
            Free 1:1 Digital Marketing Consultation
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-normal text-brand-900 sm:text-5xl lg:text-6xl">
            Struggling to grow your business?
          </h1>

          <p className="mt-5 max-w-2xl text-2xl font-bold leading-9 text-brand-800">
            Grab a FREE 1:1 Digital Marketing consultation call with me
          </p>

          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            In this consultation call, I&apos;ll diagnose your business and provide
            a customized Digital Marketing plan that you can immediately
            implement in your business after the call.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#book-call"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-base font-bold text-white shadow-[0_16px_36px_rgba(29,78,216,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
            >
              Book My Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-brand-100 bg-white px-6 py-3 text-base font-bold text-brand-800 shadow-sm transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus:ring-4 focus:ring-brand-100"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-brand-100/80 blur-3xl" />
          <div className="relative rounded-3xl border border-brand-100 bg-white p-5 shadow-[0_26px_80px_rgba(15,23,42,0.13)] sm:p-6">
            <div className="flex items-center justify-between border-b border-brand-100 pb-5">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Growth Snapshot
                </p>
                <p className="mt-1 text-2xl font-extrabold text-ink">
                  Marketing Plan
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <TrendingUp className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Metric label="Lead Quality" value="+42%" />
              <Metric label="Follow-up Clarity" value="+68%" />
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">Consultation Focus</p>
                <BarChart3 className="h-5 w-5 text-brand-700" aria-hidden="true" />
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Ads", "82%"],
                  ["Content", "64%"],
                  ["Landing Page", "74%"]
                ].map(([label, width]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                      <span>{label}</span>
                      <span>{width}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-brand-600"
                        style={{ width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Find the real growth problem",
                "Create a practical marketing direction",
                "Know what to do after the call"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4">
              <MessageSquareText className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <p className="text-sm font-medium leading-6 text-slate-700">
                A clear 1:1 session built to help you understand what to fix,
                what to focus on, and what to do next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-brand-600">{value}</p>
    </div>
  );
}
