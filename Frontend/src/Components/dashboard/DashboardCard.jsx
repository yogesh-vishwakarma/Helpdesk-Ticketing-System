const DashboardCard = ({
  icon,
  title,
  description,
  badge,
  badgeClass = "",
  accent = "emerald",
  children,
}) => {
  const accentStyles = {
    emerald: {
      icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      line: "from-emerald-500 to-teal-500",
      badge:
        "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    },

    red: {
      icon: "border-red-400/20 bg-red-400/10 text-red-300",
      line: "from-red-500 to-orange-500",
      badge: "border-red-400/25 bg-red-400/10 text-red-300",
    },

    blue: {
      icon: "border-blue-400/20 bg-blue-400/10 text-blue-300",
      line: "from-blue-500 to-cyan-500",
      badge: "border-blue-400/25 bg-blue-400/10 text-blue-300",
    },
  };

  const style = accentStyles[accent] || accentStyles.emerald;

  return (
    <section className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 shadow-2xl shadow-black/30 transition-[border-color,background-color,box-shadow] duration-300 hover:border-emerald-400/20 hover:bg-slate-900/80 hover:shadow-xl">
      
      {/* Top accent line */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.line}`}
      />

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        
        <div className="flex min-w-0 items-start gap-2.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.icon}`}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-white sm:text-base">
              {title}
            </h2>

            <p className="mt-0.5 text-[11px] leading-4 text-slate-500 sm:text-xs">
              {description}
            </p>
          </div>
        </div>

        {badge && (
          <span
            className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
              badgeClass || style.badge
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5">
        {children}
      </div>
    </section>
  );
};

export default DashboardCard;