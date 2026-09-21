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















// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router";

// import {
//   LayoutDashboard,
//   Ticket,
//   ShieldCheck,
//   Activity,
//   Users,
//   KeyRound,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import { useSelector } from "react-redux";

// import axios from "../services/axios";
// import usePermission from "../hooks/usePermission";

// const Welcome = () => {
//   const navigate = useNavigate();

//   const user = useSelector((state) => state.auth.user);

//   const { hasPermission } = usePermission();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* ==================================================
//      PERMISSIONS
//   ================================================== */

//   const canViewDashboard = hasPermission("DASHBOARD_VIEW");

//   const canViewTickets =
//     hasPermission("TICKET_VIEW_ALL") ||
//     hasPermission("TICKET_VIEW_ASSIGNED") ||
//     hasPermission("TICKET_VIEW_OWN");

//   const canViewUsers = hasPermission("USER_VIEW");

//   const canViewRoles = hasPermission("ROLE_VIEW");

//   const canViewPermissions = hasPermission("PERMISSION_VIEW");

//   const canViewAdmin = canViewUsers || canViewRoles || canViewPermissions;

//   /* ==================================================
//      LOGOUT — uses axios service (POST /auth/logout)
//   ================================================== */

//   const handleLogout = async () => {
//   try {
//     setLoggingOut(true);
//     await axios.post("/auth/logout");
//     console.log("Logout successful");
//   } catch (error) {
//     console.error("Logout error:", error?.response?.data || error.message);
//     // Don't return early — always redirect
//   } finally {
//     setLoggingOut(false);
//     navigate("/login", { replace: true });
//   }
// };
//   /* ==================================================
//      NAVIGATION STYLE
//   ================================================== */

//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
//       isActive
//         ? "bg-emerald-500/10 text-emerald-400"
//         : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
//     }`;

//   /* ==================================================
//      RENDER
//   ================================================== */

//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
//       {/* ==================================================
//           LEFT SIDEBAR
//       ================================================== */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/[0.08] bg-slate-900/95 backdrop-blur-xl transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-0 overflow-hidden border-r-0"
//         }`}
//       >
//         {/* BRAND + CLOSE TOGGLE */}

//         <div className="flex h-[73px] shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">
//             <Activity className="h-5 w-5 text-white" />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="text-sm font-extrabold tracking-tight text-white">
//               Helpdesk
//             </p>

//             <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
//               Support Center
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => setSidebarOpen(false)}
//             aria-label="Close sidebar"
//             title="Close sidebar"
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* NAVIGATION */}

//         <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
//           <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//             Menu
//           </p>

//           {canViewDashboard && (
//             <NavLink to="/welcome/dashboard" className={navLinkClasses}>
//               <LayoutDashboard size={18} className="shrink-0" />

//               <span>Dashboard</span>
//             </NavLink>
//           )}

//           {canViewTickets && (
//             <NavLink to="/welcome/tickets" className={navLinkClasses}>
//               <Ticket size={18} className="shrink-0" />

//               <span>Tickets</span>
//             </NavLink>
//           )}

//           {canViewAdmin && (
//             <>
//               <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//                 Administration
//               </p>

//               {canViewUsers && (
//                 <NavLink to="/welcome/admin/users" className={navLinkClasses}>
//                   <Users size={18} className="shrink-0" />

//                   <span>Users</span>
//                 </NavLink>
//               )}

//               {canViewRoles && (
//                 <NavLink to="/welcome/admin/roles" className={navLinkClasses}>
//                   <ShieldCheck size={18} className="shrink-0" />

//                   <span>Roles</span>
//                 </NavLink>
//               )}

//               {canViewPermissions && (
//                 <NavLink
//                   to="/welcome/admin/permissions"
//                   className={navLinkClasses}
//                 >
//                   <KeyRound size={18} className="shrink-0" />

//                   <span>Permissions</span>
//                 </NavLink>
//               )}
//             </>
//           )}
//         </nav>

//         {/* USER FOOTER */}

//         <div className="shrink-0 border-t border-white/[0.08] p-3">
//           <div className="flex items-center gap-3 rounded-lg px-2 py-2">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
//               {user?.name?.charAt(0)?.toUpperCase() || "U"}
//             </div>

