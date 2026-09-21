const MiniStat = ({ icon, label, value, accent = "emerald" }) => {
  const accents = {
    emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    indigo: "bg-indigo-400/10 text-indigo-300 ring-indigo-400/20",
    violet: "bg-violet-400/10 text-violet-300 ring-violet-400/20",
  };

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 shadow-sm backdrop-blur-sm">
      <div
        className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 sm:flex ${accents[accent]}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
};


export default MiniStat;
/* =========================================================
   ADMIN TAB
========================================================= */
