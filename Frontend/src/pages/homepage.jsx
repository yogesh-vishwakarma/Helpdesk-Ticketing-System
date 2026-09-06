import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [activeRole, setActiveRole] = useState("Customer");

  const roles = {
    Customer: {
      title: "For Customers",
      description:
        "Create support tickets, track their progress, communicate with support executives, and stay updated until your issue is resolved.",
      points: [
        "Create support tickets",
        "Track ticket status",
        "Add comments",
        "View ticket activity",
      ],
    },
    "Support Executive": {
      title: "For Support Executives",
      description:
        "Manage assigned tickets, update priorities and statuses, communicate with customers, and add internal notes.",
      points: [
        "View assigned tickets",
        "Update ticket status",
        "Update priority",
        "Add internal notes",
      ],
    },
    Manager: {
      title: "For Managers",
      description:
        "Manage support operations by assigning tickets, monitoring ticket progress, and analyzing support performance.",
      points: [
        "View all tickets",
        "Assign support executives",
        "Manage ticket updates",
        "Monitor dashboard statistics",
      ],
    },
    Admin: {
      title: "For Administrators",
      description:
        "Manage users, roles, permissions, and the overall support system from one centralized platform.",
      points: [
        "Manage users",
        "Manage roles",
        "Manage permissions",
        "Monitor the support system",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white text-stone-900">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-sm">
              H
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                HelpDesk
              </h1>
              <p className="text-[11px] text-stone-500">
                Support Management
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-stone-600 transition hover:text-emerald-600"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-stone-600 transition hover:text-emerald-600"
            >
              How It Works
            </a>

            <a
              href="#roles"
              className="text-sm font-medium text-stone-600 transition hover:text-emerald-600"
            >
              Roles
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 sm:block"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Smart Support Management
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Support requests,
              <span className="block text-emerald-600">
                organized effortlessly.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              HelpDesk is a centralized ticketing platform that helps
              organizations create, assign, track, and resolve customer
              support requests efficiently.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-xl bg-emerald-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Create Your Account
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-center text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-500">
              <span>✓ Centralized tickets</span>
              <span>✓ Role-based access</span>
              <span>✓ Real-time collaboration</span>
            </div>
          </div>


          {/* DASHBOARD PREVIEW */}
          <div className="relative">
            <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-2xl shadow-stone-300/30">

              <div className="rounded-xl bg-stone-50 p-4">

                {/* Top */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <p className="text-xs text-stone-500">
                      Support Dashboard
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                      Overview
                    </h3>
                  </div>

                  <div className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    Live
                  </div>
                </div>


                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                  <div className="rounded-xl border border-stone-200 bg-white p-3">
                    <p className="text-xs text-stone-500">
                      Total
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      248
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-3">
                    <p className="text-xs text-stone-500">
                      Open
                    </p>
                    <p className="mt-1 text-xl font-bold text-orange-600">
                      42
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-3">
                    <p className="text-xs text-stone-500">
                      Progress
                    </p>
                    <p className="mt-1 text-xl font-bold text-blue-600">
                      31
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-3">
                    <p className="text-xs text-stone-500">
                      Resolved
                    </p>
                    <p className="mt-1 text-xl font-bold text-emerald-600">
                      175
                    </p>
                  </div>

                </div>


                {/* Ticket list */}
                <div className="mt-4 rounded-xl border border-stone-200 bg-white">

                  <div className="border-b border-stone-200 px-4 py-3">
                    <p className="text-sm font-semibold">
                      Recent Tickets
                    </p>
                  </div>

                  {[
                    ["Login issue", "Critical", "Open"],
                    ["Payment problem", "High", "In Progress"],
                    ["Account update", "Medium", "Resolved"],
                  ].map(([title, priority, status]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between border-b border-stone-100 px-4 py-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {title}
                        </p>

                        <p className="mt-1 text-xs text-stone-500">
                          Customer support request
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-semibold">
                          {priority}
                        </p>

                        <p className="mt-1 text-xs text-emerald-600">
                          {status}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-stone-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Ticket Resolved
                  </p>

                  <p className="text-xs text-stone-500">
                    Support team completed the request
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Powerful Features
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your support team needs
            </h2>

            <p className="mt-4 text-stone-600">
              Manage the complete support lifecycle from one organized
              platform.
            </p>
          </div>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: "🎫",
                title: "Ticket Management",
                text: "Create, view, update, assign, and track support tickets from one place.",
              },
              {
                icon: "👥",
                title: "Role-Based Access",
                text: "Give customers, agents, managers, and administrators the right level of access.",
              },
              {
                icon: "⚡",
                title: "Priority & Status",
                text: "Organize tickets using priorities and clear progress statuses.",
              },
              {
                icon: "💬",
                title: "Comments & Notes",
                text: "Communicate with customers and use private internal notes for your support team.",
              },
              {
                icon: "📊",
                title: "Support Dashboard",
                text: "Monitor ticket statistics and understand support workload at a glance.",
              },
              {
                icon: "📝",
                title: "Activity History",
                text: "Keep track of important actions and changes made throughout the ticket lifecycle.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-stone-200/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition group-hover:bg-emerald-100">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {feature.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Simple Workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From issue to resolution
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-stone-600">
              HelpDesk keeps every support request organized throughout
              its complete lifecycle.
            </p>
          </div>


          <div className="relative mt-14 grid gap-8 md:grid-cols-5">

            {[
              ["01", "Create", "Customer creates a support ticket."],
              ["02", "Assign", "Manager assigns the ticket to an agent."],
              ["03", "Work", "Agent investigates and works on the issue."],
              ["04", "Resolve", "Issue is resolved and customer is updated."],
              ["05", "Close", "Ticket is completed and closed."],
            ].map(([number, title, text]) => (
              <div key={number} className="relative text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20">
                  {number}
                </div>

                <h3 className="mt-5 font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {text}
                </p>

              </div>
            ))}

          </div>


          {/* Status lifecycle */}
          <div className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <p className="mb-5 text-center text-sm font-semibold text-stone-700">
              Ticket Lifecycle
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Open",
                "In Progress",
                "Waiting",
                "Resolved",
                "Closed",
              ].map((status, index) => (
                <div key={status} className="flex items-center gap-3">

                  <span className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700">
                    {status}
                  </span>

                  {index < 4 && (
                    <span className="hidden text-stone-400 sm:block">
                      →
                    </span>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ================= ROLES ================= */}
      <section id="roles" className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Built For Every Team
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              One platform, different responsibilities
            </h2>

            <p className="mt-4 text-stone-600">
              Each role gets the tools and access required to perform
              their responsibilities effectively.
            </p>
          </div>


          {/* Role tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Object.keys(roles).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  activeRole === role
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:text-emerald-600"
                }`}
              >
                {role}
              </button>
            ))}
          </div>


          {/* Active role */}
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-stone-200 bg-white p-7 shadow-sm sm:p-9">

            <div className="grid gap-8 md:grid-cols-2 md:items-center">

              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  {activeRole}
                </span>

                <h3 className="mt-4 text-2xl font-bold">
                  {roles[activeRole].title}
                </h3>

                <p className="mt-3 leading-7 text-stone-600">
                  {roles[activeRole].description}
                </p>
              </div>


              <div className="space-y-3">
                {roles[activeRole].points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-xl bg-stone-50 p-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-stone-700">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-700 px-6 py-16 text-center shadow-2xl shadow-emerald-900/10 sm:px-12">

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
            Get Started Today
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make support simple and organized.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
            Bring customers, support executives, managers, and
            administrators together in one support platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/signup"
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-emerald-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign In
            </Link>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>
            <p className="font-bold">
              HelpDesk
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Support Management Platform
            </p>
          </div>

          <div className="flex gap-5 text-sm text-stone-500">
            <a href="#features" className="hover:text-emerald-600">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-emerald-600">
              How It Works
            </a>

            <Link to="/login" className="hover:text-emerald-600">
              Login
            </Link>
          </div>

          <p className="text-xs text-stone-400">
            © 2026 HelpDesk. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Home;