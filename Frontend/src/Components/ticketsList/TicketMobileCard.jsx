import { Ticket, Eye, Pencil, UserPlus, Trash2 } from "lucide-react";

import MobileInfo from "./MobileInfo";
import MobileActionButton from "./MobileActionButton";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function TicketMobileCard({
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
    <div className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.05] hover:shadow-xl">
      <div className="relative border-b border-white/[0.06] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 shadow-sm">
              <Ticket size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold text-emerald-300">
                {ticket.ticketId || "—"}
              </p>
              <h3 className="mt-1 truncate text-sm font-bold text-white">
                {ticket.title || "Untitled Ticket"}
              </h3>
            </div>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-4">
        <MobileInfo
          label="Customer"
          value={ticket.customer?.name || "Unknown"}
        />
        <MobileInfo label="Category" value={ticket.category || "-"} />
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Priority
          </p>
          <PriorityBadge priority={ticket.priority} />
        </div>
        {canSeeAssignedAgent && (
          <MobileInfo
            label="Assigned Agent"
            value={ticket.assignedAgent?.name || "Unassigned"}
          />
        )}
      </div>

      {ticket.customer?.email && (
        <div className="px-4 pb-3">
          <p className="truncate text-xs text-slate-500">
            Customer: {ticket.customer.email}
          </p>
        </div>
      )}

      {canSeeAssignedAgent && ticket.assignedAgent?.email && (
        <div className="px-4 pb-3">
          <p className="truncate text-xs text-slate-500">
            Agent: {ticket.assignedAgent.email}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 border-t border-white/[0.06] bg-white/[0.02] p-3 sm:grid-cols-4">
        <MobileActionButton
          onClick={() => onView(ticket)}
          icon={<Eye size={16} />}
        >
          View
        </MobileActionButton>
        {canUpdate && (
          <MobileActionButton
            onClick={() => onEdit(ticket)}
            icon={<Pencil size={16} />}
          >
            Edit
          </MobileActionButton>
        )}
        {canAssign && (
          <MobileActionButton
            onClick={() => onAssign(ticket)}
            icon={<UserPlus size={16} />}
            emerald
          >
            Assign
          </MobileActionButton>
        )}
        {canDelete && (
          <MobileActionButton
            onClick={() => onDelete(ticket)}
            icon={<Trash2 size={16} />}
            danger
          >
            Delete
          </MobileActionButton>
        )}
      </div>
    </div>
  );
}


export default TicketMobileCard;
