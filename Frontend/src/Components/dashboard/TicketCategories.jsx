import { BarChart3 } from "lucide-react";

import DashboardCard from "./DashboardCard";
import SafeSection from "./SafeSection";

const TicketCategories = ({ data = [] }) => {
  return (
    <div className="mb-5">
      <SafeSection>
        <DashboardCard
          icon={<BarChart3 className="h-4 w-4" />}
          title="Ticket Categories"
          description="Number of tickets in each category"
          badge={`${data?.length || 0} Categories`}
          accent="blue"
        >
          {data.length === 0 ? (
            <div className="rounded-xl border border-dashed border-base-300 py-8 text-center">
              <p className="text-sm text-base-content/50">
                No category data available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {data.map((item) => (
                <div
                  key={item.category}
                  className="group rounded-xl border border-base-300 bg-base-100 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                        Category
                      </p>

                      <p className="mt-1 truncate font-semibold">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary transition-transform group-hover:scale-105">
                      {item.count}
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </DashboardCard>
      </SafeSection>
    </div>
  );
};

export default TicketCategories;