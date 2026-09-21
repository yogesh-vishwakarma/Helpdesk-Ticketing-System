import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

function CTASection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-20 lg:px-8">

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#020617] via-[#082028] to-[#043A35] px-6 py-16 text-center shadow-2xl shadow-emerald-500/10 sm:px-12">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-[100px]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
            <Sparkles size={22} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            Get Started Today
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Make support simpler,

            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              faster, and more organized.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Bring customers, support executives, managers, and administrators
            together in one centralized support platform built for clarity.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
            >
              Create Account

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-emerald-400/30 hover:bg-white/[0.08] hover:text-emerald-300"
            >
              Sign In
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CTASection;