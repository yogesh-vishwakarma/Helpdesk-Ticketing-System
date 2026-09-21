import { Routes, Route, Navigate } from "react-router";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "./redux/slices/authSlice";

import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./pages/login";
import Signup from "./pages/signup";

import Welcome from "./pages/Welcome";
import DashboardLayout from "./pages/DashboardLayout";

import TicketList from "./pages/tickets/TicketList";
import TicketDetails from "./pages/tickets/TicketDetails";
import CreateTicket from "./pages/tickets/CreateTicket";
import EditTicket from "./pages/tickets/EditTicket";
import AssignTicket from "./pages/tickets/AssignTicket";

import Users from "./pages/admin/Users";
import Roles from "./pages/admin/Roles";
import Permissions from "./pages/admin/Permissions";

function App() {
  const dispatch = useDispatch();

  // Check authentication when application starts
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* ================= PROTECTED APPLICATION ================= */}

      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      >
        {/* /welcome → /welcome/dashboard */}

        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="dashboard"
          element={
            <ProtectedRoute permission="DASHBOARD_VIEW">
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* ================= TICKETS ================= */}

        {/* User needs at least ONE of these permissions */}

        <Route
          path="tickets"
          element={
            <ProtectedRoute
              permissions={[
                "TICKET_VIEW_ALL",
                "TICKET_VIEW_ASSIGNED",
                "TICKET_VIEW_OWN",
              ]}
            >
              <TicketList />
            </ProtectedRoute>
          }
        />

        {/* ================= CREATE TICKET ================= */}

        <Route
          path="tickets/create"
          element={
            <ProtectedRoute permission="TICKET_CREATE">
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        {/* ================= TICKET DETAILS ================= */}

        <Route
          path="tickets/:ticketId"
          element={
            <ProtectedRoute
              permissions={[
                "TICKET_VIEW_ALL",
                "TICKET_VIEW_ASSIGNED",
                "TICKET_VIEW_OWN",
              ]}
            >
              <TicketDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= EDIT TICKET ================= */}

        <Route
          path="tickets/:ticketId/edit"
          element={
            <ProtectedRoute permission="TICKET_UPDATE">
              <EditTicket />
            </ProtectedRoute>
          }
        />

        {/* ================= ASSIGN TICKET ================= */}

        <Route
          path="tickets/:ticketId/assign"
          element={
            <ProtectedRoute permission="TICKET_ASSIGN">
              <AssignTicket />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMINISTRATION ================= */}

        {/* USERS */}

        <Route
          path="admin/users"
          element={
            <ProtectedRoute permission="USER_VIEW">
              <Users />
            </ProtectedRoute>
          }
        />

        {/* ROLES */}

        <Route
          path="admin/roles"
          element={
            <ProtectedRoute permission="ROLE_VIEW">
              <Roles />
            </ProtectedRoute>
          }
        />

        {/* PERMISSIONS */}

        <Route
          path="admin/permissions"
          element={
            <ProtectedRoute permission="PERMISSION_VIEW">
              <Permissions />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= FALLBACK ================= */}

      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

export default App;
