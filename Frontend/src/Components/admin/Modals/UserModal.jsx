import { AlertCircle, Users } from "lucide-react";
import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import ModalButtons from "../common/ModalButtons";

const UserModal = ({ showUserModal, modalMode, savingUser, setShowUserModal, setSelectedUser, error, handleCreateUser, handleUpdateUserRole, userForm, handleUserInput, roles, setUserForm, selectedUser }) => {
  if (!showUserModal) return null;
  return (
        <Modal
          title={modalMode === "create" ? "Create User" : "Update User Role"}
          subtitle={
            modalMode === "create"
              ? "Create a new system user and assign a role."
              : "Change the role assigned to this user."
          }
          icon={<Users className="h-5 w-5" />}
          accent="emerald"
          onClose={() => {
            if (savingUser) return;
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        >
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-300" />
              <p className="text-xs text-red-200">{error}</p>
            </div>
          )}

          {modalMode === "create" ? (
            <form onSubmit={handleCreateUser} className="space-y-4">
              <FormInput
                label="Name"
                name="name"
                value={userForm.name}
                onChange={handleUserInput}
                placeholder="Enter user's full name"
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleUserInput}
                placeholder="Enter email address"
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={userForm.password}
                onChange={handleUserInput}
                placeholder="Enter password"
              />
              <FormSelect
                label="Role"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, role: e.target.value }))
                }
                options={roles}
                placeholder="Select a role"
              />
              <ModalButtons
                onCancel={() => setShowUserModal(false)}
                submitText="Create User"
                submitting={savingUser}
                submittingText="Creating..."
              />
            </form>
          ) : (
            <form onSubmit={handleUpdateUserRole} className="space-y-4">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white ring-1 ring-emerald-400/30">
                    {selectedUser?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {selectedUser?.name}
                    </p>
                    <p className="mt-0.5 break-all text-xs text-slate-500">
                      {selectedUser?.email}
                    </p>
                  </div>
                </div>
              </div>

              <FormSelect
                label="Role"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, role: e.target.value }))
                }
                options={roles}
                placeholder="Select a role"
              />

              <ModalButtons
                onCancel={() => setShowUserModal(false)}
                submitText="Update Role"
                submitting={savingUser}
                submittingText="Updating..."
              />
            </form>
          )}
        </Modal>
  );
};

export default UserModal;
