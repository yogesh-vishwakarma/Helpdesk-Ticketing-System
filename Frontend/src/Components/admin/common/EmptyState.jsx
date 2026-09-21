import { Search } from "lucide-react";

const EmptyState = ({ message, icon }) => {
  return (
    <div className="flex min-h-72 items-center justify-center px-5">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-slate-500 ring-1 ring-white/[0.06]">
          {icon || <Search className="h-6 w-6" />}
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-300">{message}</p>
        <p className="mt-1 text-xs text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    </div>
  );
};

export default EmptyState

/* =========================================================
   MODAL
========================================================= */
