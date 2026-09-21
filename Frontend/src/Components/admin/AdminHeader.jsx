import { KeyRound, Settings2, ShieldCheck, Users } from "lucide-react";
import MiniStat from "./common/MiniStat";

const AdminHeader = ({ canViewUsers, canViewRoles, canViewPermissions, usersCount, rolesCount, permissionsCount }) => (
        <header className="mb-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-400/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-400/10 blur-[100px]" />

            <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30">
                  <Settings2 className="h-6 w-6 text-white" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      Administration
                    </h1>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Control Center
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-400">
                    Manage users, dynamic roles and system permissions from
                    one place.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </header>
);

export default AdminHeader;
