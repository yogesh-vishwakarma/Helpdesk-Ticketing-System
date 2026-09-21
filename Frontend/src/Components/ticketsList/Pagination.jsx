import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  page,
  totalPages,
  totalTickets,
  limit,
  hasNextPage,
  hasPreviousPage,
  onPrevious,
  onNext,
  onPageChange,
}) {
  const start = totalTickets === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalTickets);

  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 4) pageNumbers.push("...");
    const sp = Math.max(2, page - 1);
    const ep = Math.min(totalPages - 1, page + 1);
    for (let i = sp; i <= ep; i++) pageNumbers.push(i);
    if (page < totalPages - 3) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center text-sm text-slate-400 lg:text-left">
          Showing <span className="font-bold text-white">{start}</span> –{" "}
          <span className="font-bold text-white">{end}</span> of{" "}
          <span className="font-bold text-white">{totalTickets}</span> tickets
        </div>

        <div className="flex w-full items-center justify-center gap-1.5 overflow-x-auto lg:w-auto">
          <button
            type="button"
            disabled={!hasPreviousPage}
            onClick={onPrevious}
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm font-semibold text-slate-300 shadow-sm transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {pageNumbers.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex h-10 w-9 shrink-0 items-center justify-center text-sm font-semibold text-slate-500"
                >
                  ...
                </span>
              );
            }
            const isActive = item === page;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={`flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl px-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/40"
                    : "border border-white/[0.08] bg-white/[0.03] text-slate-300 shadow-sm hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            disabled={!hasNextPage}
            onClick={onNext}
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm font-semibold text-slate-300 shadow-sm transition-all duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DELETE CONFIRMATION MODAL
========================================================= */


export default Pagination;
