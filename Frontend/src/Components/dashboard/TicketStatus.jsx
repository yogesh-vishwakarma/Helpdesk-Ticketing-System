import { CircleDot } from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const TicketStatus = ({ data = [], totalTickets = 0 }) => {
  const statusColors = {
    Open: "bg-orange-500",
    "In Progress": "bg-blue-500",
    Waiting: "bg-yellow-500",
    Resolved: "bg-emerald-500",
    Closed: "bg-gray-500",
  };

  const total = data.reduce(
    (sum, item) => sum + (item.count || 0),
    0
  );

  return (
    <SafeSection>
      <div className="h-full">
        <DashboardCard
          icon={<CircleDot className="h-4 w-4" />}
          title="Ticket Status"
          description="Distribution by current status"
          badge={`${totalTickets || 0} Total`}
          accent="emerald"
        >
          <div className="space-y-5">

            {data.length === 0 ? (
              <div className="rounded-xl border border-dashed border-base-300 py-8 text-center">
                <p className="text-sm text-base-content/50">
                  No status data available
                </p>
              </div>
            ) : (
              data.map((item) => {
                const percentage =
                  total > 0
                    ? Math.round(((item.count || 0) / total) * 100)
                    : 0;

                const color =
                  statusColors[item.status] || "bg-primary";

                return (
                  <div key={item.status}>
                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${color}`}
                        />

                        <span className="text-sm font-medium">
                          {item.status}
                        </span>
                      </div>

                      <div className="text-sm font-medium text-base-content/70">
                        {item.count}

                        <span className="ml-1 text-xs text-base-content/50">
                          ({percentage}%)
                        </span>
                      </div>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-base-300">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${color}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}

          </div>
        </DashboardCard>
      </div>
    </SafeSection>
  );
};

export default TicketStatus;