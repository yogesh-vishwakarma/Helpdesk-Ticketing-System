import {
  Check,
  Headphones,
  Ticket,
  Users,
  Zap,
} from "lucide-react";

function LoginSidePanel() {
  const features = [
    {
      icon: Ticket,
      title: "Centralized Tickets",
      description:
        "Manage every support request from one organized workspace.",
      iconClass:
        "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Keep customer communication and internal discussions together.",
      iconClass:
        "bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20",
    },
    {
      icon: Zap,
      title: "Track Progress",
      description:
        "Follow tickets from creation through resolution.",
      iconClass:
        "bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/20",
    },
  ];

  return (
    <section
      className="
        relative
        hidden
        min-h-0
        min-w-0
        overflow-hidden
        lg:flex
        lg:flex-col
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#082028] to-[#043A35]" />

      {/* GLOW */}
      <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-400/25 blur-[110px]" />

      <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[110px]" />

      <div className="absolute bottom-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-400/10 blur-[100px]" />

      {/* DECORATIVE CIRCLES */}
      <div className="pointer-events-none absolute -right-14 top-24 h-72 w-72 rounded-full border border-emerald-400/10" />

      <div className="pointer-events-none absolute right-10 top-36 h-52 w-52 rounded-full border border-cyan-400/10" />

      <div className="pointer-events-none absolute right-28 top-48 h-24 w-24 rounded-full bg-emerald-400/10" />

      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* RIGHT CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-0
          min-w-0
          flex-col
          justify-between
          p-8
          xl:p-10
        "
      >
        {/* TOP */}
        <div className="min-w-0">
          <div
            className="
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/25
              bg-emerald-400/10
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-emerald-300
              backdrop-blur-sm
            "
          >
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />

            Support Management Platform
          </div>

          <h2
            className="
              mt-6
              max-w-[520px]
              text-[38px]
              font-black
              leading-[1.02]
              tracking-[-0.04em]
              text-white
              xl:text-[44px]
            "
          >
            Keep every

            <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              support request
            </span>

            moving forward.
          </h2>

          <p
            className="
              mt-4
              max-w-[480px]
              text-[13px]
              leading-6
              text-slate-400
              xl:text-sm
            "
          >
            HelpDesk connects customers and support teams through a clear,
            organized ticket management workflow — so nothing gets lost.
          </p>
        </div>

        {/* FEATURES */}
        <div className="my-5 min-w-0 space-y-2.5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  p-3.5
                  backdrop-blur-sm
                  transition-all
                  duration-200
                  hover:border-emerald-400/25
                  hover:bg-white/[0.06]
                  hover:shadow-lg
                  hover:shadow-emerald-500/5
                "
              >
                {/* ICON */}
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${feature.iconClass}
                    transition
                    group-hover:scale-105
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* TEXT */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-0.5 truncate text-[10px] leading-4 text-slate-500">
                    {feature.description}
                  </p>
                </div>

                {/* CHECK */}
                <div
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-400/10
                    text-emerald-400
                    ring-1
                    ring-emerald-400/20
                  "
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </div>

        {/* STATUS CARD */}
        <div
          className="
            min-w-0
            rounded-2xl
            border
            border-white/[0.09]
            bg-white/[0.045]
            p-4
            shadow-2xl
            shadow-black/30
            backdrop-blur-xl
          "
        >
          {/* HEADER */}
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-300
                  ring-1
                  ring-cyan-400/20
                "
              >
                <Headphones size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  Support Team
                </p>

                <p className="truncate text-[10px] text-slate-500">
                  Working efficiently
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />

              Active
            </div>
          </div>

          {/* STATS */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="min-w-0 rounded-xl border border-white/[0.07] bg-black/20 p-2.5">
              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                Tickets
              </p>

              <p className="mt-0.5 text-lg font-black text-white">
                42
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-white/[0.07] bg-black/20 p-2.5">
              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                Progress
              </p>

              <p className="mt-0.5 text-lg font-black text-white">
                31
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-white/[0.07] bg-black/20 p-2.5">
              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                Resolved
              </p>

              <p className="mt-0.5 text-lg font-black text-white">
                175
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSidePanel;