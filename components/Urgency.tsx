import { Clock3 } from "lucide-react";

export default function Urgency() {
  return (
    <section className="bg-slate-50 px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-lg border border-brand-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          <Clock3 className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xl font-bold text-ink">
            Free consultation slots are limited.
          </p>
          <p className="mt-2 leading-7 text-slate-600">
            Book your call now so you can get clear before spending more time or
            money on marketing.
          </p>
        </div>
      </div>
    </section>
  );
}
