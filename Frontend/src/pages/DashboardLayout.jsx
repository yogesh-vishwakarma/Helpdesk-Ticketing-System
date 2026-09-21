
import React, { useEffect, useState } from "react";

import {
  Activity,
  CheckCircle2,
  LockKeyhole,
  Ticket,
  Loader2,
} from "lucide-react";

import axios from "../services/axios";
import usePermission from "../hooks/usePermission";

import TicketOverview from "../Components/dashboard/TicketOverview";
import TicketStatus from "../Components/dashboard/TicketStatus";
import TicketPriority from "../Components/dashboard/TicketPriority";
import TicketCategories from "../Components/dashboard/TicketCategories";
import RecentTickets from "../Components/dashboard/RecentTickets";
import UnassignedTickets from "../Components/dashboard/UnassignedTickets";
import SupportAgents from "../Components/dashboard/SupportAgents";


function DashboardLayout() {
  const { hasPermission } = usePermission();

  /* =========================================================
     PERMISSIONS
  ========================================================= */

  const canViewDashboard =
    hasPermission("DASHBOARD_VIEW");

  const canViewAllTickets =
    hasPermission("TICKET_VIEW_ALL");

  const canViewAssignedTickets =
    hasPermission("TICKET_VIEW_ASSIGNED");

  const canViewOwnTickets =
    hasPermission("TICKET_VIEW_OWN");

  const canAssignTickets =
    hasPermission("TICKET_ASSIGN");

  const canViewAgents =
    hasPermission("AGENT_VIEW");


  /* =========================================================
     STATE
  ========================================================= */

  const [dashboardData, setDashboardData] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [unassignedTickets, setUnassignedTickets] =
    useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================================================
     FETCH DASHBOARD DATA
     
     API FUNCTIONALITY IS NOT CHANGED
  ========================================================= */

  const fetchDashboardData = async () => {
    if (!canViewDashboard) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const safeGet = async (url, fallback) => {
        try {
          const res = await axios.get(url);

          return res.data?.data ?? fallback;
        } catch (err) {
          console.error(`Failed ${url}:`, err);

          return fallback;
        }
      };


      const [
        dashboardRes,
        statusRes,
        priorityRes,
        categoryRes,
        recentRes,
        unassignedRes,
        agentsRes,
      ] = await Promise.all([

        safeGet("/dashboard/", {}),

        safeGet(
          "/dashboard/tickets/status",
          []
        ),

        safeGet(
          "/dashboard/tickets/priority",
          []
        ),

        safeGet(
          "/dashboard/tickets/category",
          []
        ),

        safeGet(
          "/dashboard/tickets/recent",
          []
        ),

        canAssignTickets
          ? safeGet(
              "/dashboard/tickets/unassigned",
              []
            )
          : Promise.resolve([]),

        canViewAgents
          ? safeGet(
              "/dashboard/agents",
              []
            )
          : Promise.resolve([]),
      ]);


      setDashboardData(
        dashboardRes || {}
      );

      setStatusData(
        Array.isArray(statusRes)
          ? statusRes
          : []
      );

      setPriorityData(
        Array.isArray(priorityRes)
          ? priorityRes
          : []
      );

      setCategoryData(
        Array.isArray(categoryRes)
          ? categoryRes
          : []
      );

      setRecentTickets(
        Array.isArray(recentRes)
          ? recentRes
          : []
      );

      setUnassignedTickets(
        Array.isArray(unassignedRes)
          ? unassignedRes
          : []
      );

      setAgents(
        Array.isArray(agentsRes)
          ? agentsRes
          : []
      );

      console.log(
        "AGENTS RESPONSE:",
        agentsRes
      );

    } catch (err) {
      console.error(
        "DASHBOARD ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, [
    canViewDashboard,
    canAssignTickets,
    canViewAgents,
  ]);


  /* =========================================================
     ACCESS DENIED
  ========================================================= */

  if (!canViewDashboard) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />

          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-slate-500/10 blur-[120px]" />

        </div>


        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/80 shadow-2xl shadow-black/40">

          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />


          <div className="p-8 text-center sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <LockKeyhole className="h-9 w-9 text-red-400" />
            </div>


            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/10 px-3 py-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

              <span className="text-[11px] font-bold uppercase tracking-wider text-red-300">
                Restricted Area
              </span>

            </div>


            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
              Dashboard Access Restricted
            </h2>


            <p className="mt-3 text-sm leading-6 text-slate-400">
              You don't have permission to view the dashboard.
            </p>


            <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-6 text-xs text-slate-500">

              <LockKeyhole className="h-3.5 w-3.5" />

              <span>
                Access controlled by your permissions
              </span>

            </div>

          </div>
        </div>

      </div>
    );
  }


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return <DashboardSkeleton />;
  }


  /* =========================================================
     DESCRIPTION
  ========================================================= */

  const dashboardDescription =
    canViewAllTickets
      ? "Monitor ticket activity, priorities, categories and support requests across the system."
      : canViewAssignedTickets
        ? "Monitor your assigned tickets, priorities, categories and support requests."
        : canViewOwnTickets
          ? "Monitor your tickets, priorities, categories and support requests."
          : "View your support dashboard.";


  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

      </div>


      {/* Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",

          backgroundSize: "42px 42px",
        }}
      />


      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">


        {/* =====================================================
            HERO
        ===================================================== */}

        <header className="mb-5">

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 shadow-2xl shadow-black/30">

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />


            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[80px]" />


            <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0 flex-1">

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

                  </span>

                  <Activity className="h-3.5 w-3.5 text-emerald-300" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    Support Dashboard
                  </span>

                </div>


                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Dashboard
                </h1>


                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  {dashboardDescription}
                </p>

              </div>


              {/* Total tickets */}
              <div className="relative min-w-[200px] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/70 p-4">

                <div className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />


                <div className="relative flex items-center gap-3.5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25">

                    <Ticket className="h-5 w-5" />

                  </div>


                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Tickets
                    </p>

                    <p className="mt-0.5 text-3xl font-black text-white">
                      {dashboardData?.totalTickets || 0}
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </header>


        {/* =====================================================
            1. TICKET OVERVIEW
        ===================================================== */}

        <TicketOverview
          dashboardData={dashboardData}
        />


        {/* =====================================================
            2 + 3. STATUS + PRIORITY
        ===================================================== */}

        <div className="mb-5 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">

          <TicketStatus
            data={statusData}
            totalTickets={dashboardData?.totalTickets}
          />

          <TicketPriority
            data={priorityData}
            totalTickets={dashboardData?.totalTickets}
          />

        </div>


        {/* =====================================================
            4. CATEGORIES
        ===================================================== */}

        <TicketCategories
          data={categoryData}
        />


        {/* =====================================================
            5 + 6. RECENT + UNASSIGNED
        ===================================================== */}

        <div
          className={`mb-5 grid grid-cols-1 items-stretch gap-5 ${
            canAssignTickets
              ? "xl:grid-cols-2"
              : ""
          }`}
        >

          <RecentTickets
            data={recentTickets}
          />


          {canAssignTickets && (
            <UnassignedTickets
              data={unassignedTickets}
            />
          )}

        </div>


        {/* =====================================================
            7. SUPPORT AGENTS
        ===================================================== */}

        {canViewAgents && (
          <SupportAgents
            data={agents}
          />
        )}


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="flex flex-col items-center justify-center gap-2 border-t border-white/[0.06] py-5 text-center text-xs text-slate-500 sm:flex-row">

          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

          <span>
            Dashboard information is based on your current permissions.
          </span>

        </div>

      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD SKELETON
