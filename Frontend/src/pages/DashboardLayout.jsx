import { useEffect, useState } from "react";
import axios from "../services/axios";

import StatCard from "../Components/dashboard/StatCard";
import StatusOverview from "../Components/dashboard/StatusOverview";
import PriorityOverview from "../Components/dashboard/PriorityOverview";
import CategoryOverview from "../Components/dashboard/CategoryOverview";
import RecentTickets from "../Components/dashboard/RecentTickets";
import UnassignedTickets from "../Components/dashboard/UnassignedTickets";
import AgentsTable from "../Components/dashboard/AgentsTable";

function DashboardLayout() {
  const [dashboardData, setDashboardData] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [unassignedTickets, setUnassignedTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(statusData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          dashboardResponse,
          statusResponse,
          priorityResponse,
          categoryResponse,
          recentResponse,
          unassignedResponse,
          agentsResponse,
        ] = await Promise.all([
          axios.get("/dashboard/"),
          axios.get("/dashboard/tickets/status"),
          axios.get("/dashboard/tickets/priority"),
          axios.get("/dashboard/tickets/category"),
          axios.get("/dashboard/tickets/recent"),
          axios.get("/dashboard/tickets/unassigned"),
          axios.get("/dashboard/agents"),
        ]);

        setDashboardData(dashboardResponse.data.data || {});

        setStatusData(statusResponse.data.data || []);

        setPriorityData(priorityResponse.data.data || []);

        setCategoryData(categoryResponse.data.data || []);

        setRecentTickets(recentResponse.data.data || []);

        setUnassignedTickets(unassignedResponse.data.data || []);

        setAgents(agentsResponse.data.data || []);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="mt-3 text-sm text-base-content/60">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
        <div className="alert alert-error max-w-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">

      {/* HEADER */}

      <div className="mb-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="mt-1 text-sm text-base-content/60">
              Monitor tickets, priorities, agents and support activity.
            </p>
          </div>

          <div className="badge badge-primary badge-outline px-4 py-3">
            Support Overview
          </div>
        </div>
      </div>


      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        <StatCard
          title="Total Tickets"
          value={dashboardData.totalTickets || 0}
          description="All tickets"
          icon="🎫"
        />

        <StatCard
          title="Open"
          value={dashboardData.openTickets || 0}
          description="Awaiting action"
          icon="📂"
          iconClass="bg-orange-500/10 text-orange-500"
        />

        <StatCard
          title="In Progress"
          value={dashboardData.inProgressTickets || 0}
          description="Currently working"
          icon="⚙️"
          iconClass="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          title="Resolved"
          value={dashboardData.resolvedTickets || 0}
          description="Successfully resolved"
          icon="✓"
          iconClass="bg-emerald-500/10 text-emerald-500"
        />

        <StatCard
          title="Closed"
          value={dashboardData.closedTickets || 0}
          description="Completed tickets"
          icon="🔒"
          iconClass="bg-gray-500/10 text-gray-500"
        />

        <StatCard
          title="Unassigned"
          value={dashboardData.unassignedTickets || 0}
          description="Need assignment"
          icon="⚠️"
          iconClass="bg-red-500/10 text-red-500"
        />

      </div>


      {/* STATUS + PRIORITY */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold">
                  Ticket Status
                </h2>

                <p className="text-sm text-base-content/50">
                  Distribution by current status
                </p>
              </div>

              <span className="badge badge-primary">
                {dashboardData.totalTickets || 0}
              </span>

            </div>

            <div className="mt-5">
              <StatusOverview data={statusData} />
            </div>

          </div>

        </div>


        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold">
                  Ticket Priority
                </h2>

                <p className="text-sm text-base-content/50">
                  Distribution by priority
                </p>
              </div>

              <span className="badge badge-primary">
                {dashboardData.totalTickets || 0}
              </span>

            </div>

            <div className="mt-5">
              <PriorityOverview data={priorityData} />
            </div>

          </div>

        </div>

      </div>


      {/* CATEGORY */}

      <div className="mt-6">

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div>

              <h2 className="text-lg font-bold">
                Ticket Categories
              </h2>

              <p className="text-sm text-base-content/50">
                Number of tickets in each category
              </p>

            </div>

            <div className="mt-5">
              <CategoryOverview data={categoryData} />
            </div>

          </div>

        </div>

      </div>


      {/* RECENT + UNASSIGNED */}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Recent Tickets
                </h2>

                <p className="text-sm text-base-content/50">
                  Latest tickets created
                </p>

              </div>

              <span className="badge badge-secondary">
                {recentTickets.length}
              </span>

            </div>

            <div className="mt-4">
              <RecentTickets data={recentTickets} />
            </div>

          </div>

        </div>


        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Unassigned Tickets
                </h2>

                <p className="text-sm text-base-content/50">
                  Tickets waiting for an agent
                </p>

              </div>

              <span className="badge badge-error">
                {unassignedTickets.length}
              </span>

            </div>

            <div className="mt-4">
              <UnassignedTickets data={unassignedTickets} />
            </div>

          </div>

        </div>

      </div>


      {/* AGENTS */}

      <div className="mt-6">

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Support Agents
                </h2>

                <p className="text-sm text-base-content/50">
                  Agent workload overview
                </p>

              </div>

              <span className="badge badge-primary">
                {agents.length} Agents
              </span>

            </div>

            <div className="mt-4">
              <AgentsTable data={agents} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;



















// import { useEffect, useMemo, useState } from "react";
// import axios from "../services/axios";

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const ITEMS_PER_PAGE = 7;

// /* =========================================================
//    REUSABLE COMPONENTS
// ========================================================= */

// function StatCard({
//   title,
//   value,
//   description,
//   icon,
//   iconClass = "bg-primary/10 text-primary",
// }) {
//   return (
//     <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
//       <div className="card-body p-5">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-sm font-medium text-base-content/60">{title}</p>

//             <h2 className="mt-2 text-3xl font-bold">{value}</h2>

//             <p className="mt-1 text-xs text-base-content/50">{description}</p>
//           </div>

//           <div
//             className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${iconClass}`}
//           >
//             {icon}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    PAGINATION COMPONENT
// ========================================================= */

// function Pagination({ currentPage, totalPages, onPageChange }) {
//   if (totalPages <= 1) {
//     return null;
//   }

//   return (
//     <div className="mt-5 flex items-center justify-between border-t border-base-300 pt-4">
//       <p className="text-sm text-base-content/60">
//         Page {currentPage} of {totalPages}
//       </p>

//       <div className="join">
//         <button
//           className="btn btn-sm join-item"
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//         >
//           ←
//         </button>

//         {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//           (page) => (
//             <button
//               key={page}
//               className={`btn btn-sm join-item ${
//                 currentPage === page ? "btn-primary" : ""
//               }`}
//               onClick={() => onPageChange(page)}
//             >
//               {page}
//             </button>
//           ),
//         )}

//         <button
//           className="btn btn-sm join-item"
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    STATUS OVERVIEW
// ========================================================= */

// function StatusOverview({ data = [] }) {
//   const statusColors = {
//     Open: "bg-orange-500",
//     "In Progress": "bg-blue-500",
//     Waiting: "bg-yellow-500",
//     Resolved: "bg-emerald-500",
//     Closed: "bg-gray-500",
//   };

//   const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

//   return (
//     <div className="space-y-5">
//       {data.length === 0 ? (
//         <p className="py-6 text-center text-sm text-base-content/50">
//           No status data available
//         </p>
//       ) : (
//         data.map((item) => {
//           const percentage =
//             total > 0 ? Math.round(((item.count || 0) / total) * 100) : 0;

//           return (
//             <div key={item.status}>
//               <div className="mb-2 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span
//                     className={`h-2.5 w-2.5 rounded-full ${
//                       statusColors[item.status] || "bg-primary"
//                     }`}
//                   />

//                   <span className="text-sm font-medium">{item.status}</span>
//                 </div>

//                 <div className="text-sm text-base-content/60">
//                   {item.count} <span className="text-xs">({percentage}%)</span>
//                 </div>
//               </div>

//               <div className="h-2.5 overflow-hidden rounded-full bg-base-300">
//                 <div
//                   className={`h-full rounded-full transition-all duration-500 ${
//                     statusColors[item.status] || "bg-primary"
//                   }`}
//                   style={{
//                     width: `${percentage}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    PRIORITY OVERVIEW
// ========================================================= */

// function PriorityOverview({ data = [] }) {
//   const priorityColors = {
//     Critical: "bg-purple-600",
//     High: "bg-red-500",
//     Medium: "bg-yellow-500",
//     Low: "bg-green-500",
//   };

//   const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

//   return (
//     <div className="space-y-5">
//       {data.length === 0 ? (
//         <p className="py-6 text-center text-sm text-base-content/50">
//           No priority data available
//         </p>
//       ) : (
//         data.map((item) => {
//           const percentage =
//             total > 0 ? Math.round(((item.count || 0) / total) * 100) : 0;

//           return (
//             <div key={item.priority}>
//               <div className="mb-2 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span
//                     className={`h-2.5 w-2.5 rounded-full ${
//                       priorityColors[item.priority] || "bg-primary"
//                     }`}
//                   />

//                   <span className="text-sm font-medium">{item.priority}</span>
//                 </div>

//                 <div className="text-sm text-base-content/60">
//                   {item.count} <span className="text-xs">({percentage}%)</span>
//                 </div>
//               </div>

//               <div className="h-2.5 overflow-hidden rounded-full bg-base-300">
//                 <div
//                   className={`h-full rounded-full transition-all duration-500 ${
//                     priorityColors[item.priority] || "bg-primary"
//                   }`}
//                   style={{
//                     width: `${percentage}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    CATEGORY OVERVIEW
// ========================================================= */

// function CategoryOverview({ data = [] }) {
//   if (data.length === 0) {
//     return (
//       <p className="py-6 text-center text-sm text-base-content/50">
//         No category data available
//       </p>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//       {data.map((item) => (
//         <div
//           key={item.category}
//           className="rounded-xl border border-base-300 p-4 transition hover:border-primary/40 hover:shadow-sm"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-base-content/60">Category</p>

//               <p className="mt-1 font-semibold">{item.category}</p>
//             </div>

//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
//               {item.count}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* =========================================================
//    RECENT TICKETS
// ========================================================= */

// function RecentTickets({ data = [] }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

//   const currentTickets = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;

//     return data.slice(start, start + ITEMS_PER_PAGE);
//   }, [data, currentPage]);

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   return (
//     <>
//       {data.length === 0 ? (
//         <p className="py-8 text-center text-sm text-base-content/50">
//           No recent tickets available
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Ticket</th>
//                 <th>Category</th>
//                 <th>Priority</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentTickets.map((ticket) => (
//                 <tr key={ticket._id}>
//                   <td>
//                     <div className="max-w-xs">
//                       <p className="truncate font-medium">
//                         {ticket.title || ticket.subject || "Untitled Ticket"}
//                       </p>

//                       <p className="truncate text-xs text-base-content/50">
//                         #{ticket._id}
//                       </p>
//                     </div>
//                   </td>

//                   <td>{ticket.category || "-"}</td>

//                   <td>
//                     {ticket.priority ? (
//                       <span className="badge badge-outline">
//                         {ticket.priority}
//                       </span>
//                     ) : (
//                       "-"
//                     )}
//                   </td>

//                   <td>
//                     {ticket.status ? (
//                       <span className="badge badge-primary badge-outline">
//                         {ticket.status}
//                       </span>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// }

// /* =========================================================
//    UNASSIGNED TICKETS
// ========================================================= */

// function UnassignedTickets({ data = [] }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

//   const currentTickets = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;

//     return data.slice(start, start + ITEMS_PER_PAGE);
//   }, [data, currentPage]);

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   return (
//     <>
//       {data.length === 0 ? (
//         <div className="py-8 text-center">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-xl text-success">
//             ✓
//           </div>

//           <p className="mt-3 font-medium">Everything is assigned</p>

//           <p className="mt-1 text-sm text-base-content/50">
//             There are no unassigned tickets.
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Ticket</th>
//                 <th>Category</th>
//                 <th>Priority</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentTickets.map((ticket) => (
//                 <tr key={ticket._id}>
//                   <td>
//                     <p className="max-w-xs truncate font-medium">
//                       {ticket.title || ticket.subject || "Untitled Ticket"}
//                     </p>
//                   </td>

//                   <td>{ticket.category || "-"}</td>

//                   <td>{ticket.priority || "-"}</td>

//                   <td>
//                     <span className="badge badge-error badge-outline">
//                       Unassigned
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// }

// /* =========================================================
//    AGENTS TABLE
// ========================================================= */

// function AgentsTable({ data = [] }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

//   const currentAgents = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;

//     return data.slice(start, start + ITEMS_PER_PAGE);
//   }, [data, currentPage]);

//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   return (
//     <>
//       {data.length === 0 ? (
//         <p className="py-8 text-center text-sm text-base-content/50">
//           No agents available
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Agent</th>
//                 <th>Email</th>
//                 <th>Assigned Tickets</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentAgents.map((agent) => (
//                 <tr key={agent._id}>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar placeholder">
//                         <div className="w-10 rounded-full bg-primary text-primary-content">
//                           <span className="font-semibold">
//                             {agent.name?.charAt(0)?.toUpperCase() || "A"}
//                           </span>
//                         </div>
//                       </div>

//                       <span className="font-medium">
//                         {agent.name || "Unknown"}
//                       </span>
//                     </div>
//                   </td>

//                   <td>{agent.email || "-"}</td>

//                   <td>
//                     <span className="badge badge-info">
//                       {agent.totalTickets || 0}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// }

// /* =========================================================
//    MAIN DASHBOARD
// ========================================================= */

// function DashboardLayout() {
//   const [dashboardData, setDashboardData] = useState({});
//   const [statusData, setStatusData] = useState([]);
//   const [priorityData, setPriorityData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [recentTickets, setRecentTickets] = useState([]);
//   const [unassignedTickets, setUnassignedTickets] = useState([]);
//   const [agents, setAgents] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   console.log(statusData);

//   /* =========================================================
//      FETCH DASHBOARD DATA
//   ========================================================= */

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [
//           dashboardResponse,
//           statusResponse,
//           priorityResponse,
//           categoryResponse,
//           recentResponse,
//           unassignedResponse,
//           agentsResponse,
//         ] = await Promise.all([
//           axios.get("/dashboard/"),

//           axios.get("/dashboard/tickets/status"),

//           axios.get("/dashboard/tickets/priority"),

//           axios.get("/dashboard/tickets/category"),

//           axios.get("/dashboard/tickets/recent"),

//           axios.get("/dashboard/tickets/unassigned"),

//           axios.get("/dashboard/agents"),
//         ]);

//         /* ===============================
//            HANDLE API RESPONSES
//         =============================== */

//         setDashboardData(dashboardResponse.data.data || {});

//         setStatusData(statusResponse.data.data || []);

//         setPriorityData(priorityResponse.data.data || []);

//         setCategoryData(categoryResponse.data.data || []);

//         setRecentTickets(recentResponse.data.data || []);

//         setUnassignedTickets(unassignedResponse.data.data || []);

//         setAgents(agentsResponse.data.data || []);
//       } catch (err) {
//         console.error(err);

//         setError(
//           err.response?.data?.message || "Failed to load dashboard data",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-base-200">
//         <div className="text-center">
//           <span className="loading loading-spinner loading-lg text-primary" />

//           <p className="mt-3 text-sm text-base-content/60">
//             Loading dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      ERROR
//   ========================================================= */

//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
//         <div className="alert alert-error max-w-lg">
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//      DASHBOARD UI
//   ========================================================= */

//   return (
//     <div className="min-h-screen bg-base-200 p-4 md:p-6">
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="mb-7">
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Dashboard</h1>

//             <p className="mt-1 text-sm text-base-content/60">
//               Monitor tickets, priorities, agents and support activity.
//             </p>
//           </div>

//           <div className="badge badge-primary badge-outline px-4 py-3">
//             Support Overview
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           STATISTICS
//       ===================================================== */}

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//         <StatCard
//           title="Total Tickets"
//           value={dashboardData.totalTickets || 0}
//           description="All tickets"
//           icon="🎫"
//         />

//         <StatCard
//           title="Open"
//           value={dashboardData.openTickets || 0}
//           description="Awaiting action"
//           icon="📂"
//           iconClass="bg-orange-500/10 text-orange-500"
//         />

//         <StatCard
//           title="In Progress"
//           value={dashboardData.inProgressTickets || 0}
//           description="Currently working"
//           icon="⚙️"
//           iconClass="bg-blue-500/10 text-blue-500"
//         />

//         <StatCard
//           title="Resolved"
//           value={dashboardData.resolvedTickets || 0}
//           description="Successfully resolved"
//           icon="✓"
//           iconClass="bg-emerald-500/10 text-emerald-500"
//         />

//         <StatCard
//           title="Closed"
//           value={dashboardData.closedTickets || 0}
//           description="Completed tickets"
//           icon="🔒"
//           iconClass="bg-gray-500/10 text-gray-500"
//         />

//         <StatCard
//           title="Unassigned"
//           value={dashboardData.unassignedTickets || 0}
//           description="Need assignment"
//           icon="⚠️"
//           iconClass="bg-red-500/10 text-red-500"
//         />
//       </div>

//       {/* =====================================================
//           STATUS + PRIORITY
//       ===================================================== */}

//       <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {/* STATUS */}

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Ticket Status</h2>

//                 <p className="text-sm text-base-content/50">
//                   Distribution by current status
//                 </p>
//               </div>

//               <span className="badge badge-primary">
//                 {dashboardData.totalTickets || 0}
//               </span>
//             </div>

//             <div className="mt-5">
//               <StatusOverview data={statusData} />
//             </div>
//           </div>
//         </div>

//         {/* PRIORITY */}

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Ticket Priority</h2>

//                 <p className="text-sm text-base-content/50">
//                   Distribution by priority
//                 </p>
//               </div>

//               <span className="badge badge-primary">
//                 {dashboardData.totalTickets || 0}
//               </span>
//             </div>

//             <div className="mt-5">
//               <PriorityOverview data={priorityData} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           CATEGORY
//       ===================================================== */}

//       <div className="mt-6">
//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div>
//               <h2 className="text-lg font-bold">Ticket Categories</h2>

//               <p className="text-sm text-base-content/50">
//                 Number of tickets in each category
//               </p>
//             </div>

//             <div className="mt-5">
//               <CategoryOverview data={categoryData} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           RECENT + UNASSIGNED
//       ===================================================== */}

//       <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
//         {/* RECENT TICKETS */}

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Recent Tickets</h2>

//                 <p className="text-sm text-base-content/50">
//                   Latest tickets created
//                 </p>
//               </div>

//               <span className="badge badge-secondary">
//                 {recentTickets.length}
//               </span>
//             </div>

//             <div className="mt-4">
//               <RecentTickets data={recentTickets} />
//             </div>
//           </div>
//         </div>

//         {/* UNASSIGNED TICKETS */}

//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Unassigned Tickets</h2>

//                 <p className="text-sm text-base-content/50">
//                   Tickets waiting for an agent
//                 </p>
//               </div>

//               <span className="badge badge-error">
//                 {unassignedTickets.length}
//               </span>
//             </div>

//             <div className="mt-4">
//               <UnassignedTickets data={unassignedTickets} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           AGENTS
//       ===================================================== */}

//       <div className="mt-6">
//         <div className="card border border-base-300 bg-base-100 shadow-sm">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-bold">Support Agents</h2>

//                 <p className="text-sm text-base-content/50">
//                   Agent workload overview
//                 </p>
//               </div>

//               <span className="badge badge-primary">
//                 {agents.length} Agents
//               </span>
//             </div>

//             <div className="mt-4">
//               <AgentsTable data={agents} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;