//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold text-white">
//                 {user?.name || "User"}
//               </p>

//               <p className="truncate text-xs text-slate-500">
//                 {user?.role || "User"}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={handleLogout}
//               disabled={loggingOut}
//               title="Logout"
//               className="shrink-0 rounded-lg p-1.5 text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <LogOut size={18} className={loggingOut ? "animate-spin" : ""} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* ==================================================
//           MAIN AREA
//       ================================================== */}

//       <div
//         className={`relative flex h-screen min-w-0 flex-1 flex-col transition-all duration-300 ${
//           sidebarOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         {/* FLOATING OPEN-SIDEBAR TOGGLE */}

//         {!sidebarOpen && (
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             aria-label="Open sidebar"
//             title="Open sidebar"
//             className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/80 text-slate-300 shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300 hover:shadow-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
//           >
//             <Menu size={20} />
//           </button>
//         )}

//         {/* PAGE CONTENT */}

//         <div className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
//           <div className="w-full px-0 pt-0 pb-0">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Welcome;









// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router";

// import {
//   LayoutDashboard,
//   Ticket,
//   ShieldCheck,
//   Activity,
//   Users,
//   KeyRound,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import { useSelector } from "react-redux";

// import usePermission from "../hooks/usePermission";

// const Welcome = () => {
//   const navigate = useNavigate();

//   const user = useSelector((state) => state.auth.user);

//   const { hasPermission } = usePermission();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* ==================================================
//      PERMISSIONS
//   ================================================== */

//   const canViewDashboard =
//     hasPermission("DASHBOARD_VIEW");

//   const canViewTickets =
//     hasPermission("TICKET_VIEW_ALL") ||
//     hasPermission("TICKET_VIEW_ASSIGNED") ||
//     hasPermission("TICKET_VIEW_OWN");

//   const canViewUsers =
//     hasPermission("USER_VIEW");

//   const canViewRoles =
//     hasPermission("ROLE_VIEW");

//   const canViewPermissions =
//     hasPermission("PERMISSION_VIEW");

//   const canViewAdmin =
//     canViewUsers ||
//     canViewRoles ||
//     canViewPermissions;

//   /* ==================================================
//      LOGOUT
//   ================================================== */

//   const handleLogout = async () => {
//     try {
//       setLoggingOut(true);

//       const response = await fetch(
//         "http://localhost:5000/auth/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.message || "Logout failed"
//         );
//       }

//       console.log(data.message);

//       // Go back to login page
//       navigate("/login", { replace: true });

//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setLoggingOut(false);
//     }
//   };

//   /* ==================================================
//      NAVIGATION STYLE
//   ================================================== */

//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
//       isActive
//         ? "bg-emerald-500/10 text-emerald-400"
//         : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
//     }`;

//   /* ==================================================
//      RENDER
//   ================================================== */

//   return (
//     <div className="relative flex min-h-screen bg-slate-950 text-slate-100">

//       {/* ==================================================
//           LEFT SIDEBAR
//       ================================================== */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/[0.08] bg-slate-900/95 backdrop-blur-xl transition-all duration-300 ${
//           sidebarOpen
//             ? "w-64"
//             : "w-0 overflow-hidden border-r-0"
//         }`}
//       >

//         {/* ==================================================
//             BRAND
//         ================================================== */}

//         <div className="flex h-[73px] shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4">

//           {/* Logo */}

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">

//             <Activity className="h-5 w-5 text-white" />

//           </div>


//           {/* Brand */}

//           <div className="min-w-0">

//             <p className="text-sm font-extrabold tracking-tight text-white">
//               Helpdesk
//             </p>

//             <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
//               Support Center
//             </p>

//           </div>

//         </div>


//         {/* ==================================================
//             NAVIGATION
//         ================================================== */}

//         <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">

//           {/* MENU */}

//           <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//             Menu
//           </p>


//           {/* ==================================================
//               DASHBOARD
//           ================================================== */}

//           {canViewDashboard && (
//             <NavLink
//               to="/welcome/dashboard"
//               className={navLinkClasses}
//             >
//               <LayoutDashboard
//                 size={18}
//                 className="shrink-0"
//               />

//               <span>
//                 Dashboard
//               </span>
//             </NavLink>
//           )}


//           {/* ==================================================
//               TICKETS
//           ================================================== */}

