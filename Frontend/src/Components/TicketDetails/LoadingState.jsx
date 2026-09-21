import { Ticket } from "lucide-react";

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
          <Ticket size={28} className="text-emerald-400" />
        </div>

        <span className="absolute -right-1 -top-1 flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

          <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-slate-950 bg-emerald-500" />
        </span>
      </div>

      <p className="text-sm font-bold text-slate-400">
        Loading ticket...
      </p>
    </div>
  </div>
);

export default LoadingState;
