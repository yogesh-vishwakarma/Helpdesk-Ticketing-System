import { Clock3, Ticket } from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const RecentTickets = ({ data = [] }) => {
  const priorityColor = {
    Low: "text-slate-300 bg-slate-400/10 ring-slate-400/20",
    Medium: "text-blue-300 bg-blue-400/10 ring-blue-400/20",
    High: "text-orange-300 bg-orange-400/10 ring-orange-400/20",
    Critical: "text-red-300 bg-red-400/10 ring-red-400/20",
  };

  const statusColor = {
    Open: "text-orange-300 bg-orange-400/10 ring-orange-400/20",
    "In Progress":
      "text-blue-300 bg-blue-400/10 ring-blue-400/20",
    Waiting:
      "text-amber-300 bg-amber-400/10 ring-amber-400/20",
    Resolved:
      "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20",
    Closed:
      "text-slate-300 bg-slate-400/10 ring-slate-400/20",
  };

  return (
    <SafeSection>
      <div className="h-full">
        <DashboardCard
          icon={<Clock3 className="h-4 w-4" />}
          title="Recent Tickets"
          description="Latest tickets created"
          badge={`${data.length}`}
          accent="blue"
        >
          {!Array.isArray(data) || !data.length ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                <Ticket className="h-5 w-5 text-slate-500" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-400">
                No recent tickets
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Latest tickets will appear here
              </p>
            </div>
          ) : (
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
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.04]">

                  {data.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="group transition-all duration-200 hover:bg-white/[0.02]"
                    >

                      <td className="px-3 py-3.5">
                        <div className="flex items-start gap-2.5">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
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
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${
                            statusColor[ticket.status] ||
                            statusColor.Open
                          }`}
                        >
                          {ticket.status || "Open"}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </DashboardCard>
      </div>
    </SafeSection>
  );
};

export default RecentTickets;