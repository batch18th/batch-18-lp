import { Compass, LineChart, ListChecks } from "lucide-react";

const benefits = [
  {
    title: "Find what is stopping your business growth",
    body: "We look at where your current marketing is stuck and what is blocking better results.",
    icon: LineChart
  },
  {
    title: "Get a personalized marketing direction",
    body: "You get guidance that fits your business, not random advice copied from the internet.",
    icon: Compass
  },
  {
    title: "Leave the call with an actionable plan",
    body: "You will know the next steps to improve leads, customers, and sales after the call.",
    icon: ListChecks
  }
];

export default function Benefits() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Why This Call Matters
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            Get clear before spending more time and money on marketing.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold leading-7 text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{benefit.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
