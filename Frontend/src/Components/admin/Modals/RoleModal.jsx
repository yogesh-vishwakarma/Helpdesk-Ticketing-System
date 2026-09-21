import {
  AlertCircle,
  Check,
  CheckCheck,
  Eraser,
  Layers,
  Search,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import ModalButtons from "../common/ModalButtons";

const RoleModal = ({
  showRoleModal,
  modalMode,
  savingRole,
  setShowRoleModal,
  setSelectedRole,
  error,
  handleCreateRole,
  handleUpdateRole,
  roleForm,
  setRoleForm, // ✅ ADDED
  handleRoleInput,
  selectedCount,
  modalFilteredPermissions,
  modalPermSearch,
  setModalPermSearch,
  permissionGroups,
  modalPermGroup,
  setModalPermGroup,
  togglePermission,
}) => {
  if (!showRoleModal) return null;

  return (
    <Modal
      title={modalMode === "create" ? "Create Role" : "Update Role"}
      subtitle="Configure the role and its permissions."
      icon={<ShieldCheck className="h-5 w-5" />}
      accent="indigo"
      onClose={() => {
        if (savingRole) return;

        setShowRoleModal(false);
        setSelectedRole(null);
      }}
      wide
    >
      <form
        onSubmit={modalMode === "create" ? handleCreateRole : handleUpdateRole}
        className="space-y-3"
      >
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2.5">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-300" />

            <p className="text-xs text-red-200">{error}</p>
          </div>
        )}

        {/* ROLE INFORMATION */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Role Name
            </label>

            <input
              name="roleName"
              value={roleForm.roleName}
              onChange={handleRoleInput}
              placeholder="e.g. Support Manager"
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-slate-900/60 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-indigo-400 focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Description
            </label>

            <input
              name="description"
              value={roleForm.description}
              onChange={handleRoleInput}
              placeholder="Short description"
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-slate-900/60 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-indigo-400 focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* PERMISSIONS */}

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20">
                    <Layers className="h-3.5 w-3.5" />
                  </div>

                  <p className="text-xs font-bold text-white">Permissions</p>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    <CheckCheck className="h-3 w-3" />
                    {selectedCount} selected
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* SELECT ALL */}

                  <button
                    type="button"
                    onClick={() =>
                      setRoleForm((prev) => ({
                        ...prev,
                        permissions: modalFilteredPermissions.map((p) => p._id),
                      }))
                    }
                    className="flex h-7 items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 text-[10px] font-bold text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                  >
                    All
                  </button>

                  {/* CLEAR ALL */}

                  <button
                    type="button"
                    onClick={() =>
                      setRoleForm((prev) => ({
                        ...prev,
                        permissions: [],
                      }))
                    }
                    className="flex h-7 items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 text-[10px] font-bold text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Eraser className="h-3 w-3" />
                    Clear
                  </button>
                </div>
              </div>

              {/* SEARCH + GROUPS */}

              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    value={modalPermSearch}
                    onChange={(e) => setModalPermSearch(e.target.value)}
                    placeholder="Search permissions..."
                    className="h-8 w-full rounded-md border border-white/[0.08] bg-slate-900/60 pl-8 pr-2 text-xs text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-indigo-400 focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="flex flex-wrap gap-1">
                  {permissionGroups.map((group) => {
                    const active = modalPermGroup === group;

                    const label = group === "all" ? "All" : group;

                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setModalPermGroup(group)}
                        className={`rounded-md border px-2 py-1 text-[10px] font-bold transition ${
                          active
                            ? "border-indigo-400/40 bg-indigo-400/15 text-indigo-200"
                            : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-indigo-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PERMISSION LIST */}

          <div className="max-h-[42vh] overflow-y-auto p-2.5">
            {modalFilteredPermissions.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No permissions match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
                {modalFilteredPermissions.map((permission) => {
                  const selected = roleForm.permissions.includes(
                    permission._id,
                  );

                  return (
                    <label
                      key={permission._id}
                      className={`group flex cursor-pointer items-start gap-2 rounded-lg border p-2 transition ${
                        selected
                          ? "border-emerald-400/40 bg-emerald-400/10"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-indigo-400/30 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                          selected
                            ? "border-emerald-400 bg-emerald-500"
                            : "border-white/20 bg-white/[0.03] group-hover:border-emerald-400/40"
                        }`}
                      >
                        {selected && <Check className="h-3 w-3 text-white" />}
                      </div>

                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => togglePermission(permission._id)}
                        className="sr-only"
                      />

                      <div className="min-w-0 flex-1">
                        <p
                          className={`break-all font-mono text-[10px] font-bold ${
                            selected ? "text-emerald-200" : "text-white"
                          }`}
                        >
                          {permission.name}
                        </p>

                        <p className="mt-0.5 line-clamp-1 text-[10px] leading-3 text-slate-500">
                          {permission.description || "No description."}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] pt-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setShowRoleModal(false)}
            disabled={savingRole}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={savingRole}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
          >
            {savingRole ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />

                {modalMode === "create" ? "Creating..." : "Updating..."}
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />

                {modalMode === "create" ? "Create Role" : "Update Role"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleModal;
