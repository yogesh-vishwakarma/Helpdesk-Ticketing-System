function FilterField({ label, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}


export default FilterField;
