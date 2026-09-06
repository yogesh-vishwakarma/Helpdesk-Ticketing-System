function StatusOverview({ data = [] }) {
  const statusColors = {
    Open: "bg-orange-500",
    "In Progress": "bg-blue-500",
    Waiting: "bg-yellow-500",
    Resolved: "bg-emerald-500",
    Closed: "bg-gray-500",
  };

  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="space-y-5">
      {data.length === 0 ? (
        <p className="py-6 text-center text-sm text-base-content/50">
          No status data available
        </p>
      ) : (
        data.map((item) => {
          const percentage =
            total > 0 ? Math.round(((item.count || 0) / total) * 100) : 0;

          return (
            <div key={item.status}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      statusColors[item.status] || "bg-primary"
                    }`}
                  />

                  <span className="text-sm font-medium">{item.status}</span>
                </div>

                <div className="text-sm text-base-content/60">
                  {item.count} <span className="text-xs">({percentage}%)</span>
                </div>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-base-300">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    statusColors[item.status] || "bg-primary"
                  }`}
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
  );
}

export default StatusOverview;