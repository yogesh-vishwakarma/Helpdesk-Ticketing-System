function TableHeader({ children }) {
  return (
    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

export default TableHeader;