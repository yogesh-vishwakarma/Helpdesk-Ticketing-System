import {
  MessageSquare,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import QuickStat from "./QuickStat";

const TicketHero = ({ ticket, statusStyle, priorityStyle, comments, activities }) => (
<header className="mb-5">
  <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
    <div
      className={`h-1.5 bg-gradient-to-r ${
        ticket.status === "Resolved" || ticket.status === "Closed"
          ? "from-emerald-500 via-teal-500 to-cyan-500"
          : ticket.priority === "Critical"
            ? "from-red-500 via-orange-500 to-amber-500"
            : "from-emerald-500 via-teal-500 to-cyan-500"
      }`}
    />

    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/15 blur-[100px]" />

    <div className="relative p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
              <Sparkles size={11} />
              Support Ticket
            </span>

            <span className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-400 ring-1 ring-white/[0.08]">
              #{ticket.ticketId || ticket._id}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
            {ticket.title || "Untitled Ticket"}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
              />
              {ticket.status || "Open"}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.ring}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`}
              />
              {ticket.priority || "Medium"} Priority
            </span>

            {ticket.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-bold text-slate-300">
                <Tag size={11} />
                {ticket.category}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2.5 lg:flex-col">
          <QuickStat
            label="Comments"
            value={comments.length}
            icon={<MessageSquare size={13} />}
            color="emerald"
          />
          <QuickStat
            label="Activity"
            value={activities.length}
            icon={<Zap size={13} />}
            color="violet"
          />
        </div>
      </div>
    </div>
  </div>
</header>
);

export default TicketHero;
