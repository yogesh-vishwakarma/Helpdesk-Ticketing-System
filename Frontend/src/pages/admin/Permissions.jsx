import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";

import AdminHeader from "../../Components/admin/AdminHeader";
import AdminError from "../../Components/admin/AdminError";
import AdminAccessDenied from "../../Components/admin/AdminAccessDenied";
import PermissionsSection from "../../Components/admin/Permissions/PermissionsSection";

const Permissions = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canViewPermissions = hasPermission("PERMISSION_VIEW");

  const [permissions, setPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [error, setError] = useState("");
  const [permissionSearch, setPermissionSearch] = useState("");

  const fetchPermissions = async () => {
    if (!canViewPermissions) return;

    try {
      setLoadingPermissions(true);
      setError("");

      const response = await axios.get("/management/permissions");
      setPermissions(response.data.permission || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch permissions."
      );
    } finally {
      setLoadingPermissions(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [canViewPermissions]);

  const filteredPermissions = useMemo(() => {
    const search = permissionSearch.trim().toLowerCase();

    return permissions
      .filter(
        (permission) =>
          !search ||
          permission.name?.toLowerCase().includes(search) ||
          permission.description?.toLowerCase().includes(search)
      )
      .sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || "",
          undefined,
          { sensitivity: "base" }
        )
      );
  }, [permissions, permissionSearch]);

  if (!canViewPermissions) {
    return (
      <AdminAccessDenied
        onBack={() => navigate("/welcome/dashboard")}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <AdminHeader
          canViewUsers={false}
          canViewRoles={false}
          canViewPermissions={canViewPermissions}
          usersCount={0}
          rolesCount={0}
          permissionsCount={permissions.length}
        />

        <AdminError
          error={error}
          visible={!!error}
          onDismiss={() => setError("")}
        />

        <PermissionsSection
          permissions={permissions}
          permissionSearch={permissionSearch}
          setPermissionSearch={setPermissionSearch}
          loadingPermissions={loadingPermissions}
          filteredPermissions={filteredPermissions}
        />
      </div>
    </div>
  );
};

export default Permissions;
