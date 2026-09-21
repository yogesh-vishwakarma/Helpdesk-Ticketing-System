import { AlertCircle, X } from "lucide-react";

const ErrorAlert = ({ error, setError }) => (
<div className="mb-4 flex items-start gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 p-4 shadow-lg backdrop-blur-sm">
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/20">
    <AlertCircle className="h-5 w-5 text-red-300" />
  </div>
  <div className="min-w-0 flex-1">
    <p className="text-sm font-bold text-red-200">
      Something went wrong
    </p>
    <p className="mt-0.5 text-xs text-red-300/80">{error}</p>
  </div>
  <button
    type="button"
    onClick={() => setError("")}
    className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/20 hover:text-red-200"
  >
    <X size={15} />
  </button>
</div>
);

export default ErrorAlert;
