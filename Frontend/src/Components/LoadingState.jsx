import { Ticket } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center">

        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
            <Ticket
              size={30}
              className="animate-pulse text-emerald-400"
            />
          </div>
        </div>

        {/* Spinner */}
        <div className="mb-5 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />

        <h2 className="text-lg font-bold text-white">
          Loading Helpdesk
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preparing your workspace...
        </p>

      </div>
    </div>
  );
};

export default LoadingState;