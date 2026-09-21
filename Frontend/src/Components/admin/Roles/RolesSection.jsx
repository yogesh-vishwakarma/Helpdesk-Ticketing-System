import { Pencil, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import IconActionButton from "../common/IconActionButton";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";

const RolesSection = ({ roles, roleSearch, setRoleSearch, canCreateRole, openCreateRoleModal, loadingRoles, filteredRoles, canUpdateRole, canDeleteRole, openEditRoleModal, openDeleteModal }) => (
          <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="border-b border-white/[0.06] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold tracking-tight text-white">
                        Roles
                      </h2>
                      <span className="rounded-full border border-indigo-400/25 bg-indigo-400/10 px-2.5 py-1 text-[10px] font-bold text-indigo-300">
                        {roles.length} total
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Create dynamic roles and assign existing permissions.
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative min-w-0 flex-1 sm:w-72 lg:w-80">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
                      placeholder="Search roles..."
                      className="h-11 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-indigo-400 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </div>

                  {canCreateRole && (
                    <button
                      type="button"
                      onClick={openCreateRoleModal}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 ring-1 ring-indigo-400/40 transition hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-500"
                    >
                      <Plus className="h-4 w-4" />
                      Add Role
                    </button>
                  )}
                </div>
              </div>
            </div>

            {loadingRoles ? (
              <LoadingState text="Loading roles..." />
            ) : filteredRoles.length === 0 ? (
              <EmptyState
                icon={<ShieldCheck className="h-6 w-6" />}
                message="No roles found."
              />
            ) : (
              <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredRoles.map((role) => (
                  <div
                    key={role._id}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60 transition group-hover:opacity-100" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300 ring-1 ring-indigo-400/20">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-white">
                            {role.roleName}
                          </h3>
                          <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                            {role.permissions?.length || 0} permissions
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {canUpdateRole && (
                          <IconActionButton
                            onClick={() => openEditRoleModal(role)}
                            title="Edit role"
                            icon={<Pencil className="h-4 w-4" />}
                          />
                        )}
                        {canDeleteRole && (
                          <IconActionButton
                            onClick={() => openDeleteModal("role", role)}
                            title="Delete role"
                            danger
                            icon={<Trash2 className="h-4 w-4" />}
                          />
                        )}
                      </div>
                    </div>

                    <p className="mt-4 min-h-10 text-sm leading-6 text-slate-400">
                      {role.description || "No description provided."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {role.permissions?.slice(0, 4).map((permission) => (
                        <span
                          key={permission._id}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10px] font-medium text-slate-300"
                        >
                          {permission.name}
                        </span>
                      ))}
                      {role.permissions?.length > 4 && (
                        <span className="rounded-lg border border-indigo-400/25 bg-indigo-400/10 px-2 py-1 text-[10px] font-bold text-indigo-300">
                          +{role.permissions.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
);

export default RolesSection;
