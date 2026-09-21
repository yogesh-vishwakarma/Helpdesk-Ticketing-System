function FilterSelect({ children, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="h-12 w-full min-w-0 rounded-xl border border-white/[0.08] bg-slate-900/60 px-3.5 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
    >
      {children}
    </select>
  );
}

/* =========================================================
   TICKET TABLE
========================================================= */


export default FilterSelect;
