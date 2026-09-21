import { CircleDot, Flag } from "lucide-react";

const StatusPriorityCard = ({
  canUpdateStatus,
  canUpdatePriority,
  status,
  setStatus,
  priority,
  setPriority,
  updatingStatus,
  updatingPriority,
  ticket,
  handleUpdateStatus,
  handleUpdatePriority,
}) => (
  <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {canUpdateStatus && (
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-400/15 text-blue-300 ring-1 ring-blue-400/20">
              <CircleDot className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white">
                Status
              </h2>
              <p className="text-[10px] text-slate-500">
                Change progress
              </p>
            </div>
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2.5 h-10 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 px-3 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:border-blue-400 focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/20"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting">Waiting</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            type="button"
            onClick={handleUpdateStatus}
            disabled={updatingStatus || status === ticket.status}
            className="mt-2.5 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          >
            {updatingStatus ? "Updating..." : "Update Status"}
          </button>
        </div>
      )}

      {canUpdatePriority && (
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-400/15 text-orange-300 ring-1 ring-orange-400/20">
              <Flag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white">
                Priority
              </h2>
              <p className="text-[10px] text-slate-500">
                Set urgency
              </p>
            </div>
          </div>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2.5 h-10 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 px-3 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:border-orange-400 focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <button
            type="button"
            onClick={handleUpdatePriority}
            disabled={
              updatingPriority || priority === ticket.priority
            }
            className="mt-2.5 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30 ring-1 ring-orange-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-400 hover:to-red-400 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          >
            {updatingPriority ? "Updating..." : "Update Priority"}
          </button>
        </div>
      )}
    </div>
  </section>
);

export default StatusPriorityCard;
