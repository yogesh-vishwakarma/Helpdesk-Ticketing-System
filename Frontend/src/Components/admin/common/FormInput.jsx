const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
      />
    </div>
  );
};


export default FormInput;
/* =========================================================
   FORM SELECT
========================================================= */
