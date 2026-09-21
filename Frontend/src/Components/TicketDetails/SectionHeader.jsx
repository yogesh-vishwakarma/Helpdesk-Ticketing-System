const SectionHeader = ({ icon, title, subtitle, accent = "emerald" }) => {
  const accents = {
    emerald: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20",
    amber: "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20",
    indigo: "bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20",
  };

  return (
    <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${accents[accent]}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold text-white">{title}</h2>
        <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};


export default SectionHeader;
