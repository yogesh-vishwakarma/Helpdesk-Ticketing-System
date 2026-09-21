const EmptyState = ({ icon, title, text, amber = false, fullHeight = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed p-5 text-center ${
        fullHeight ? "flex-1 min-h-[280px]" : ""
      } ${
        amber
          ? "border-amber-400/25 bg-amber-400/[0.04]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <div
        className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl ${
          amber
            ? "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20"
            : "bg-white/[0.04] text-slate-500 ring-1 ring-white/[0.06]"
        }`}
      >
        {icon}
      </div>
      <p className="mt-3 text-sm font-bold text-white">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
};

export default EmptyState;
