const TicketTabs = ({ tabs, activeTab, setActiveTab, children }) => (
<section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
  <div className="border-b border-white/[0.06]">
    <div className="flex overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isAmber = tab.id === "notes";

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex shrink-0 items-center gap-2 px-4 py-3.5 text-sm font-bold transition-all duration-200 ${
              isActive
                ? isAmber
                  ? "text-amber-300"
                  : "text-emerald-300"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-all ${
                isActive
                  ? isAmber
                    ? "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20"
                    : "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20"
                  : "bg-white/[0.04] text-slate-500 group-hover:bg-white/[0.08]"
              }`}
            >
              {tab.icon}
            </span>

            <span className="whitespace-nowrap">{tab.label}</span>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                isActive
                  ? isAmber
                    ? "bg-amber-400/15 text-amber-300"
                    : "bg-emerald-400/15 text-emerald-300"
                  : "bg-white/[0.04] text-slate-500"
              }`}
            >
              {tab.count}
            </span>

            {isActive && (
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded-t-full ${
                  isAmber
                    ? "bg-gradient-to-r from-amber-400 to-orange-500"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500"
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
  <div className="flex flex-1 flex-col p-5">{children}</div>
</section>
);

export default TicketTabs;
