import { ChevronDown } from "lucide-react";

const FormSelect = ({ label, value, onChange, options, placeholder }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-12 w-full appearance-none rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 pr-10 text-sm text-white outline-none transition hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.roleName}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
};

export default FormSelect;

/* =========================================================
   MODAL BUTTONS
========================================================= */
