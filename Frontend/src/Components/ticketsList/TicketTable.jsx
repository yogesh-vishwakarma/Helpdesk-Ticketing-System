import { RefreshCw, Search, AlertCircle } from "lucide-react";

import TicketRow from "./TicketRow";
import TicketMobileCard from "./TicketMobileCard";
import TableHeader from "./TableHeader";

function TicketTable({
  tickets,
  loading,
  onView,
  onEdit,
  showView = true,
  onAssign,
  onDelete,
  canSeeAssignedAgent,
  canSeeCustomer = true,
  canAssign,
  canUpdate,
  canDelete,
  
}) {
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
              <RefreshCw size={28} className="animate-spin text-emerald-400" />
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-slate-900 bg-emerald-500" />
            </span>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-white">Loading tickets</p>
            <p className="mt-1 text-sm text-slate-500">
              Please wait while we fetch your tickets...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.02] px-5 text-center shadow-sm backdrop-blur-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.04] ring-1 ring-white/[0.06]">
          <Search size={30} className="text-slate-500" />
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">No tickets found</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
          No tickets match your current search or filters. Try changing your
          filters or clearing the search.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-400">
          <AlertCircle size={14} />
          Try adjusting your search criteria
        </div>
      </div>
    );
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <TableHeader>Ticket</TableHeader>

                {/* ✅ Conditionally render Customer header */}
                {canSeeCustomer && <TableHeader>Customer</TableHeader>}

                <TableHeader>Category</TableHeader>
                <TableHeader>Priority</TableHeader>
                <TableHeader>Status</TableHeader>
                {canSeeAssignedAgent && (
                  <TableHeader>Assigned Agent</TableHeader>
                )}
                <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {tickets.map((ticket) => (
                <TicketRow
                  key={ticket._id}
                  ticket={ticket}
                  onView={onView}
                  onEdit={onEdit}
                  onAssign={onAssign}
                  onDelete={onDelete}
                  canSeeAssignedAgent={canSeeAssignedAgent}
                  canSeeCustomer={canSeeCustomer}
                  canAssign={canAssign}
                  canUpdate={canUpdate}
                  canDelete={canDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="space-y-3 md:hidden">
        {tickets.map((ticket) => (
          <TicketMobileCard
            key={ticket._id}
            ticket={ticket}
            onView={onView}
            onEdit={onEdit}
            onAssign={onAssign}
            onDelete={onDelete}
            canSeeAssignedAgent={canSeeAssignedAgent}
            canSeeCustomer={canSeeCustomer}
            canAssign={canAssign}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        ))}
      </div>
    </>
  );
}

export default TicketTable;
