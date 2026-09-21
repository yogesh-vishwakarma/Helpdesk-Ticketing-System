import { User } from "lucide-react";

const AssignmentCard = ({ ticket, canAssign }) => (
<section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
  <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

  <div className="p-4">
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-300 ring-1 ring-indigo-400/20">
        <User className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-sm font-bold text-white">
          Assignment
        </h2>
        <p className="text-[10px] text-slate-500">
          Current ownership
        </p>
      </div>
    </div>

    {ticket.assignedAgent ? (
      <div className="mt-3 rounded-2xl border border-indigo-400/20 bg-indigo-400/[0.06] p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md ring-1 ring-indigo-400/30">
            {ticket.assignedAgent.name
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">
              {ticket.assignedAgent.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-slate-400">
              {ticket.assignedAgent.email}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-400/10 px-2.5 py-1.5 ring-1 ring-emerald-400/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          <span className="text-[11px] font-semibold text-emerald-300">
            Currently assigned
          </span>
        </div>
      </div>
    ) : (
      <div className="mt-3 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] p-4 text-center">
        <User className="mx-auto h-5 w-5 text-slate-500" />
        <p className="mt-1.5 text-sm font-semibold text-slate-400">
          No agent assigned
        </p>
      </div>
    )}

    {canAssign && (
      <button
        type="button"
        className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-bold text-slate-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-indigo-300"
      >
        {ticket.assignedAgent
          ? "Change Assignment"
          : "Assign Agent"}
      </button>
    )}
  </div>
</section>
);

export default AssignmentCard;
