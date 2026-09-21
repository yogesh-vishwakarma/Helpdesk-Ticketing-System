import { ChevronLeft, ChevronRight } from "lucide-react";

const UserPagination = ({
  currentPage,
  totalPages,
  totalUsers,
  start,
  end,
  onPrevious,
  onNext,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let page = startPage; page <= endPage; page++) pages.push(page);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="border-t border-white/[0.06] bg-white/[0.02] px-5 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 lg:justify-start">
          <span className="hidden sm:inline">Showing</span>
          <span className="font-bold text-white">{start}</span>
          <span>–</span>
          <span className="font-bold text-white">{end}</span>
          <span>of</span>
          <span className="font-bold text-white">{totalUsers}</span>
          <span>users</span>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={onPrevious}
            className="flex h-9 items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-xs font-semibold text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex h-9 w-8 items-center justify-center text-sm font-medium text-slate-500"
                >
                  ...
                </span>
              );
            }
            const active = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-xs font-bold transition ${
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/40"
                    : "border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={onNext}
            className="flex h-9 items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-xs font-semibold text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPagination;

/* =========================================================
   LOADING STATE
========================================================= */
