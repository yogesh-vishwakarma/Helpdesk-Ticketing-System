import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

import {
  LayoutDashboard,
  Ticket,
  ShieldCheck,
  Activity,
  Users,
  KeyRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useSelector } from "react-redux";

import axios from "../services/axios";
import usePermission from "../hooks/usePermission";

const Welcome = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const { hasPermission } = usePermission();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  /* ==================================================
     PERMISSIONS
  ================================================== */

  const canViewDashboard = hasPermission("DASHBOARD_VIEW");

  const canViewTickets =
    hasPermission("TICKET_VIEW_ALL") ||
    hasPermission("TICKET_VIEW_ASSIGNED") ||
    hasPermission("TICKET_VIEW_OWN");

  const canViewUsers = hasPermission("USER_VIEW");

  const canViewRoles = hasPermission("ROLE_VIEW");

  const canViewPermissions = hasPermission("PERMISSION_VIEW");

  const canViewAdmin = canViewUsers || canViewRoles || canViewPermissions;

  /* ==================================================
     LOGOUT
  ================================================== */

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await axios.post("/auth/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);
    } finally {
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  /* ==================================================
     NAVIGATION STYLE
  ================================================== */

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-emerald-500/10 text-emerald-400"
        : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
    }`;

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      {/* ==================================================
          LEFT SIDEBAR
      ================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/[0.08] bg-slate-900/95 backdrop-blur-xl transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden border-r-0"
        }`}
      >
        {/* BRAND + CLOSE TOGGLE */}

        <div className="flex h-[73px] shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">
            <Activity className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold tracking-tight text-white">
              Helpdesk
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
              Support Center
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            title="Close sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Menu
          </p>

          {canViewDashboard && (
            <NavLink to="/welcome/dashboard" className={navLinkClasses}>
              <LayoutDashboard size={18} className="shrink-0" />
              <span>Dashboard</span>
            </NavLink>
          )}

          {canViewTickets && (
            <NavLink to="/welcome/tickets" className={navLinkClasses}>
              <Ticket size={18} className="shrink-0" />
              <span>Tickets</span>
            </NavLink>
          )}

          {canViewAdmin && (
            <>
              <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Administration
              </p>

              {canViewUsers && (
                <NavLink to="/welcome/admin/users" className={navLinkClasses}>
                  <Users size={18} className="shrink-0" />
                  <span>Users</span>
                </NavLink>
              )}

              {canViewRoles && (
                <NavLink to="/welcome/admin/roles" className={navLinkClasses}>
                  <ShieldCheck size={18} className="shrink-0" />
                  <span>Roles</span>
                </NavLink>
              )}

              {canViewPermissions && (
                <NavLink
                  to="/welcome/admin/permissions"
                  className={navLinkClasses}
                >
                  <KeyRound size={18} className="shrink-0" />
                  <span>Permissions</span>
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* USER FOOTER */}

        <div className="shrink-0 border-t border-white/[0.08] p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.role || "User"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout"
              className="shrink-0 rounded-lg p-1.5 text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={18} className={loggingOut ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </aside>

      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div
        className={`relative flex h-screen min-w-0 flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* ==================================================
            FLOATING OPEN-SIDEBAR TOGGLE
        ================================================== */}

        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="fixed left-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-900/95 text-slate-300 shadow-xl backdrop-blur-xl transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <Menu size={18} />
          </button>
        )}

        {/* ==================================================
            PAGE CONTENT
            ✅ No left padding (touches sidebar with 0 gap)
            ✅ Minimal top padding (pt-2)
            ✅ Minimal bottom padding (pb-2)
        ================================================== */}

        <div className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-2 pt-2 pb-2 sm:px-3 sm:pt-3 sm:pb-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;