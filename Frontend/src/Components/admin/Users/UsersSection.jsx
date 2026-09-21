import { Search, UserPlus, Users, X } from "lucide-react";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import UserPagination from "../common/UserPagination";
import UserTable from "./UserTable";

const USERS_PER_PAGE = 15;

const UsersSection = ({
  users, userSearch, setUserSearch, canCreateUser, openCreateUserModal,
  loadingUsers, filteredUsers, userStart, userEnd, totalUsers,
  paginatedUsers, canUpdateUser, canDeleteUser, openUpdateUserRoleModal,
  openDeleteModal, userPage, totalUserPages, setUserPage,
}) => (
          <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="border-b border-white/[0.06] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold tracking-tight text-white">
                        Users
                      </h2>
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                        {users.length} total
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage system users and their assigned roles.
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative min-w-0 flex-1 sm:w-72 lg:w-80">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search name, email or role..."
                      className="h-11 w-full rounded-xl border border-white/[0.08] bg-slate-900/60 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
                    />
                    {userSearch && (
                      <button
                        type="button"
                        onClick={() => setUserSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-white/10 hover:text-slate-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {canCreateUser && (
                    <button
                      type="button"
                      onClick={openCreateUserModal}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
                    >
                      <UserPlus className="h-4 w-4" />
                      Add User
                    </button>
                  )}
                </div>
              </div>
            </div>

            {!loadingUsers && filteredUsers.length > 0 && (
              <div className="flex flex-col gap-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Users className="h-3.5 w-3.5 text-slate-500" />
                  <span>
                    Showing{" "}
                    <strong className="font-bold text-white">{userStart}</strong>{" "}
                    –{" "}
                    <strong className="font-bold text-white">{userEnd}</strong>{" "}
                    of{" "}
                    <strong className="font-bold text-white">{totalUsers}</strong>{" "}
                    users
                  </span>
                </div>
                {userSearch && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Search active
                  </span>
                )}
              </div>
            )}

            {loadingUsers ? (
              <LoadingState text="Loading users..." />
            ) : filteredUsers.length === 0 ? (
              <EmptyState
                icon={<Users className="h-6 w-6" />}
                message={
                  userSearch ? "No users match your search." : "No users found."
                }
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                <UserTable
                  paginatedUsers={paginatedUsers}
                  canUpdateUser={canUpdateUser}
                  canDeleteUser={canDeleteUser}
                  onUpdateRole={openUpdateUserRoleModal}
                  onDelete={(user) => openDeleteModal("user", user)}
                />
                </div>

                {totalUsers > USERS_PER_PAGE && (
                  <UserPagination
                    currentPage={userPage}
                    totalPages={totalUserPages}
                    totalUsers={totalUsers}
                    start={userStart}
                    end={userEnd}
                    onPrevious={() =>
                      setUserPage((page) => Math.max(page - 1, 1))
                    }
                    onNext={() =>
                      setUserPage((page) => Math.min(page + 1, totalUserPages))
                    }
                    onPageChange={setUserPage}
                  />
                )}
              </>
            )}
          </section>
);

export default UsersSection;
