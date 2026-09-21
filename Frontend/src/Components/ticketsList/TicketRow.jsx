import { Ticket, Users, Eye, Pencil, UserPlus, Trash2 } from "lucide-react";

import ActionButton from "./ActionButton";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { getInitial } from "./utils/ticketUtils";

function TicketRow({
  ticket,
  onView,
  onEdit,
  onAssign,
  onDelete,
  canSeeAssignedAgent,
  canAssign,
  canUpdate,
  canDelete,
}) {
  return (
    <tr className="group transition-all duration-200 hover:bg-white/[0.03]">
      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 shadow-sm transition-all duration-200 group-hover:scale-105">
            <Ticket size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs font-bold text-emerald-300">
              {ticket.ticketId || "—"}
            </p>
            <p className="mt-1 max-w-[230px] truncate text-sm font-bold text-white">
              {ticket.title || "Untitled Ticket"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/20">
            {getInitial(ticket.customer?.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-200">
              {ticket.customer?.name || "Unknown"}
            </p>
            <p className="mt-0.5 max-w-[180px] truncate text-xs text-slate-500">
              {ticket.customer?.email || "-"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 shadow-sm">
          {ticket.category || "-"}
        </span>
      </td>

      <td className="px-5 py-4">
        <PriorityBadge priority={ticket.priority} />
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={ticket.status} />
      </td>

      {canSeeAssignedAgent && (
        <td className="px-7 py-4">
          {ticket.assignedAgent ? (
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-400/15 text-xs font-bold text-indigo-300 ring-1 ring-indigo-400/20">
                {getInitial(ticket.assignedAgent?.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-200">
                  {ticket.assignedAgent?.name || "Unknown Agent"}
                </p>
                {ticket.assignedAgent?.email && (
                  <p className="mt-0.5 max-w-[170px] truncate text-xs text-slate-500">
                    {ticket.assignedAgent.email}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-slate-500">
              <Users size={14} />
              Unassigned
            </span>
          )}
        </td>
      )}

      {/* ============ ACTIONS — tighter padding & gap ============ */}
      <td className="whitespace-nowrap px-3 py-4">
        <div className="flex justify-end gap-1.5">
          <ActionButton
            onClick={() => onView(ticket)}
            icon={<Eye size={15} />}
          >
            View
          </ActionButton>

          {canUpdate && (
            <ActionButton
              onClick={() => onEdit(ticket)}
              icon={<Pencil size={15} />}
            >
              Edit
            </ActionButton>
          )}

          {canAssign && (
            <ActionButton
              onClick={() => onAssign(ticket)}
              icon={<UserPlus size={15} />}
              emerald
            >
              Assign
            </ActionButton>
          )}

          {canDelete && (
            <ActionButton
              onClick={() => onDelete(ticket)}
              icon={<Trash2 size={15} />}
              danger
            >
              Delete
            </ActionButton>
          )}
        </div>
      </td>
    </tr>
  );
}

export default TicketRow;
