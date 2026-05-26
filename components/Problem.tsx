import { CheckCircle2, UsersRound } from "lucide-react";

const checklist = [
  "Business growth diagnosis",
  "Marketing gap analysis",
  "Customized digital marketing strategy",
  "Immediate next steps to implement"
];

const audience = [
  "Business owners struggling to get leads",
  "Businesses not getting enough sales",
  "Owners confused about what marketing strategy to follow"
];

export default function Problem() {
  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-brand-100 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-600">
            What You&apos;ll Get in the Consultation
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            A clear plan you can use right away.
          </h2>
          <div className="mt-8 space-y-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
                  aria-hidden="true"
                />
                <p className="font-semibold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-brand-100 bg-[linear-gradient(135deg,#ffffff_0%,#EEF4FF_100%)] p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <UsersRound className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-brand-600">
            Who This Is For
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-ink sm:text-4xl">
            Built for business owners who want more customers.
          </h2>
          <div className="mt-8 space-y-4">
            {audience.map((item) => (
              <div key={item} className="rounded-xl border border-white/80 bg-white/80 p-4">
                <p className="font-semibold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
