import { BarChart3 } from "lucide-react";

import SafeSection from "./SafeSection";

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass = "bg-primary/10 text-primary",
}) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 shadow-lg shadow-black/20 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:shadow-xl">
      
      <div className="flex items-start justify-between gap-3">
        
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {value}
          </h2>

          <p className="mt-1 truncate text-[11px] text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg transition-transform duration-200 group-hover:scale-105 ${iconClass}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

const TicketOverview = ({ dashboardData = {} }) => {
  return (
    <section className="mb-5">
      
      {/* Section heading */}
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <BarChart3 className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-white sm:text-base">
            Ticket Overview
          </h2>

          <p className="text-[11px] text-slate-500">
            Current support activity at a glance
          </p>
        </div>
      </div>

      <SafeSection>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          <StatCard
            title="Total Tickets"
            value={dashboardData?.totalTickets || 0}
            description="All tickets"
            icon="🎫"
            iconClass="bg-emerald-400/15 text-emerald-300"
          />

          <StatCard
            title="Open"
            value={dashboardData?.openTickets || 0}
            description="Awaiting action"
            icon="📂"
            iconClass="bg-orange-400/15 text-orange-300"
          />

          <StatCard
            title="In Progress"
            value={dashboardData?.inProgressTickets || 0}
            description="Currently working"
            icon="⚙️"
            iconClass="bg-blue-400/15 text-blue-300"
          />

          <StatCard
            title="Resolved"
            value={dashboardData?.resolvedTickets || 0}
            description="Successfully resolved"
            icon="✓"
            iconClass="bg-emerald-400/15 text-emerald-300"
          />

          <StatCard
            title="Closed"
            value={dashboardData?.closedTickets || 0}
            description="Completed tickets"
            icon="🔒"
            iconClass="bg-slate-400/15 text-slate-300"
          />

          <StatCard
            title="Unassigned"
            value={dashboardData?.unassignedTickets || 0}
            description="Need assignment"
            icon="⚠️"
            iconClass="bg-red-400/15 text-red-300"
          />

        </div>
      </SafeSection>
    </section>
  );
};

export default TicketOverview;