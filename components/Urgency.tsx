import { ArrowRight } from "lucide-react";

export default function Urgency() {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-[linear-gradient(135deg,#224977_0%,#245b96_100%)] px-6 py-12 text-center text-white shadow-soft sm:px-10 lg:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
          Free strategy call
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-normal sm:text-4xl">
          Ready to get a clear digital marketing plan for your business?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-50">
          If you are not sure what to do next, this call will help you get
          clarity and direction.
        </p>
        <a
          href="#book-call"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-50 focus:outline-none focus:ring-4 focus:ring-white/30"
        >
          Book My Free Consultation
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
