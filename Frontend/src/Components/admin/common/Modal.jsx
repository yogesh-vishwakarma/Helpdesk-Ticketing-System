import { X } from "lucide-react";

const Modal = ({
  title,
  subtitle,
  children,
  onClose,
  wide = false,
  accent = "emerald",
  icon,
}) => {
  const accents = {
    emerald: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20",
    indigo: "bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20",
    red: "bg-red-500/10 text-red-300 ring-1 ring-red-400/20",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-md sm:p-5">
      <div
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl ${
          wide ? "max-w-5xl" : "max-w-lg"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-white sm:text-lg">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-0.5 truncate text-[11px] text-slate-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

/* =========================================================
   FORM INPUT
========================================================= */
