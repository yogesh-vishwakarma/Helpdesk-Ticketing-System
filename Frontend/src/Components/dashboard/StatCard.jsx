function StatCard({
  title,
  value,
  description,
  icon,
  iconClass = "bg-primary/10 text-primary",
}) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="card-body p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-base-content/60">{title}</p>

            <h2 className="mt-2 text-3xl font-bold">{value}</h2>

            <p className="mt-1 text-xs text-base-content/50">{description}</p>
          </div>

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${iconClass}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;