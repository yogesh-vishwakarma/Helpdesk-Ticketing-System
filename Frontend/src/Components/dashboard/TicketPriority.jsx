import { AlertCircle } from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const TicketPriority = ({ data = [], totalTickets = 0 }) => {
  const priorityColors = {
    Critical: "bg-purple-600",
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const total = data.reduce(
    (sum, item) => sum + (item.count || 0),
    0
  );

  return (
    <SafeSection>
      <div className="h-full">
        <DashboardCard
          icon={<AlertCircle className="h-4 w-4" />}
          title="Ticket Priority"
          description="Distribution by priority level"
          badge={`${totalTickets || 0} Total`}
          accent="red"
        >
          <div className="space-y-5">

            {data.length === 0 ? (
              <div className="rounded-xl border border-dashed border-base-300 py-8 text-center">
                <p className="text-sm text-base-content/50">
                  No priority data available
                </p>
              </div>
            ) : (
              data.map((item) => {
                const percentage =
                  total > 0
                    ? Math.round(((item.count || 0) / total) * 100)
                    : 0;

                const color =
                  priorityColors[item.priority] || "bg-primary";

                return (
                  <div key={item.priority}>
                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${color}`}
                        />

                        <span className="text-sm font-medium">
                          {item.priority}
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

export default TicketPriority;