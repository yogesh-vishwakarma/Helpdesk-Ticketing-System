import { Loader2 } from "lucide-react";

const LoadingState = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-72 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        </div>
        <p className="text-sm font-medium text-slate-400">{text}</p>
      </div>
    </div>
  );
};


export default LoadingState;
/* =========================================================
   EMPTY STATE
========================================================= */
