const AdminTab = ({
  active,
  onClick,
  icon,
  label,
  count,
  accent = "emerald",
}) => {
  const accents = {
    emerald: {
      active: "text-emerald-300",
      icon: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20",
      badge: "bg-emerald-400/15 text-emerald-300",
      bar: "from-emerald-500 to-teal-500",
    },
    indigo: {
      active: "text-indigo-300",
      icon: "bg-indigo-400/15 text-indigo-300 ring-1 ring-indigo-400/20",
      badge: "bg-indigo-400/15 text-indigo-300",
      bar: "from-indigo-500 to-violet-500",
    },
    violet: {
      active: "text-violet-300",
      icon: "bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/20",
      badge: "bg-violet-400/15 text-violet-300",
      bar: "from-violet-500 to-fuchsia-500",
    },
  };

  const style = accents[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex shrink-0 items-center gap-2.5 px-5 py-4 text-sm font-bold transition sm:px-6 ${
        active
          ? style.active
          : "text-slate-500 hover:bg-white/[0.02] hover:text-slate-300"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
          active
            ? style.icon
            : "bg-white/[0.04] text-slate-500 ring-1 ring-white/[0.06]"
        }`}
      >
        {icon}
      </span>

      <span>{label}</span>

      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          active ? style.badge : "bg-white/[0.04] text-slate-500"
        }`}
      >
        {count}
      </span>

      {active && (
        <span
          className={`absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-gradient-to-r ${style.bar}`}
        />
      )}
    </button>
  );
};

export default AdminTab;

/* =========================================================
   TABLE HEADER
========================================================= */