//           {canViewTickets && (
//             <NavLink
//               to="/welcome/tickets"
//               className={navLinkClasses}
//             >
//               <Ticket
//                 size={18}
//                 className="shrink-0"
//               />

//               <span>
//                 Tickets
//               </span>
//             </NavLink>
//           )}


//           {/* ==================================================
//               ADMINISTRATION
//           ================================================== */}

//           {canViewAdmin && (
//             <>
//               <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//                 Administration
//               </p>


//               {/* USERS */}

//               {canViewUsers && (
//                 <NavLink
//                   to="/welcome/admin/users"
//                   className={navLinkClasses}
//                 >
//                   <Users
//                     size={18}
//                     className="shrink-0"
//                   />

//                   <span>
//                     Users
//                   </span>
//                 </NavLink>
//               )}


//               {/* ROLES */}

//               {canViewRoles && (
//                 <NavLink
//                   to="/welcome/admin/roles"
//                   className={navLinkClasses}
//                 >
//                   <ShieldCheck
//                     size={18}
//                     className="shrink-0"
//                   />

//                   <span>
//                     Roles
//                   </span>
//                 </NavLink>
//               )}


//               {/* PERMISSIONS */}

//               {canViewPermissions && (
//                 <NavLink
//                   to="/welcome/admin/permissions"
//                   className={navLinkClasses}
//                 >
//                   <KeyRound
//                     size={18}
//                     className="shrink-0"
//                   />

//                   <span>
//                     Permissions
//                   </span>
//                 </NavLink>
//               )}

//             </>
//           )}

//         </nav>


//         {/* ==================================================
//             USER FOOTER
//         ================================================== */}

//         <div className="shrink-0 border-t border-white/[0.08] p-3">

//           <div className="flex items-center gap-3 rounded-lg px-2 py-2">

//             {/* Avatar */}

//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
//               {user?.name?.charAt(0)?.toUpperCase() || "U"}
//             </div>


//             {/* User Details */}

//             <div className="min-w-0 flex-1">

//               <p className="truncate text-sm font-semibold text-white">
//                 {user?.name || "User"}
//               </p>

//               <p className="truncate text-xs text-slate-500">
//                 {user?.role || "User"}
//               </p>

//             </div>


//             {/* Logout */}

//             <button
//               type="button"
//               onClick={handleLogout}
//               disabled={loggingOut}
//               title="Logout"
//               className="shrink-0 rounded-lg p-1.5 text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <LogOut
//                 size={18}
//                 className={
//                   loggingOut
//                     ? "animate-spin"
//                     : ""
//                 }
//               />
//             </button>

//           </div>

//         </div>

//       </aside>


//       {/* ==================================================
//           MAIN AREA
//       ================================================== */}

//       <main
//         className={`min-h-screen flex-1 transition-all duration-300 ${
//           sidebarOpen
//             ? "ml-64"
//             : "ml-0"
//         }`}
//       >

//         {/* ==================================================
//             TOP BAR
//         ================================================== */}

//         <header className="sticky top-0 z-30 flex h-[73px] items-center gap-3 border-b border-white/[0.08] bg-slate-950/90 px-4 backdrop-blur-xl">

//           {/* ==================================================
//               SIDEBAR TOGGLE
//           ================================================== */}

//           <button
//             type="button"
//             onClick={() =>
//               setSidebarOpen((prev) => !prev)
//             }
//             aria-label={
//               sidebarOpen
//                 ? "Close sidebar"
//                 : "Open sidebar"
//             }
//             title={
//               sidebarOpen
//                 ? "Close sidebar"
//                 : "Open sidebar"
//             }
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-white/[0.08]
//               bg-white/[0.04]
//               text-slate-300
//               transition-all
//               duration-200
//               hover:-translate-y-0.5
//               hover:border-emerald-400/40
//               hover:bg-emerald-500/10
//               hover:text-emerald-300
//               hover:shadow-lg
//               hover:shadow-emerald-500/10
//               focus:outline-none
//               focus:ring-2
//               focus:ring-emerald-500/30
//             "
//           >

//             {sidebarOpen ? (
//               <X size={22} />
//             ) : (
//               <Menu size={22} />
//             )}

//           </button>


//           {/* ==================================================
//               SYSTEM STATUS
//           ================================================== */}

