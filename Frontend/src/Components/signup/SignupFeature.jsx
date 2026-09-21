import { Check } from "lucide-react";

function SignupFeature({ icon: Icon, title, text, iconClass }) {
  return (
    <div
      className="
        group min-w-0 rounded-xl border border-white/[0.08]
        bg-white/[0.03] p-3
        transition-all duration-200
        hover:border-emerald-400/25
        hover:bg-white/[0.06]
        hover:shadow-lg
        hover:shadow-emerald-500/5
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex h-9 w-9 shrink-0 items-center
            justify-center rounded-xl
            ${iconClass}
          `}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-xs font-bold text-white">
              {title}
            </h3>

            <Check
              size={13}
              className="shrink-0 text-emerald-400"
            />
          </div>

          <p className="mt-0.5 truncate text-[9px] leading-3.5 text-slate-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupFeature;