import { useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const UnassignedTickets = ({ data = [] }) => {
  const [page, setPage] = useState(1);

  const perPage = 5;

  const safeData = Array.isArray(data) ? data : [];

  const totalPages = Math.max(
    Math.ceil(safeData.length / perPage),
    1
  );

  const startIndex = (page - 1) * perPage;

  const paginated = safeData.slice(
    startIndex,
    startIndex + perPage
  );

  const priorityColor = {
    Low: "text-slate-300 bg-slate-400/10 ring-slate-400/20",
    Medium: "text-blue-300 bg-blue-400/10 ring-blue-400/20",
    High: "text-orange-300 bg-orange-400/10 ring-orange-400/20",
    Critical: "text-red-300 bg-red-400/10 ring-red-400/20",
  };

  return (
    <SafeSection>
      <div className="h-full">
        <DashboardCard
          icon={<AlertCircle className="h-4 w-4" />}
          title="Unassigned Tickets"
          description="Tickets waiting for an agent"
          badge={`${safeData.length}`}
          accent="red"
        >
          {!safeData.length ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
                <AlertCircle className="h-5 w-5 text-emerald-300" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-400">
                All tickets assigned
              </p>

              <p className="mt-1 text-xs text-slate-500">
                No tickets waiting for an agent
              </p>
            </div>
          ) : (
            <div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">

                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Ticket
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Category
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Priority
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.04]">

                    {paginated.map((ticket) => (
                      <tr
                        key={ticket._id}
                        className="group transition-all duration-200 hover:bg-white/[0.02]"
                      >

                        <td className="px-3 py-3.5">
                          <div className="flex items-start gap-2.5">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-300 ring-1 ring-red-400/20">
                              <Ticket className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-mono text-[11px] font-bold tracking-wide text-emerald-300">
                                {ticket.ticketId || "—"}
                              </p>

                              <p className="mt-0.5 max-w-[240px] truncate text-sm font-semibold text-white">
                                {ticket.title || "Untitled Ticket"}
                              </p>
                            </div>

                          </div>
                        </td>

                        <td className="px-3 py-3.5">
                          <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                            {ticket.category || "—"}
                          </span>
                        </td>

                        <td className="px-3 py-3.5">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${
                              priorityColor[ticket.priority] ||
                              priorityColor.Medium
                            }`}
                          >
                            {ticket.priority || "Medium"}
                          </span>
                        </td>

                        <td className="px-3 py-3.5">
                          <span className="inline-flex rounded-full border border-dashed border-white/[0.12] bg-white/[0.02] px-2.5 py-1 text-[10px] font-semibold text-slate-400">
                            Unassigned
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3.5">

                  <p className="text-xs font-medium text-slate-500">
                    Page {page} of {totalPages}
                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) => Math.max(p - 1, 1))
                      }
                      disabled={page === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPage(n)}
                        className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-xs font-bold transition ${
                          page === n
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white ring-1 ring-emerald-400/40"
                            : "border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                        }`}
                      >
                        {n}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(p + 1, totalPages)
                        )
                      }
                      disabled={page === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                  </div>
                </div>
              )}

            </div>
          )}
        </DashboardCard>
      </div>
    </SafeSection>
  );
};

export default UnassignedTickets;