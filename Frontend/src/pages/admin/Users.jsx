import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";

import AdminHeader from "../../Components/admin/AdminHeader";
import AdminError from "../../Components/admin/AdminError";
import AdminAccessDenied from "../../Components/admin/AdminAccessDenied";
import UsersSection from "../../Components/admin/Users/UsersSection";
import UserModal from "../../Components/admin/Modals/UserModal";
import DeleteModal from "../../Components/admin/Modals/DeleteModal";
import ToastContainer from "../../Components/admin/ToastContainer";

const USERS_PER_PAGE = 15;

const Users = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canViewUsers = hasPermission("USER_VIEW");
  const canCreateUser = hasPermission("USER_CREATE");
  const canUpdateUser = hasPermission("USER_UPDATE");
  const canDeleteUser = hasPermission("USER_DELETE");
  const canViewRoles = hasPermission("ROLE_VIEW");

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [error, setError] = useState("");

  const [toasts, setToasts] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [modalMode, setModalMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteType, setDeleteType] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

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

  const fetchUsers = async () => {
    if (!canViewUsers) return;

    try {
      setLoadingUsers(true);
      setError("");

      const response = await axios.get("/management/users");
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchRoles = async () => {
    if (!canViewRoles) return;

    try {
      setLoadingRoles(true);

      const response = await axios.get("/management/roles");
      setRoles(response.data.roles || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch roles.");
    } finally {
      setLoadingRoles(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [canViewUsers, canViewRoles]);

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateUserModal = () => {
    setModalMode("create");
    setSelectedUser(null);
    setError("");

    setUserForm({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    setShowUserModal(true);
  };

  const openUpdateUserRoleModal = (user) => {
    setModalMode("role");
    setSelectedUser(user);
    setError("");

    setUserForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role?._id || "",
    });

    setShowUserModal(true);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!userForm.name.trim())
      return pushToast("error", "Validation error", "Name is required.");

    if (!userForm.email.trim())
      return pushToast("error", "Validation error", "Email is required.");

    if (!userForm.password)
      return pushToast("error", "Validation error", "Password is required.");

    if (!userForm.role)
      return pushToast("error", "Validation error", "Please select a role.");

    try {
      setSavingUser(true);
      setError("");

      await axios.post("/management/user", {
        name: userForm.name.trim(),
        email: userForm.email.trim(),
        password: userForm.password,
        role: userForm.role,
      });

      const userName = userForm.name.trim();

      setShowUserModal(false);
      setUserForm({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      setUserPage(1);
      await fetchUsers();

      pushToast(
        "success",
        "User created",
        `${userName} has been added successfully.`
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to create user.";

      setError(msg);
      pushToast("error", "Failed to create user", msg);
    } finally {
      setSavingUser(false);
    }
  };

  const handleUpdateUserRole = async (e) => {
    e.preventDefault();

    if (!selectedUser?._id) return;

    if (!userForm.role)
      return pushToast(
        "error",
        "Validation error",
        "Please select a role."
      );

    try {
      setSavingUser(true);
      setError("");

      await axios.patch(`/management/users/${selectedUser._id}/role`, {
        roleId: userForm.role,
      });

      const roleName =
        roles.find((role) => role._id === userForm.role)?.roleName ||
        "new role";

      const userName = selectedUser.name;

      setShowUserModal(false);
      setSelectedUser(null);

      await fetchUsers();

      pushToast(
        "success",
        "Role updated",
        `${userName}'s role changed to ${roleName}.`
      );
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to update user role.";

      setError(msg);
      pushToast("error", "Failed to update role", msg);
    } finally {
      setSavingUser(false);
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

    const itemName = deleteItem?.name || "User";

    try {
      setDeleting(true);
      setError("");

      await axios.delete(`/management/users/${deleteItem._id}`);
      await fetchUsers();

      setShowDeleteModal(false);
      setDeleteItem(null);
      setDeleteType("");

      pushToast(
        "success",
        "User deleted",
        `${itemName} has been removed successfully.`
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Unable to delete user.";

      setError(msg);
      pushToast("error", "Failed to delete", msg);
    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const search = userSearch.trim().toLowerCase();

    if (!search) return users;

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.role?.roleName?.toLowerCase().includes(search)
    );
  }, [users, userSearch]);

  const totalUsers = filteredUsers.length;
  const totalUserPages = Math.max(
    Math.ceil(totalUsers / USERS_PER_PAGE),
    1
  );

  const userStartIndex = (userPage - 1) * USERS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    userStartIndex,
    userStartIndex + USERS_PER_PAGE
  );

  const userStart = totalUsers === 0 ? 0 : userStartIndex + 1;
  const userEnd = Math.min(
    userStartIndex + USERS_PER_PAGE,
    totalUsers
  );

  useEffect(() => {
    setUserPage(1);
  }, [userSearch]);

  useEffect(() => {
    if (userPage > totalUserPages) {
      setUserPage(totalUserPages);
    }
  }, [userPage, totalUserPages]);

  if (!canViewUsers) {
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
          canViewUsers={canViewUsers}
          canViewRoles={false}
          canViewPermissions={false}
          usersCount={users.length}
          rolesCount={0}
          permissionsCount={0}
        />

        <UsersSection
          users={users}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          canCreateUser={canCreateUser}
          openCreateUserModal={openCreateUserModal}
          loadingUsers={loadingUsers || loadingRoles}
          filteredUsers={filteredUsers}
          userStart={userStart}
          userEnd={userEnd}
          totalUsers={totalUsers}
          paginatedUsers={paginatedUsers}
          canUpdateUser={canUpdateUser}
          canDeleteUser={canDeleteUser}
          openUpdateUserRoleModal={openUpdateUserRoleModal}
          openDeleteModal={openDeleteModal}
          userPage={userPage}
          totalUserPages={totalUserPages}
          setUserPage={setUserPage}
        />
      </div>

      <UserModal
        showUserModal={showUserModal}
        modalMode={modalMode}
        savingUser={savingUser}
        setShowUserModal={setShowUserModal}
        setSelectedUser={setSelectedUser}
        error={error}
        handleCreateUser={handleCreateUser}
        handleUpdateUserRole={handleUpdateUserRole}
        userForm={userForm}
        handleUserInput={handleUserInput}
        roles={roles}
        setUserForm={setUserForm}
        selectedUser={selectedUser}
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

export default Users;
