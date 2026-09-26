import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";

import AdminHeader from "../../Components/admin/AdminHeader";
import AdminError from "../../Components/admin/AdminError";
import AdminAccessDenied from "../../Components/admin/AdminAccessDenied";
import RolesSection from "../../Components/admin/Roles/RolesSection";
import RoleModal from "../../Components/admin/Modals/RoleModal";
import DeleteModal from "../../Components/admin/Modals/DeleteModal";
import ToastContainer from "../../Components/admin/ToastContainer";

const Roles = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canViewRoles = hasPermission("ROLE_VIEW");
  const canCreateRole = hasPermission("ROLE_CREATE");
  const canUpdateRole = hasPermission("ROLE_UPDATE");
  const canDeleteRole = hasPermission("ROLE_DELETE");
  const canViewPermissions = hasPermission("PERMISSION_VIEW");

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [error, setError] = useState("");

  const [toasts, setToasts] = useState([]);
  const [roleSearch, setRoleSearch] = useState("");

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [modalMode, setModalMode] = useState("create");
  const [selectedRole, setSelectedRole] = useState(null);

  const [deleteType, setDeleteType] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [savingRole, setSavingRole] = useState(false);

  const [roleForm, setRoleForm] = useState({
    roleName: "",
    description: "",
    permissions: [],
  });

  const [modalPermSearch, setModalPermSearch] = useState("");
  const [modalPermGroup, setModalPermGroup] = useState("all");

  const pushToast = (type, title, message = "") => {
    const id = Date.now() + Math.random();

    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const fetchRoles = async () => {
    if (!canViewRoles) return;

    try {
      setLoadingRoles(true);
      setError("");

      const response = await axios.get("/management/roles");
      setRoles(response.data.roles || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch roles.");
    } finally {
      setLoadingRoles(false);
    }
  };

  const fetchPermissions = async () => {
    if (!canViewPermissions) return;

    try {
      setLoadingPermissions(true);

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/management/users");
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch users.");
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
    fetchUsers();
  }, [canViewRoles, canViewPermissions]);

  const handleRoleInput = (e) => {
    const { name, value } = e.target;

    setRoleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateRoleModal = () => {
    setModalMode("create");
    setSelectedRole(null);
    setError("");
    setModalPermSearch("");
    setModalPermGroup("all");

    setRoleForm({
      roleName: "",
      description: "",
      permissions: [],
    });

    setShowRoleModal(true);
  };

  const openEditRoleModal = (role) => {
    setModalMode("edit");
    setSelectedRole(role);
    setError("");
    setModalPermSearch("");
    setModalPermGroup("all");

    setRoleForm({
      roleName: role.roleName || "",
      description: role.description || "",
      permissions:
        role.permissions?.map((permission) =>
          typeof permission === "object"
            ? permission._id
            : permission
        ) || [],
    });

    setShowRoleModal(true);
  };

  const togglePermission = (permissionId) => {
    setRoleForm((prev) => {
      const exists = prev.permissions.includes(permissionId);

      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((id) => id !== permissionId)
          : [...prev.permissions, permissionId],
      };
    });
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    if (!roleForm.roleName.trim()) {
      return pushToast(
        "error",
        "Validation error",
        "Role name is required."
      );
    }

    try {
      setSavingRole(true);
      setError("");

      await axios.post("/management/roles", {
        roleName: roleForm.roleName.trim(),
        description: roleForm.description.trim(),
        permissions: roleForm.permissions,
      });

      const roleName = roleForm.roleName.trim();
      const permissionCount = roleForm.permissions.length;

      setShowRoleModal(false);
      setRoleForm({
        roleName: "",
        description: "",
        permissions: [],
      });

      await fetchRoles();

      pushToast(
        "success",
        "Role created",
        `${roleName} has been created with ${permissionCount} permissions.`
      );
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to create role.";

      setError(msg);
      pushToast("error", "Failed to create role", msg);
    } finally {
      setSavingRole(false);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (!selectedRole?._id) return;

    if (!roleForm.roleName.trim()) {
      return pushToast(
        "error",
        "Validation error",
        "Role name is required."
      );
    }

    try {
      setSavingRole(true);
      setError("");

      await axios.patch(`/management/roles/${selectedRole._id}`, {
        roleName: roleForm.roleName.trim(),
        description: roleForm.description.trim(),
        permissions: roleForm.permissions,
      });

      const roleName = roleForm.roleName.trim();

      setShowRoleModal(false);
      setSelectedRole(null);

      await fetchRoles();

      pushToast(
        "success",
        "Role updated",
        `${roleName} has been updated successfully.`
      );
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to update role.";

      setError(msg);
      pushToast("error", "Failed to update role", msg);
    } finally {
      setSavingRole(false);
    }
  };

  const openDeleteModal = (type, item) => {
    setDeleteType(type);
    setDeleteItem(item);
    setError("");
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteItem?._id || deleting) return;

    const itemName = deleteItem?.roleName || "Role";

    try {
      setDeleting(true);
      setError("");

      await axios.delete(`/management/roles/${deleteItem._id}`);

      await fetchRoles();
      await fetchUsers();

      setShowDeleteModal(false);
      setDeleteItem(null);
      setDeleteType("");

      pushToast(
        "success",
        "Role deleted",
        `${itemName} has been removed successfully.`
      );
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to delete role.";

      setError(msg);
      pushToast("error", "Failed to delete", msg);
    } finally {
      setDeleting(false);
    }
  };

  const filteredRoles = useMemo(() => {
    const search = roleSearch.trim().toLowerCase();

    if (!search) return roles;

    return roles.filter(
      (role) =>
        role.roleName?.toLowerCase().includes(search) ||
        role.description?.toLowerCase().includes(search)
    );
  }, [roles, roleSearch]);

  const getPermissionGroup = (name = "") => {
    const parts = name.split("_");

    if (parts.length <= 1) return "OTHER";

    return parts[0] || "OTHER";
  };

  const permissionGroups = useMemo(() => {
    const groups = new Set();

    permissions.forEach((permission) => {
      groups.add(getPermissionGroup(permission.name));
    });

    return ["all", ...Array.from(groups).sort()];
  }, [permissions]);

  const modalFilteredPermissions = useMemo(() => {
    const search = modalPermSearch.trim().toLowerCase();

    return permissions.filter((permission) => {
      const matchesSearch =
        !search ||
        permission.name?.toLowerCase().includes(search) ||
        permission.description?.toLowerCase().includes(search);

      const matchesGroup =
        modalPermGroup === "all" ||
        getPermissionGroup(permission.name) === modalPermGroup;

      return matchesSearch && matchesGroup;
    });
  }, [permissions, modalPermSearch, modalPermGroup]);

  const selectedCount = roleForm.permissions.length;

  if (!canViewRoles) {
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
          canViewRoles={canViewRoles}
          canViewPermissions={false}
          usersCount={users.length}
          rolesCount={roles.length}
          permissionsCount={permissions.length}
        />

        {/* <AdminError
          error={error}
          visible={!!error && !showRoleModal && !showDeleteModal}
          onDismiss={() => setError("")}
        /> */}

        <RolesSection
          roles={roles}
          roleSearch={roleSearch}
          setRoleSearch={setRoleSearch}
          canCreateRole={canCreateRole}
          openCreateRoleModal={openCreateRoleModal}
          loadingRoles={loadingRoles}
          filteredRoles={filteredRoles}
          canUpdateRole={canUpdateRole}
          canDeleteRole={canDeleteRole}
          openEditRoleModal={openEditRoleModal}
          openDeleteModal={openDeleteModal}
        />
      </div>

      <RoleModal
        showRoleModal={showRoleModal}
        modalMode={modalMode}
        savingRole={savingRole}
        setShowRoleModal={setShowRoleModal}
        setSelectedRole={setSelectedRole}
        // error={error}
        handleCreateRole={handleCreateRole}
        handleUpdateRole={handleUpdateRole}
        roleForm={roleForm}
        handleRoleInput={handleRoleInput}
        selectedCount={selectedCount}
        modalFilteredPermissions={modalFilteredPermissions}
        modalPermSearch={modalPermSearch}
        setModalPermSearch={setModalPermSearch}
        permissionGroups={permissionGroups}
        modalPermGroup={modalPermGroup}
        setModalPermGroup={setModalPermGroup}
        togglePermission={togglePermission}
        setRoleForm={setRoleForm}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        deleteType={deleteType}
        deleteItem={deleteItem}
        deleting={deleting}
        setShowDeleteModal={setShowDeleteModal}
        setDeleteItem={setDeleteItem}
        handleDelete={handleDelete}
      />

      <ToastContainer
        toasts={toasts}
        dismissToast={dismissToast}
      />
    </div>
  );
};

export default Roles;
