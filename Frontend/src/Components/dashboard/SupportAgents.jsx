import { Users } from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const SupportAgents = ({ data = [] }) => {
  const getInitials = (name) => {
    if (!name) return "?";

    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getAssignedCount = (agent) => {
    return (
      agent?.totalTickets ??
      agent?.assignedTicketsCount ??
      agent?.assignedTickets ??
      agent?.ticketCount ??
      agent?.ticketsAssigned ??
      0
    );
  };

  const safeData = Array.isArray(data) ? data : [];

  return (
    <SafeSection>
      <div className="mb-5">
        <DashboardCard
          icon={<Users className="h-4 w-4" />}
          title="Support Agents"
          description="Agent workload overview"
          badge={`${safeData.length} Agents`}
          accent="emerald"
        >
          {!safeData.length ? (
            <div className="py-8 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                <Users className="h-5 w-5 text-slate-500" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-400">
                No agents available
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">

                <thead>
                  <tr className="border-b border-white/[0.06]">

                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Agent
                    </th>

                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Assigned Tickets
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.04]">

                  {safeData.map((agent) => (
                    <tr
                      key={agent._id}
                      className="group transition-all duration-200 hover:bg-white/[0.02]"
                    >

                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold tracking-wide text-white shadow-md ring-1 ring-emerald-400/30">
                            {getInitials(agent.name)}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-bold text-white">
                              {agent.name || "Unknown Agent"}
                            </p>

                            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                              Support Agent
                            </p>

                          </div>

                        </div>
                      </td>

                      <td className="px-3 py-3.5">
                        <p className="truncate text-sm font-medium text-slate-300">
                          {agent.email || "—"}
                        </p>
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-emerald-400/10 px-2 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/20">
                          {getAssignedCount(agent)}
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

export default SupportAgents;