========================================================= */

const DashboardSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

      </div>


      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Hero */}
        <div className="mb-5">

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 shadow-2xl shadow-black/30">

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-500/40" />

            <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex-1 space-y-3">

                <div className="h-6 w-40 animate-pulse rounded-full bg-white/[0.06]" />

                <div className="h-9 w-52 animate-pulse rounded-lg bg-white/[0.06]" />

                <div className="h-4 w-full max-w-lg animate-pulse rounded-md bg-white/[0.04]" />

              </div>


              <div className="h-20 w-52 animate-pulse rounded-2xl bg-white/[0.05]" />

            </div>
          </div>
        </div>


        {/* Ticket Overview */}
        <div className="mb-5">

          <div className="mb-3 flex items-center gap-2.5">

            <div className="h-9 w-9 animate-pulse rounded-xl bg-white/[0.05]" />

            <div className="space-y-1.5">

              <div className="h-3.5 w-32 animate-pulse rounded bg-white/[0.06]" />

              <div className="h-3 w-44 animate-pulse rounded bg-white/[0.04]" />

            </div>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
              />
            ))}

          </div>
        </div>


        {/* Status + Priority */}
        <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

          <div className="h-56 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

          <div className="h-56 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

        </div>


        {/* Categories */}
        <div className="mb-5">

          <div className="h-48 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

        </div>


        {/* Recent + Unassigned */}
        <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

          <div className="h-72 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

          <div className="h-72 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

        </div>


        {/* Agents */}
        <div className="mb-5">

          <div className="h-56 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />

        </div>


        {/* Loading */}
        <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-500">

          <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />

          <span>
            Loading dashboard...
          </span>

        </div>

      </div>
    </div>
  );
};


export default DashboardLayout;
