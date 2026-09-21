import { Check } from "lucide-react";

function PasswordRequirement({ active, text }) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={`
          flex h-3.5 w-3.5 shrink-0
          items-center justify-center rounded-full
          transition-all
          ${
            active
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/50"
              : "bg-slate-700 text-slate-500"
          }
        `}
      >
        <Check size={9} strokeWidth={3} />
      </span>

      <span
        className={`
          truncate text-[9px] font-medium
          ${active ? "text-emerald-400" : "text-slate-500"}
        `}
      >
        {text}
      </span>
    </div>
  );
}

export default PasswordRequirement;