//           <div className="flex items-center gap-2">

//             <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />

//             <span className="text-xs font-semibold text-emerald-300">
//               System Online
//             </span>

//           </div>

//         </header>


//         {/* ==================================================
//             PAGE CONTENT

//             Child routes are rendered here.

//             /welcome/dashboard
//             /welcome/tickets
//             /welcome/tickets/create
//             /welcome/tickets/:ticketId
//             /welcome/tickets/:ticketId/edit
//             /welcome/admin/users
//             /welcome/admin/roles
//             /welcome/admin/permissions
//         ================================================== */}

//         <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

//           <Outlet />

//         </div>

//       </main>

//     </div>
//   );
// };

// export default Welcome;


















// import { useState } from "react";
// import { useNavigate, NavLink } from "react-router";
// import {
//   LayoutDashboard,
//   Ticket,
//   ShieldCheck,
//   Activity,
//   Users,
//   KeyRound,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// //import { logout } from "../redux/slices/authSlice";
// import usePermission from "../hooks/usePermission";

// // Import your existing pages
// import DashboardLayout from "./DashboardLayout"; // renders Dashboard content
// import TicketList from "./tickets/TicketList";           // renders Tickets content

// const Welcome = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   const { hasPermission } = usePermission();

//   // Sidebar open/closed
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // 👇 Which page to show in the main area (dashboard | tickets)
//   const [activeView, setActiveView] = useState("dashboard");

//   /* ==================================================
//      PERMISSIONS
//   ================================================== */

//   const canViewDashboard = hasPermission("DASHBOARD_VIEW");

//   const canViewTickets =
//     hasPermission("TICKET_VIEW_ALL") ||
//     hasPermission("TICKET_VIEW_ASSIGNED") ||
//     hasPermission("TICKET_VIEW_OWN");

//   const canViewUsers = hasPermission("USER_VIEW");
//   const canViewRoles = hasPermission("ROLE_VIEW");
//   const canViewPermissions = hasPermission("PERMISSION_VIEW");

//   const canViewAdmin = canViewUsers || canViewRoles || canViewPermissions;

//   /* ==================================================
//      HANDLERS
//   ================================================== */

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   // Sidebar menu — Dashboard / Tickets swap the main content
//   const handleMenuClick = (view) => {
//     setActiveView(view);
//   };

//   // Admin links stay as route navigation
//   const adminNavigate = (path) => navigate(path);

//   /* ==================================================
//      NAV LINK STYLES
//   ================================================== */

//   const menuButtonClasses = (isActive) =>
//     `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
//       isActive
//         ? "bg-emerald-500/10 text-emerald-400"
//         : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
//     }`;

//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
//       isActive
//         ? "bg-emerald-500/10 text-emerald-400"
//         : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
//     }`;

//   /* ==================================================
//      RENDER
//   ================================================== */

//   return (
//     <div className="relative flex min-h-screen bg-slate-950 text-slate-100">
//       {/* ==================================================
//           SIDEBAR
//       ================================================== */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-white/[0.08] bg-slate-900/70 backdrop-blur-xl transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-0 overflow-hidden border-r-0"
//         }`}
//       >
//         {/* Brand */}
//         <div className="flex items-center gap-2.5 border-b border-white/[0.08] px-4 py-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">
//             <Activity className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <p className="text-sm font-extrabold tracking-tight text-white">
//               Helpdesk
//             </p>
//             <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400/80">
//               Support Center
//             </p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
//           <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//             Menu
//           </p>

//           {/* Dashboard — swaps main content */}
//           {canViewDashboard && (
//             <button
//               type="button"
//               onClick={() => handleMenuClick("dashboard")}
//               className={menuButtonClasses(activeView === "dashboard")}
//             >
//               <LayoutDashboard size={18} />
//               Dashboard
//             </button>
//           )}

//           {/* Tickets — swaps main content (keeps sidebar) */}
//           {canViewTickets && (
//             <button
//               type="button"
//               onClick={() => handleMenuClick("tickets")}
//               className={menuButtonClasses(activeView === "tickets")}
//             >
//               <Ticket size={18} />
//               Tickets
//             </button>
//           )}

