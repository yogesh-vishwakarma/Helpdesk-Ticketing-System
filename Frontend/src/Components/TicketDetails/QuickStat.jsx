const QuickStat = ({ label, value, icon, color = "emerald" }) => {
  const colorMap = {
    emerald: {
      container: "border-emerald-400/25 bg-emerald-400/10",
      text: "text-emerald-300",
      iconBg: "bg-emerald-400/15 ring-emerald-400/20",
    },
    violet: {
      container: "border-violet-400/25 bg-violet-400/10",
      text: "text-violet-300",
      iconBg: "bg-violet-400/15 ring-violet-400/20",
    },
  };

  const style = colorMap[color] || colorMap.emerald;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 backdrop-blur-sm lg:min-w-[140px] ${style.container}`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${style.iconBg} ${style.text}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-base font-black leading-none text-white">
          {value}
        </p>

        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>
    </div>
  );
};

export default QuickStat;

