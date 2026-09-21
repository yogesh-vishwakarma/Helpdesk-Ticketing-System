const TableHeader = ({ children, align = "left" }) => {
  return (
    <th
      className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:px-6 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
};

export default TableHeader;

/* =========================================================
   ICON ACTION BUTTON
========================================================= */
