import { KeyRound, Search } from "lucide-react";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";

const PermissionsSection = ({ permissions, permissionSearch, setPermissionSearch, loadingPermissions, filteredPermissions }) => (
          <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="border-b border-white/[0.06] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold tracking-tight text-white">
                        Permissions
                      </h2>
                      <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-2.5 py-1 text-[10px] font-bold text-violet-300">
                        {permissions.length} total
                      </span>
                    </div>
                    <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                      System-defined permissions used to control access
                      throughout the application.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-72 lg:w-80">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={permissionSearch}
                    onChange={(e) => setPermissionSearch(e.target.value)}
                    placeholder="Search permissions..."
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-violet-400 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-2.5 sm:px-6">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20">
                <KeyRound className="h-3.5 w-3.5" />
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Permissions are system-defined and can only be assigned
                through roles.
              </p>
            </div>

            {loadingPermissions ? (
              <LoadingState text="Loading permissions..." />
            ) : filteredPermissions.length === 0 ? (
              <EmptyState
                icon={<KeyRound className="h-6 w-6" />}
                message="No permissions found."
              />
            ) : (
              <div className="grid grid-cols-1 gap-3 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPermissions.map((permission) => (
                  <div
                    key={permission._id}
                    className="group flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-violet-400/25 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-violet-400/20">
                      <KeyRound className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-all font-mono text-xs font-bold text-white">
                        {permission.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {permission.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
);

export default PermissionsSection;
