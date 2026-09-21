import { KeyRound, ShieldCheck, Users } from "lucide-react";
import AdminTab from "./common/AdminTab";

const AdminTabs = ({ activeTab, setActiveTab, canViewUsers, canViewRoles, canViewPermissions, usersCount, rolesCount, permissionsCount }) => (
        <div className="mb-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex overflow-x-auto">
            {canViewUsers && (
              <AdminTab
                active={activeTab === "users"}
                onClick={() => setActiveTab("users")}
                icon={<Users className="h-4 w-4" />}
                label="Users"
                count={usersCount}
                accent="emerald"
              />
            )}
            {canViewRoles && (
              <AdminTab
                active={activeTab === "roles"}
                onClick={() => setActiveTab("roles")}
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Roles"
                count={rolesCount}
                accent="indigo"
              />
            )}
            {canViewPermissions && (
              <AdminTab
                active={activeTab === "permissions"}
                onClick={() => setActiveTab("permissions")}
                icon={<KeyRound className="h-4 w-4" />}
                label="Permissions"
                count={permissionsCount}
                accent="violet"
              />
            )}
          </div>
        </div>
);

export default AdminTabs;
