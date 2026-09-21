import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock3,
  Ticket,
} from "lucide-react";

function HeroSection() {
  const stats = [
    {
      label: "Total",
      value: "248",
      icon: Ticket,
      text: "text-white",
      bg: "bg-white/[0.06]",
    },
    {
      label: "Open",
      value: "42",
      icon: Clock3,
      text: "text-orange-300",
      bg: "bg-orange-400/15",
    },
    {
      label: "Progress",
      value: "31",
      icon: BarChart3,
      text: "text-cyan-300",
      bg: "bg-cyan-400/15",
    },
    {
      label: "Resolved",
      value: "175",
      icon: CheckCircle2,
      text: "text-emerald-300",
      bg: "bg-emerald-400/15",
    },
  ];

  const recentTickets = [
    {
      title: "Unable to login",
      priority: "Critical",
      status: "Open",
      statusClass: "text-orange-300",
      priorityClass: "text-red-400",
    },
    {
      title: "Payment problem",
      priority: "High",
      status: "In Progress",
      statusClass: "text-cyan-300",
      priorityClass: "text-orange-300",
    },
    {
      title: "Account update",
      priority: "Medium",
      status: "Resolved",
      statusClass: "text-emerald-300",
      priorityClass: "text-amber-300",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">

      {/* Hero Glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">

        {/* Left Content */}
        <div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 shadow-sm backdrop-blur-sm">
            Smart Support Management
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Support requests,

            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              handled beautifully.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            HelpDesk brings customers, support executives, managers, and
            administrators together in one clean, organized support platform —
            from the first ticket to the final resolution.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              Create Your Account

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-slate-300 backdrop-blur-sm transition duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-emerald-300"
            >
              See How It Works
            </a>

          </div>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {[
              "Centralized tickets",
              "Role-based access",
              "Organized workflow",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-slate-400"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20">
                  <Check size={12} strokeWidth={3} />
                </span>

                {item}
              </div>
            ))}
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="relative">

          <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">

            <div className="overflow-hidden rounded-2xl bg-slate-900/80">

              {/* Browser Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-slate-950/60 px-4 py-3">

                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>

                <div className="rounded-md bg-white/[0.04] px-4 py-1 text-[9px] font-medium text-slate-500">
                  helpdesk / dashboard
                </div>

                <div className="w-8" />

              </div>

              <div className="p-4 sm:p-5">

                {/* Dashboard Heading */}
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-medium text-slate-500">
                      Support Dashboard
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-white">
                      Overview
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>

                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">

                  {stats.map((stat) => {
                    const StatIcon = stat.icon;

                    return (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                      >
                        <div className="flex items-center justify-between">

                          <p className="text-[10px] font-medium text-slate-500">
                            {stat.label}
                          </p>

                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-md ${stat.bg}`}
                          >
                            <StatIcon
                              size={12}
                              className={stat.text}
                            />
                          </div>

                        </div>

                        <p
                          className={`mt-1 text-xl font-black ${stat.text}`}
                        >
                          {stat.value}
                        </p>
                      </div>
                    );
                  })}

                </div>

                {/* Recent Tickets */}
                <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">

                  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                    <p className="text-xs font-bold text-white">
                      Recent Tickets
                    </p>

                    <span className="text-[10px] font-semibold text-emerald-400">
                      View all
                    </span>
                  </div>

                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.title}
                      className="flex items-center justify-between gap-3 border-b border-white/[0.04] px-4 py-3 last:border-0"
                    >
                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                          <Ticket size={14} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white">
                            {ticket.title}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-500">
                            Customer support request
                          </p>
                        </div>

                      </div>

                      <div className="shrink-0 text-right">
                        <p
                          className={`text-[10px] font-bold ${ticket.priorityClass}`}
                        >
                          {ticket.priority}
                        </p>

                        <p
                          className={`mt-0.5 text-[10px] font-semibold ${ticket.statusClass}`}
                        >
                          {ticket.status}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/[0.08] bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-left-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-white">
                  Ticket Resolved
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                  Support team completed the request
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;