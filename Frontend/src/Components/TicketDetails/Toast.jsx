import { CheckCircle2, X, XCircle } from "lucide-react";

const Toast = ({ toast, onDismiss }) => {
  const isSuccess = toast.type === "success";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
        isSuccess
          ? "border-emerald-400/30 bg-slate-900/95 shadow-emerald-500/20"
          : "border-red-500/30 bg-slate-900/95 shadow-red-500/20"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${
          isSuccess
            ? "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20"
            : "bg-red-500/15 text-red-300 ring-red-400/20"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p
          className={`text-sm font-bold ${
            isSuccess ? "text-emerald-200" : "text-red-200"
          }`}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p className="mt-0.5 text-xs leading-5 text-slate-400">
            {toast.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/10 hover:text-slate-200"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default Toast;
