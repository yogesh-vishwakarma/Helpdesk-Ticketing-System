import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  UserPlus,
  Ticket,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ShieldCheck,
  Tag,
  Flag,
  CircleDot,
  Users,
  Sparkles,
  X,
} from "lucide-react";

import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";
import Toast from "../../Components/TicketDetails/Toast";

const AssignTicket = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const { hasPermission } = usePermission();

  const canAssignTicket = hasPermission("TICKET_ASSIGN");

  const [ticket, setTicket] = useState(null);
  const [agents, setAgents] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState("");

  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [toasts, setToasts] = useState([]);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [ticketResponse, agentsResponse] = await Promise.all([
        axios.get(`/tickets/${ticketId}`),
        axios.get("/dashboard/agents"),
      ]);

      console.log("ASSIGN TICKET RESPONSE:", ticketResponse.data);
      console.log("AGENTS RESPONSE:", agentsResponse.data);

      setTicket(ticketResponse.data?.ticket || null);

      setAgents(agentsResponse.data?.agents || agentsResponse.data?.data || []);
    } catch (err) {
      console.error("ASSIGN PAGE ERROR:", err);

      setError(
        err.response?.data?.message || "Unable to load ticket information.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canAssignTicket && ticketId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [ticketId, canAssignTicket]);

  /* ================= ASSIGN ================= */
  const handleAssignTicket = async (e) => {
    e.preventDefault();

    if (!selectedAgent) {
      setError("Please select an agent.");
      return;
    }

    try {
      setAssigning(true);
      setError("");
      setSuccess("");

      await axios.post(`/tickets/${ticketId}/assign`, {
        assignedAgent: selectedAgent,
      });

      setSuccess("Ticket assigned successfully.");

      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "success",
          title: "Ticket assigned successfully.",
        },
      ]);

      setTimeout(() => {
        navigate("/welcome/tickets");
      }, 1000);

      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Unable to assign ticket.";

      setError("");

      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "error",
          title: "Assignment failed",
          message,
        },
      ]);

      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
    } finally {
      setAssigning(false);
    }
  };

  /* ================= ACCESS DENIED ================= */
  if (!canAssignTicket) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-slate-500/10 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
          <div className="p-8 text-center sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <AlertCircle className="h-9 w-9 text-red-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Access Denied
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              You don't have permission to assign tickets.
            </p>
            <button
              type="button"
              onClick={() => navigate("/ticketlist")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              Back to Tickets
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="relative min-h-full overflow-hidden bg-slate-950">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.08] blur-[110px]" />

          <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.06] blur-[110px]" />

          <div className="absolute bottom-[-200px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-teal-500/[0.04] blur-[120px]" />
        </div>

        {/* Page content */}
        <div className="relative mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="mb-7 space-y-3">
            <div className="h-4 w-24 animate-pulse rounded-md bg-white/[0.06]" />

            <div className="h-9 w-64 animate-pulse rounded-xl bg-white/[0.07]" />

            <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-white/[0.04]" />
          </div>

          {/* Main skeleton */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Ticket information */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-2xl bg-emerald-400/[0.08]" />

                <div className="space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded-md bg-white/[0.07]" />

                  <div className="h-3 w-48 animate-pulse rounded-md bg-white/[0.04]" />
                </div>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <div className="mb-2 h-3 w-20 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>

                {/* Description */}
                <div>
                  <div className="mb-2 h-3 w-24 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-32 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>

                {/* Category */}
                <div>
                  <div className="mb-2 h-3 w-20 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>
              </div>
            </div>

            {/* Assignment panel */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-2xl bg-cyan-400/[0.08]" />

                <div className="space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded-md bg-white/[0.07]" />

                  <div className="h-3 w-44 animate-pulse rounded-md bg-white/[0.04]" />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 h-3 w-28 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>

                <div>
                  <div className="mb-2 h-3 w-24 animate-pulse rounded bg-white/[0.05]" />

                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.05]" />
                </div>

                <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.05]" />
              </div>
            </div>
          </div>

          {/* Loading overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/[0.10] bg-slate-900/90 p-7 text-center shadow-2xl shadow-black/50 backdrop-blur-2xl">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

              {/* Glow */}
              <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

              {/* Spinner */}
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
                <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />
              </div>

              {/* Text */}
              <div className="relative mt-5">
                <p className="text-base font-bold tracking-tight text-white">
                  Loading ticket
                </p>

                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Preparing assignment details...
                </p>
              </div>

              {/* Loading dots */}
              <div className="mt-5 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= NO TICKET ================= */
  if (!ticket) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
          <div className="p-8 text-center sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <AlertCircle className="h-9 w-9 text-red-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Ticket Not Found
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              {error || "The requested ticket could not be found."}
            </p>
            <button
              type="button"
              onClick={() => navigate("/ticketlist")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              Back to Tickets
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedAgentData = agents.find((agent) => agent._id === selectedAgent);

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "A";
  };

  /* ================= MAIN UI ================= */
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-48 top-32 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* FULL-WIDTH / FULL-HEIGHT CONTAINER */}
      <div className="relative flex min-h-screen w-full flex-1 flex-col px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* =================================================
            PAGE HEADER (no Back button)
        ================================================= */}

        <div className="mb-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">
                  <UserPlus className="h-6 w-6 text-white" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-950 bg-cyan-500">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                      <Sparkles size={11} />
                      Ticket Management
                    </span>
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-400 ring-1 ring-white/[0.08]">
                      {ticket.ticketId || ticket._id}
                    </span>
                  </div>

                  <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Assign Ticket
                  </h1>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                    Connect this support request with the right agent for faster
                    resolution.
                  </p>
                </div>
              </div>

              {/* Agent Count */}
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-300 ring-1 ring-indigo-400/20">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-black leading-none text-white">
                    {agents.length}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">
                    Available agents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="mb-4 flex items-start gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/20">
              <AlertCircle className="h-5 w-5 text-red-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-red-200">
                Assignment failed
              </p>
              <p className="mt-0.5 text-xs leading-5 text-red-300/80">
                {error}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/20 hover:text-red-200"
              aria-label="Dismiss error"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 ring-1 ring-emerald-400/20">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-200">
                Assignment successful
              </p>
              <p className="mt-0.5 text-xs text-emerald-300/80">
                Redirecting you back to the ticket list...
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            MAIN GRID — full width, full remaining height
        ================================================= */}

        <div className="grid flex-1 grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="flex flex-col gap-5">
            {/* TICKET CARD */}
            <section className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Ticket Information
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Request details
                    </p>
                  </div>
                </div>

                {/* Ticket Identity */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-xs font-bold tracking-wide text-emerald-300">
                        {ticket.ticketId || ticket._id}
                      </p>

                      <h3 className="mt-2 break-words text-lg font-bold leading-7 text-white">
                        {ticket.title || "Untitled Ticket"}
                      </h3>
                    </div>

                    <div className="shrink-0">
                      <StatusBadge status={ticket.status} />
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {ticket.description || "No description provided."}
                  </p>
                </div>

                {/* Ticket Metadata */}
                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <InfoItem
                    icon={<Tag className="h-4 w-4" />}
                    label="Category"
                    value={ticket.category || "Not specified"}
                  />
                  <InfoItem
                    icon={<Flag className="h-4 w-4" />}
                    label="Priority"
                    value={ticket.priority || "Medium"}
                    highlight
                  />
                  <InfoItem
                    icon={<CircleDot className="h-4 w-4" />}
                    label="Status"
                    value={ticket.status || "Open"}
                  />
                </div>
              </div>
            </section>

            {/* CURRENT AGENT */}
            {ticket.assignedAgent && (
              <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Currently Assigned
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Existing ticket assignment
                    </p>
                  </div>

                  <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Assigned
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-bold text-white shadow-md ring-1 ring-indigo-400/30">
                      {getInitial(ticket.assignedAgent.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {ticket.assignedAgent.name || "Unknown Agent"}
                      </p>

                      <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs text-slate-500">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                        <span className="truncate">
                          {ticket.assignedAgent.email || "No email available"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* =================================================
              RIGHT COLUMN — Assign Form
          ================================================= */}

          <section className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500" />

            <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-300 ring-1 ring-indigo-400/20">
                  <UserPlus className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-white">
                    Assign Support Agent
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select the support agent responsible for handling this
                    ticket.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleAssignTicket}
              className="flex flex-1 flex-col p-5 sm:p-6"
            >
              {/* AGENT SELECT */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <label
                    htmlFor="support-agent"
                    className="text-sm font-bold text-white"
                  >
                    Support Agent
                  </label>
                  <span className="text-xs font-medium text-slate-500">
                    {agents.length} available
                  </span>
                </div>

                <div className="group relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" />

                  <select
                    id="support-agent"
                    value={selectedAgent}
                    onChange={(e) => {
                      setSelectedAgent(e.target.value);
                      setError("");
                    }}
                    disabled={assigning}
                    className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-white/[0.08] bg-slate-900/60 pl-11 pr-11 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/15 focus:border-indigo-400 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">Select a support agent</option>

                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name} — {agent.email}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>

                {agents.length === 0 && (
                  <div className="mt-3 flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/10 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/15 ring-1 ring-amber-400/20">
                      <Users className="h-4 w-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-200">
                        No agents available
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-amber-300/80">
                        No support agents are currently available for
                        assignment.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* SELECTED AGENT PREVIEW */}
              {selectedAgentData && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06]">
                  <div className="flex items-center justify-between border-b border-emerald-400/20 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      <span className="text-xs font-bold text-emerald-200">
                        Selected Agent
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Ready
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-md ring-1 ring-emerald-400/30">
                      {getInitial(selectedAgentData.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {selectedAgentData.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {selectedAgentData.email}
                      </p>
                    </div>

                    <div className="ml-auto hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/20 sm:flex">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    </div>
                  </div>
                </div>
              )}

              {/* HELPER MESSAGE */}
              {!selectedAgent && agents.length > 0 && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06]">
                    <Sparkles className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300">
                      Choose the right agent
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      Select an available support agent to continue with the
                      assignment.
                    </p>
                  </div>
                </div>
              )}

              {/* SPACER — pushes actions to the bottom of the card */}
              <div className="flex-1" />

              {/* ACTIONS */}
              <div className="mt-5 flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={assigning}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={assigning || !selectedAgent || agents.length === 0}
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
                >
                  {assigning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                      Assign Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* =================================================
            FOOTER HINT
        ================================================= */}

        <div className="mt-5 flex items-center justify-center gap-2 pb-2 text-center text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>
            Assignments are handled securely through your ticket management
            permissions.
          </span>
        </div>
      </div>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={() => {
            setToasts((prev) => prev.filter((item) => item.id !== toast.id));
          }}
        />
      ))}
    </div>
  );
};

/* ==================================================
   INFO ITEM
================================================== */

const InfoItem = ({ icon, label, value, highlight = false }) => {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 shadow-sm transition-all duration-200 hover:border-emerald-400/20 hover:bg-white/[0.04]">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${
            highlight
              ? "bg-orange-400/15 text-orange-300 ring-orange-400/20"
              : "bg-white/[0.04] text-slate-400 ring-white/[0.06]"
          }`}
        >
          {icon}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-white">{value}</p>
    </div>
  );
};

/* ==================================================
   STATUS BADGE
================================================== */

const StatusBadge = ({ status }) => {
  const styles = {
    Open: "border-orange-400/25 bg-orange-400/10 text-orange-300",
    "In Progress": "border-blue-400/25 bg-blue-400/10 text-blue-300",
    Waiting: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
    Resolved: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    Closed: "border-slate-400/25 bg-slate-400/10 text-slate-300",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm ${
        styles[status] || styles.Open
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "Open"}
    </span>
  );
};

export default AssignTicket;
