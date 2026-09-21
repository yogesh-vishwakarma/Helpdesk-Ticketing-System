const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  amber = false,
}) => {
  return (
    <div
      className={`mt-4 flex items-center justify-between border-t pt-3.5 ${
        amber ? "border-amber-400/20" : "border-white/[0.06]"
      }`}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-300 shadow-sm transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-slate-400 ring-1 ring-white/[0.06]">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-300 shadow-sm transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
