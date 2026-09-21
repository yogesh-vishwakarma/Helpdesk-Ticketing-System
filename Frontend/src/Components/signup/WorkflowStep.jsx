function WorkflowStep({ number, text, active = false }) {
  return (
    <div
      className={`
        min-w-0 rounded-lg border p-2
        transition-all
        ${
          active
            ? "border-emerald-400/30 bg-emerald-400/10 shadow-sm shadow-emerald-500/20"
            : "border-white/[0.06] bg-black/20"
        }
      `}
    >
      <p
        className={`
          text-[8px] font-bold
          ${active ? "text-emerald-300" : "text-slate-600"}
        `}
      >
        {number}
      </p>

      <p
        className={`
          mt-0.5 truncate text-[10px] font-semibold
          ${active ? "text-white" : "text-slate-500"}
        `}
      >
        {text}
      </p>
    </div>
  );
}

export default WorkflowStep;