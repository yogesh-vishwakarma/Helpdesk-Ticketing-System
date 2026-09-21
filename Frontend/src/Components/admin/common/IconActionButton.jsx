const IconActionButton = ({ onClick, title, icon, danger = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
        danger
          ? "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
          : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
      }`}
    >
      {icon}
    </button>
  );
};

export default IconActionButton;

/* =========================================================
   USER PAGINATION
========================================================= */
