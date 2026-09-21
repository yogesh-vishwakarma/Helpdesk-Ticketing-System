function MobileInfo({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="truncate text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}


export default MobileInfo;
