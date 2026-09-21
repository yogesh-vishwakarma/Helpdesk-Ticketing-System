function StatusBadge({ status }) {
  const classes = {
    Open: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    "In Progress": "border-blue-400/30 bg-blue-400/10 text-blue-300",
    Waiting: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    Resolved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Closed: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  };
  const dotClasses = {
    Open: "bg-orange-400",
    "In Progress": "bg-blue-400",
    Waiting: "bg-yellow-400",
    Resolved: "bg-emerald-400",
    Closed: "bg-slate-400",
  };
  const s = status || "Open";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold shadow-sm ${classes[s] || classes.Open}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotClasses[s] || dotClasses.Open}`}
      />
      {s}
    </span>
  );
}


export default StatusBadge;
