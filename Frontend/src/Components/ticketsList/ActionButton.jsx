const ActionButton = ({
  children,
  icon,
  onClick,
  emerald,
  danger,
}) => {
  return (
    <div className="relative inline-flex group/action">
      {/* Icon Button */}
      <button
        onClick={onClick}
        className={`
          w-10 h-10
          flex items-center justify-center
          rounded-lg
          transition-colors duration-200
          ${
            emerald
              ? "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
              : danger
              ? "border border-red-500/40 text-red-400 hover:bg-red-500/10"
              : "border border-slate-700 text-slate-300 hover:bg-slate-800"
          }
        `}
      >
        {icon}
      </button>

      {/* Only this button's label */}
      <span
        className="
          action-label
          absolute
          bottom-full
          left-1/2
          -translate-x-1/2
          mb-1
          px-2
          py-1
          rounded-md
          bg-slate-800
          border border-slate-700
          text-[10px]
          font-medium
          text-slate-200
          whitespace-nowrap
          opacity-0
          invisible
          pointer-events-none
          z-50
          transition-opacity
          duration-150

          group-hover/action:opacity-100
          group-hover/action:visible
        "
      >
        {children}
      </span>
    </div>
  );
};

export default ActionButton;
