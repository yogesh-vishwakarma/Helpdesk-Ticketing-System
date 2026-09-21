function PriorityBadge({ priority }) {
  const classes = {
    Low: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    Medium: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    High: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    Critical: "border-red-400/30 bg-red-400/10 text-red-300",
  };
  const dotClasses = {
    Low: "bg-slate-400",
    Medium: "bg-blue-400",
    High: "bg-orange-400",
    Critical: "bg-red-400",
  };
  const p = priority || "Medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold shadow-sm ${classes[p] || classes.Medium}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotClasses[p] || dotClasses.Medium}`}
      />
      {p}
    </span>
  );
}


export default PriorityBadge;