//           {/* Administration — real route navigation */}
//           {canViewAdmin && (
//             <>
//               <p className="px-3 pb-1 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
//                 Administration
//               </p>

//               {canViewUsers && (
//                 <button
//                   type="button"
//                   onClick={() => adminNavigate("/admin/users")}
//                   className={menuButtonClasses(false)}
//                 >
//                   <Users size={18} />
//                   Users
//                 </button>
//               )}

//               {canViewRoles && (
//                 <button
//                   type="button"
//                   onClick={() => adminNavigate("/admin/roles")}
//                   className={menuButtonClasses(false)}
//                 >
//                   <ShieldCheck size={18} />
//                   Roles
//                 </button>
//               )}

//               {canViewPermissions && (
//                 <button
//                   type="button"
//                   onClick={() => adminNavigate("/admin/permissions")}
//                   className={menuButtonClasses(false)}
//                 >
//                   <KeyRound size={18} />
//                   Permissions
//                 </button>
//               )}
//             </>
//           )}
//         </nav>

//         {/* User footer */}
//         <div className="border-t border-white/[0.08] p-3">
//           <div className="flex items-center gap-3 rounded-lg px-2 py-2">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
//               {user?.name?.charAt(0)?.toUpperCase() || "U"}
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold text-white">
//                 {user?.name || "User"}
//               </p>
//               <p className="truncate text-xs text-slate-500">
//                 {user?.role || "User"}
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
//               title="Logout"
//             >
//               <LogOut size={18} />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* ==================================================
//           MAIN CONTENT
//       ================================================== */}
//       <main
//         className={`flex-1 transition-all duration-300 ${
//           sidebarOpen ? "ml-64" : "ml-0"
//         }`}
//       >
//         {/* ============================================
//             Top bar with IMPROVED hamburger button
//         ============================================ */}
//         <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.08] bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
//           <button
//             onClick={() => setSidebarOpen((v) => !v)}
//             aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
//             className="
//               group
//               relative
//               flex h-10 w-10 items-center justify-center
//               rounded-xl
//               border border-white/[0.08]
//               bg-white/[0.04]
//               text-slate-300
//               shadow-sm
//               transition-all duration-200
//               hover:-translate-y-0.5
//               hover:border-emerald-400/40
//               hover:bg-emerald-500/10
//               hover:text-emerald-300
//               hover:shadow-lg
//               hover:shadow-emerald-500/10
//               active:translate-y-0
//               focus:outline-none
//               focus:ring-2
//               focus:ring-emerald-500/30
//             "
//           >
//             {/* Animated icon swap */}
//             <span className="relative h-5 w-5">
//               <Menu
//                 size={20}
//                 className={`absolute inset-0 transition-all duration-300 ${
//                   sidebarOpen
//                     ? "rotate-90 scale-0 opacity-0"
//                     : "rotate-0 scale-100 opacity-100"
//                 }`}
//               />
//               <X
//                 size={20}
//                 className={`absolute inset-0 transition-all duration-300 ${
//                   sidebarOpen
//                     ? "rotate-0 scale-100 opacity-100"
//                     : "-rotate-90 scale-0 opacity-0"
//                 }`}
//               />
//             </span>
//           </button>

//           <div className="flex items-center gap-2">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
//             <span className="text-xs font-semibold text-emerald-300">
//               System Online
//             </span>
//           </div>
//         </header>

//         <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//           {/* ============================================
//               CONTENT SWAP
//           ============================================ */}

//           {/* Dashboard view — shows welcome banner + DashboardLayout */}
//           {activeView === "dashboard" && (
//             <>
//               <div className="mb-6 flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
//                     Quick Start
//                   </p>
//                   <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
//                     Welcome back, {user?.name || "User"} 👋
//                   </h1>
//                   <p className="mt-1 text-sm text-slate-400">
//                     Here's your support overview. Use the sidebar to navigate.
//                   </p>
//                 </div>
//               </div>

//               <DashboardLayout />
//             </>
//           )}

//           {/* Tickets view — TicketList rendered inside the same layout */}
//           {activeView === "tickets" && (
//             <>
//               <div className="mb-6">
//                 <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
//                   Support
//                 </p>
//                 <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
//                   Tickets
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-400">
//                   Manage, track and resolve support requests.
//                 </p>
//               </div>

//               <TicketList />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Welcome;