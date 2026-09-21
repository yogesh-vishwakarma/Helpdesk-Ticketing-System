const DetailItem = ({ icon, label, value, subValue }) => {
  return (
    <div className="group flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 shadow-sm transition-all duration-200 hover:border-emerald-400/20 hover:bg-white/[0.04]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400 ring-1 ring-white/[0.06] transition-colors group-hover:text-emerald-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-bold text-white">{value}</p>
        {subValue && (
          <p className="truncate text-[10px] text-slate-500">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default DetailItem;
