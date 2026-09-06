function PriorityOverview({ data = [] }) {
  const priorityColors = {
    Critical: "bg-purple-600",
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="space-y-5">
      {data.length === 0 ? (
        <p className="py-6 text-center text-sm text-base-content/50">
          No priority data available
        </p>
      ) : (
        data.map((item) => {
          const percentage =
            total > 0 ? Math.round(((item.count || 0) / total) * 100) : 0;

          return (
            <div key={item.priority}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      priorityColors[item.priority] || "bg-primary"
                    }`}
                  />

                  <span className="text-sm font-medium">{item.priority}</span>
                </div>

                <div className="text-sm text-base-content/60">
                  {item.count} <span className="text-xs">({percentage}%)</span>
                </div>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-base-300">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    priorityColors[item.priority] || "bg-primary"
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

export default PriorityOverview;