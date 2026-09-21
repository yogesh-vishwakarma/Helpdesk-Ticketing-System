import { useState } from "react";
import {
  BarChart3,
  Check,
  Headphones,
  ShieldCheck,
  Users,
} from "lucide-react";

import SectionHeading from "./SectionHeading";

function RolesSection() {
  const [activeRole, setActiveRole] = useState("Customer");

  const roles = {
    Customer: {
      short: "Customer",
      tagline: "Raise and follow your requests",
      title: "Everything starts with a better support experience.",
      description:
        "Create support tickets, follow their progress, communicate with support executives, and stay informed until your issue is resolved.",
      points: [
        "Create and submit support tickets",
        "Track ticket status in real time",
        "Add comments and updates",
        "View the full ticket activity",
      ],
      icon: Users,
    },

    "Support Executive": {
      short: "Support Executive",
      tagline: "Resolve issues faster",
      title: "Resolve customer issues faster and with clarity.",
      description:
        "Manage assigned tickets, update priorities and statuses, communicate with customers, and keep internal notes organized — all in one workspace.",
      points: [
        "View tickets assigned to you",
        "Update status and priority",
        "Add internal notes for the team",
        "Communicate with the customer",
      ],
      icon: Headphones,
    },

    Manager: {
      short: "Manager",
      tagline: "Keep the operation under control",
      title: "Keep your entire support operation under control.",
      description:
        "Assign tickets, monitor progress, manage workloads, and use support statistics to keep the team moving efficiently.",
      points: [
        "View all tickets across the team",
        "Assign tickets to support executives",
        "Manage ticket updates and priorities",
        "Monitor dashboard statistics",
      ],
      icon: BarChart3,
    },

    Admin: {
      short: "Administrator",
      tagline: "Own the platform",
      title: "Control your support system from one place.",
      description:
        "Manage users, dynamic roles, permissions, and the overall support environment from a centralized platform built for scale.",
      points: [
        "Manage users and their access",
        "Create and manage roles",
        "Configure granular permissions",
        "Monitor the entire support system",
      ],
      icon: ShieldCheck,
    },
  };

  const activeRoleData = roles[activeRole];
  const ActiveRoleIcon = activeRoleData.icon;

  return (
    <section id="roles" className="relative py-20 sm:py-14">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Built For Every Team"
          title="One platform, different responsibilities"
          description="Every user gets exactly the tools and access they need — nothing more, nothing less."
        />

        {/* Role Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">

          {Object.keys(roles).map((role) => {
            const RoleIcon = roles[role].icon;
            const isActive = activeRole === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/40"
                    : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:bg-white/[0.06] hover:text-emerald-300"
                }`}
              >
                <RoleIcon size={16} />
                {role}
              </button>
            );
          })}

        </div>

        {/* Active Role */}
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40">

          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

          <div className="grid gap-8 p-7 sm:p-9 md:grid-cols-[0.9fr_1.1fr] md:p-10">

            {/* Role Introduction */}
            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <ActiveRoleIcon size={22} />
              </div>

              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {activeRoleData.short}
              </div>

              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                {activeRoleData.tagline}
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {activeRoleData.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                {activeRoleData.description}
              </p>

            </div>

            {/* Capabilities */}
            <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Key capabilities
              </p>

              <div className="mt-4 space-y-2.5">

                {activeRoleData.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 transition hover:border-emerald-400/25 hover:bg-emerald-400/[0.06]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check size={14} strokeWidth={3} />
                    </span>

                    <span className="text-sm font-semibold text-slate-200">
                      {point}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default RolesSection;
