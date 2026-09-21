function MobileActionButton({
  children,
  icon,
  onClick,
  emerald = false,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
        danger
          ? "border-red-400/30 bg-red-500/10 text-red-300 hover:border-red-400/50 hover:bg-red-500/15"
          : emerald
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-400/15"
            : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}


export default MobileActionButton;
