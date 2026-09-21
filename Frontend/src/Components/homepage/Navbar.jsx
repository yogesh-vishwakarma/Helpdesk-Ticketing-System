import { Link } from "react-router";
import { ArrowRight, Ticket } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30 transition duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-emerald-500/50">
            <Ticket size={20} strokeWidth={2.4} />
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-extrabold tracking-tight text-white">
              HelpDesk
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
              Support Management
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            How It Works
          </a>

          <a
            href="#roles"
            className="text-sm font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            Roles
          </a>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          <Link
            to="/login"
            className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-emerald-300 sm:block"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/50"
          >
            Get Started

            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;