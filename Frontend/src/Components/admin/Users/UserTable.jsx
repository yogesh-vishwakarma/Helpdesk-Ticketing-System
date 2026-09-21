import { ShieldCheck, Trash2, UserCog } from "lucide-react";
import IconActionButton from "../common/IconActionButton";
import TableHeader from "../common/TableHeader";

const UserTable = ({ paginatedUsers, canUpdateUser, canDeleteUser, onUpdateRole, onDelete }) => (
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.02] text-left">
                        <TableHeader>User</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Role</TableHeader>
                        <TableHeader align="right">Actions</TableHeader>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {paginatedUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="group transition-colors duration-150 hover:bg-white/[0.02]"
                        >
                          <td className="px-5 py-3.5 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-sm ring-1 ring-emerald-400/30">
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white">
                                  {user.name || "Unknown User"}
                                </p>
                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  System user
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-3.5 text-sm text-slate-300 sm:px-6">
                            <span className="break-all">
                              {user.email || "-"}
                            </span>
                          </td>

                          <td className="px-5 py-3.5 sm:px-6">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/25 bg-indigo-400/10 px-2.5 py-1 text-[11px] font-bold text-indigo-300">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              {user.role?.roleName || "No Role"}
                            </span>
                          </td>

                          <td className="px-5 py-3.5 sm:px-6">
                            <div className="flex justify-end gap-2">
                              {canUpdateUser && (
                                <IconActionButton
                                  onClick={() => onUpdateRole(user)}
                                  title="Update role"
                                  icon={<UserCog className="h-4 w-4" />}
                                />
                              )}
                              {canDeleteUser && (
                                <IconActionButton
                                  onClick={() => onDelete(user)}
                                  title="Delete user"
                                  danger
                                  icon={<Trash2 className="h-4 w-4" />}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
);

export default UserTable;
