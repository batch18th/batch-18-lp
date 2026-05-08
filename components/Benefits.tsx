import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Know what is not working in your marketing",
  "Know what to post and promote",
  "Know how to get better leads",
  "Know where to spend your time and money",
  "Know the next steps for your business"
];

const steps = [
  {
    title: "Step 1",
    body: "Fill out the short form"
  },
  {
    title: "Step 2",
    body: "Join the 1:1 consultation call"
  },
  {
    title: "Step 3",
    body: "Get a simple plan for your business"
  }
];

export default function Benefits() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            What you will get
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            By the end of the call, you will know what to do next.
          </h2>

          <div className="mt-8 grid gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
                  aria-hidden="true"
                />
                <p className="font-medium leading-6 text-slate-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-brand-900 p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-200">
            Simple process
          </p>
          <div className="mt-7 space-y-5">
            {steps.map((step) => (
              <div key={step.title} className="border-l border-brand-300 pl-5">
                <p className="text-sm font-semibold text-brand-200">
                  {step.title}
                </p>
                <p className="mt-1 text-lg font-semibold leading-7">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
