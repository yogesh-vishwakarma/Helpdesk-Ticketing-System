import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertCircle,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Ticket,
  Users,
  X,
  Inbox,
} from "lucide-react";

import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";

import OverviewCard from "../../Components/ticketsList/OverviewCard";
import TicketFilters from "../../Components/ticketsList/TicketFilters";
import TicketTable from "../../Components/ticketsList/TicketTable";
import Pagination from "../../Components/ticketsList/Pagination";
import DeleteConfirmModal from "../../Components/ticketsList/DeleteConfirmModal";

function TicketList() {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  /* ================= PERMISSIONS ================= */
  const canViewAll = hasPermission("TICKET_VIEW_ALL");
  const canViewAssigned = hasPermission("TICKET_VIEW_ASSIGNED");
  const canViewOwn = hasPermission("TICKET_VIEW_OWN");
  const canAssign = hasPermission("TICKET_ASSIGN");
  const canUpdate = hasPermission("TICKET_UPDATE");
  const canUpdateStatus = hasPermission("TICKET_UPDATE_STATUS");
  const canUpdatePriority = hasPermission("TICKET_UPDATE_PRIORITY");
  const canCreateTicket = hasPermission("TICKET_CREATE");
  const canViewAgents = hasPermission("AGENT_VIEW");
  const canDeleteTicket = hasPermission("TICKET_DELETE");

  const canViewTickets = canViewAll || canViewAssigned || canViewOwn;

  const ticketView = canViewAll
    ? "all"
    : canViewAssigned
      ? "assigned"
      : canViewOwn
        ? "own"
        : "";

  /* ================= STATE ================= */
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [assignedAgent, setAssignedAgent] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalTickets: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  /* ================= DELETE MODAL STATE ================= */
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  /* ================= FETCH TICKETS ================= */
  const fetchTickets = async (requestedPage = page) => {
    if (!ticketView) {
      setTickets([]);
      setPagination({
        currentPage: 1,
        limit,
        totalTickets: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get("/tickets", {
        params: {
          view: ticketView,
          page: requestedPage,
          limit,
          search: search.trim(),
          status,
          priority,
          category,
          assignedAgent,
          sortBy,
          sortOrder,
        },
      });

      const ticketData = response.data?.data || response.data?.tickets || [];

      setTickets(ticketData);

      setPagination(
        response.data?.pagination || {
          currentPage: requestedPage,
          limit,
          totalTickets: response.data?.count || 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      );
    } catch (err) {
      console.error("TICKETS ERROR:", err);
      setError(err.response?.data?.message || "Unable to fetch tickets.");
      setTickets([]);
      setPagination({
        currentPage: 1,
        limit,
        totalTickets: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH AGENTS ================= */
  const fetchAgents = async () => {
    if (!canViewAgents) return;

    try {
      const response = await axios.get("/dashboard/agents");
      setAgents(response.data?.data || response.data?.agents || []);
    } catch (err) {
      console.error("AGENTS ERROR:", err);
      setAgents([]);
    }
  };

  /* ================= EFFECTS ================= */



  useEffect(() => {
    if (!canViewTickets) {
      setLoading(false);
      return;
    }
    fetchTickets(page);
  }, [
    ticketView,
    canViewTickets,
    page,
    search,
    status,
    priority,
    category,
    assignedAgent,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    if (canViewAgents) fetchAgents();
  }, [canViewAgents]);

  /* ================= KEYBOARD HANDLING FOR MODAL ================= */
  useEffect(() => {
    if (!deleteTarget) return;

    const handleKey = (e) => {
      if (e.key === "Escape" && !deleting) {
        closeDeleteModal();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deleteTarget, deleting]);

  /* ================= CATEGORY OPTIONS ================= */
  const categories = useMemo(() => {
    const set = new Set();
    tickets.forEach((t) => {
      if (t?.category) set.add(t.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [tickets]);

  /* ================= AGENT OPTIONS ================= */
  const agentOptions = useMemo(() => {
    const map = new Map();

    agents.forEach((agent) => {
      if (!agent?.email) return;
      map.set(agent.email.toLowerCase(), {
        _id: agent._id,
        name: agent.name || "Unknown Agent",
        email: agent.email,
      });
    });

    tickets.forEach((ticket) => {
      const agent = ticket?.assignedAgent;
      if (!agent?.email) return;
      const email = agent.email.toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          _id: agent._id,
          name: agent.name || "Unknown Agent",
          email: agent.email,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [agents, tickets]);


  /* ================= RESULT INFO ================= */
  const totalTickets = pagination.totalTickets || 0;
  const totalPages = Math.max(pagination.totalPages || 1, 1);

  const startIndex =
    totalTickets === 0
      ? 0
      : (pagination.currentPage - 1) * pagination.limit + 1;

  const endIndex =
    totalTickets === 0
      ? 0
      : Math.min(pagination.currentPage * pagination.limit, totalTickets);

  const activeFilterCount = [status, priority, category, assignedAgent].filter(
    Boolean,
  ).length;

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(status) ||
    Boolean(priority) ||
    Boolean(category) ||
    Boolean(assignedAgent);

  /* ================= RESET PAGE ================= */
  // useEffect(() => {
  //   setPage(1);
  // }, [search, status, priority, category, assignedAgent]);

  /* ================= HANDLERS ================= */
  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
    setAssignedAgent("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");
      await fetchTickets(page);
      if (canViewAgents) await fetchAgents();
    } catch (err) {
      console.error("REFRESH ERROR:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSortOrder = () => {
    setSortOrder((c) => (c === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  const handleView = (t) => navigate(`/welcome/tickets/${t._id}`);
  const handleEdit = (t) => navigate(`/welcome/tickets/${t._id}/edit`);
  const handleAssign = (t) => navigate(`/welcome/tickets/${t._id}/assign`);

  /* ================= DELETE HANDLERS ================= */
  const handleDelete = (ticket) => {
    setDeleteError("");
    setDeleteTarget(ticket);
  };

  const closeDeleteModal = () => {
    if (deleting) return;
    setDeleteTarget(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return;

    try {
      setDeleting(true);
      setDeleteError("");

      await axios.delete(`/tickets/${deleteTarget._id}`);

      await fetchTickets(page);
      if (canViewAgents) await fetchAgents();

      setDeleteTarget(null);
    } catch (err) {
      console.error("DELETE TICKET ERROR:", err);
      setDeleteError(err.response?.data?.message || "Unable to delete ticket.");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= NO PERMISSION ================= */
  if (!canViewTickets) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
          <div className="px-6 py-12 text-center sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <X size={32} className="text-red-400" />
            </div>
            <h2 className="mt-7 text-2xl font-bold tracking-tight text-white">
              Access Denied
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              You are not allowed to view tickets.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-400">
              <AlertCircle size={14} />
              Contact your administrator
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ✅ Background glows — contained, subtle, no side bleed */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-cyan-500/[0.05] blur-[140px]" />
      </div>

      {/* ✅ Grid pattern removed side white edges by using inset-x-0 and low opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* ✅ Main content — fixed max-width container, centered, consistent width */}
      <div className="relative mx-auto w-full max-w-[1400px] min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        {/* ============ PAGE HEADER ============ */}
        <div className="mb-4 sm:mb-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

            <div className="relative flex min-w-0 flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30 sm:h-14 sm:w-14">
                  <Ticket size={27} strokeWidth={2} className="text-white" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">
                    {totalTickets > 99 ? "99+" : totalTickets}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                      Tickets
                    </h1>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                      Live
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm lg:text-base">
                    Manage, track and resolve support requests.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading || refreshing}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/[0.07] hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  <RefreshCw
                    size={17}
                    className={
                      loading || refreshing
                        ? "animate-spin"
                        : "transition-transform duration-300 group-hover:rotate-180"
                    }
                  />
                  <span>Refresh</span>
                </button>

                {canCreateTicket && (
                  <button
                    type="button"
                    onClick={() => navigate("/welcome/tickets/create")}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/50 sm:flex-none"
                  >
                    <Plus
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />
                    <span>Create Ticket</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============ OVERVIEW ============ */}
        <div
          className={`mb-5 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 ${
            canViewAgents ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          <OverviewCard
            icon={<Ticket size={20} />}
            label="Total Tickets"
            value={totalTickets}
            description="Available tickets"
            accent="slate"
          />
          <OverviewCard
            icon={<Inbox size={20} />}
            label="Current Page"
            value={`${page} / ${totalPages}`}
            description={`${tickets.length} tickets loaded`}
            accent="emerald"
          />
          {canViewAgents && (
            <OverviewCard
              icon={<Users size={20} />}
              label="Available Agents"
              value={agentOptions.length}
              description="Agents available for assignment"
              accent="indigo"
            />
          )}
        </div>

        {/* ============ SEARCH + FILTERS ============ */}
        <div className="mb-5 w-full min-w-0">
          <TicketFilters
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            category={category}
            setCategory={setCategory}
            assignedAgent={assignedAgent}
            setAssignedAgent={setAssignedAgent}
            categories={categories}
            agentOptions={agentOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            onSortOrder={handleSortOrder}
            onSearch={handleSearch}
            onClear={handleClearFilters}
            canViewAgents={canViewAgents}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* ============ ERROR ============ */}
        {error && (
          <div className="mb-5 flex items-start gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-200 shadow-lg backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/20">
              <AlertCircle size={18} className="text-red-300" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-red-200">Something went wrong</p>
              <p className="mt-0.5 text-red-300/80">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/20 hover:text-red-200"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* ============ RESULT SUMMARY ============ */}
        <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] shadow-sm backdrop-blur-sm">
              <SlidersHorizontal size={17} className="text-slate-400" />
            </div>
            <p className="min-w-0 text-xs text-slate-400 sm:text-sm">
              Showing <span className="font-bold text-white">{startIndex}</span>{" "}
              – <span className="font-bold text-white">{endIndex}</span> of{" "}
              <span className="font-bold text-white">{totalTickets}</span>{" "}
              tickets
            </p>
          </div>

          {hasActiveFilters && (
            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {activeFilterCount > 0
                ? `${activeFilterCount} filter${
                    activeFilterCount > 1 ? "s" : ""
                  } active`
                : "Search active"}
            </div>
          )}
        </div>

        {/* ============ TABLE ============ */}
        {/* ✅ No forced min-width on page. Table scrolls inside its own container. */}
        <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
          <div className="w-full overflow-x-auto">
            <TicketTable
              tickets={tickets}
              loading={loading}
              onView={handleView}
              onEdit={handleEdit}
              onAssign={handleAssign}
              onDelete={handleDelete}
              canSeeAssignedAgent={canViewAll || canViewOwn}
              canAssign={canAssign}
              canUpdate={canUpdate}
              canDelete={canDeleteTicket}
              canUpdateStatus={canUpdateStatus}
              canUpdatePriority={canUpdatePriority}
            />
          </div>
        </div>

        {/* ============ PAGINATION ============ */}
        {!loading && totalTickets > 0 && (
          <Pagination
            page={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalTickets={pagination.totalTickets}
            limit={pagination.limit}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onPrevious={() => setPage((c) => Math.max(c - 1, 1))}
            onNext={() =>
              setPage((c) => Math.min(c + 1, pagination.totalPages))
            }
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>

      {/* ============ DELETE CONFIRMATION MODAL ============ */}
      {deleteTarget && (
        <DeleteConfirmModal
          ticket={deleteTarget}
          loading={deleting}
          error={deleteError}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default TicketList;
