import { Link } from "react-router";
import { Ticket } from "lucide-react";

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-slate-950/60 backdrop-blur-sm">

      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

        {/* Brand */}
        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/40">
              <Ticket size={15} />
            </div>

            <p className="font-bold text-white">
              HelpDesk
            </p>

          </div>

          <p className="mt-1 text-xs text-slate-500">
            Support Management Platform
          </p>

        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-400">

          <a
            href="#features"
            className="transition hover:text-emerald-300"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-emerald-300"
          >
            How It Works
          </a>

          <a
            href="#roles"
            className="transition hover:text-emerald-300"
          >
            Roles
          </a>

          <Link
            to="/login"
            className="transition hover:text-emerald-300"
          >
            Login
          </Link>

        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          © 2026 HelpDesk. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;