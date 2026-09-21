import React from "react";

function OverviewCard({ icon, label, value, description, accent = "emerald" }) {
  const accents = {
    slate: {
      line: "from-slate-400 to-slate-500",
      iconBg: "bg-slate-400/15",
      iconText: "text-slate-300",
      iconRing: "ring-slate-400/25",
    },
    emerald: {
      line: "from-emerald-400 to-teal-500",
      iconBg: "bg-emerald-400/15",
      iconText: "text-emerald-300",
      iconRing: "ring-emerald-400/25",
    },
    indigo: {
      line: "from-indigo-400 to-violet-500",
      iconBg: "bg-indigo-400/15",
      iconText: "text-indigo-300",
      iconRing: "ring-indigo-400/25",
    },
  };
  const style = accents[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.05] hover:shadow-xl">
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${style.line} opacity-60 transition-opacity group-hover:opacity-100`}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-1.5 text-3xl font-black tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
        </div>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconBg} ${style.iconText} ring-1 ${style.iconRing} transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TICKET FILTERS
========================================================= */


export default OverviewCard;
