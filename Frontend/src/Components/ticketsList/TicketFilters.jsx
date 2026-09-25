import { Search, Filter, Users, ArrowUpDown ,X} from "lucide-react";

import FilterField from "./FilterField";
import FilterSelect from "./FilterSelect";

function TicketFilters({
  searchInput,
  setSearchInput,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  assignedAgent,
  setAssignedAgent,
  categories,
  agentOptions,
  sortBy,
  setSortBy,
  sortOrder,
  onSortOrder,
  onSearch,
  onClear,
  canViewAgents,
  activeFilterCount,
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
      {/* SEARCH HEADER */}
      <div className="relative border-b border-white/[0.06] p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-400/10 blur-[80px]" />

        <div className="relative">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                <Search size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Search tickets
                </h2>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Find tickets by ID, title, customer or agent
                </p>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <span className="hidden rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 sm:inline-flex">
                {activeFilterCount} active
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="group relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-emerald-400"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
                placeholder="Search by ticket ID, title, customer or agent email..."
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-slate-900/60 pl-11 pr-4 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
              />
            </div>
            <button
              type="button"
              onClick={onSearch}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-sm font-bold text-white shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/50 sm:w-auto"
            >
              <Search size={17} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-slate-300 ring-1 ring-white/[0.08]">
              <Filter size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Filters</h2>
              <p className="text-xs text-slate-500 sm:text-sm">
                Narrow down your ticket list
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
          >
            <X
              size={15}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <FilterField label="Status">
            <FilterSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </FilterSelect>
          </FilterField>

          <FilterField label="Priority">
            <FilterSelect
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </FilterSelect>
          </FilterField>

          <FilterField label="Category">
            <FilterSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </FilterSelect>
          </FilterField>

          {canViewAgents ? (
            <FilterField label="Assigned Agent">
              <FilterSelect
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value)}
              >
                <option value="">All Assigned Agents</option>
                {agentOptions.map((agent) => (
                  <option key={agent._idl} value={agent._id}>
                    {agent.name} — {agent.email}
                  </option>
                ))}
              </FilterSelect>
            </FilterField>
          ) : (
            <div className="hidden xl:block" />
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.06] pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <Users size={16} />
            <span>{agentOptions.length} available agents</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 min-w-[150px] rounded-xl border border-white/[0.08] bg-slate-900/60 px-3.5 text-sm font-semibold text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
            >
              <option value="createdAt">Created Date</option>
              <option value="updatedAt">Updated Date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>

            <button
              type="button"
              onClick={onSortOrder}
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
              className="group flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/60 px-3.5 text-sm font-semibold text-slate-300 shadow-sm transition-all duration-200 hover:border-emerald-400/30 hover:bg-white/[0.05] hover:text-emerald-300"
            >
              <ArrowUpDown
                size={17}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
              <span className="hidden sm:inline">
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TicketFilters;
