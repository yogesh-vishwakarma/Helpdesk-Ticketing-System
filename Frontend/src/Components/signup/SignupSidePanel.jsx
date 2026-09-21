import {
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Ticket,
  Users,
  Zap,
} from "lucide-react";

import SignupFeature from "./SignupFeature";
import WorkflowStep from "./WorkflowStep";

function SignupSidePanel() {
  return (
    <section
      className="
        relative hidden min-h-0 min-w-0
        overflow-hidden bg-[#06141C]
        lg:flex lg:flex-col
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#082028] to-[#043A35]" />

      {/* GLOWS */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-400/25 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[110px]" />

      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-400/10 blur-[100px]" />

      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* CIRCLES */}
      <div className="pointer-events-none absolute -right-14 top-24 h-72 w-72 rounded-full border border-emerald-400/10" />

      <div className="pointer-events-none absolute right-10 top-36 h-52 w-52 rounded-full border border-cyan-400/10" />

      <div className="pointer-events-none absolute right-28 top-48 h-24 w-24 rounded-full bg-emerald-400/10" />

      {/* CONTENT */}
      <div
        className="
          relative z-10 flex h-full min-h-0 min-w-0
          flex-col justify-between p-8 xl:p-10
        "
      >
        {/* HEADER */}
        <div className="min-w-0">
          <div
            className="
              inline-flex items-center gap-2 rounded-full
              border border-emerald-400/25
              bg-emerald-400/10
              px-3 py-1.5 text-[10px] font-bold
              uppercase tracking-[0.2em]
              text-emerald-300 backdrop-blur-sm
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />

            Welcome to HelpDesk
          </div>

          <h2
            className="
              mt-6 max-w-[520px]
              text-[38px] font-black leading-[1.02]
              tracking-[-0.04em] text-white
              xl:text-[44px]
            "
          >
            Everything your

            <span
              className="
                block
                bg-gradient-to-r
                from-emerald-300
                via-teal-300
                to-cyan-300
                bg-clip-text
                text-transparent
              "
            >
              support team
            </span>

            needs to succeed.
          </h2>

          <p className="mt-4 max-w-[480px] text-[13px] leading-6 text-slate-400 xl:text-sm">
            Create your account and get a cleaner, smarter way to manage
            customer support — from ticket creation all the way to
            resolution.
          </p>
        </div>

        {/* FEATURES */}
        <div className="my-5 min-w-0 space-y-2.5">
          <SignupFeature
            icon={Ticket}
            title="Organized Tickets"
            text="Keep every customer request in one place."
            iconClass="bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20"
          />

          <SignupFeature
            icon={Users}
            title="Better Collaboration"
            text="Connect customers and support teams seamlessly."
            iconClass="bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20"
          />

          <SignupFeature
            icon={Zap}
            title="Faster Resolution"
            text="Track issues from creation through completion."
            iconClass="bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/20"
          />
        </div>

        {/* WORKFLOW CARD */}
        <div
          className="
            min-w-0 rounded-2xl border border-white/[0.08]
            bg-white/[0.04] p-4 shadow-2xl
            shadow-black/30 backdrop-blur-xl
          "
        >
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className="
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-xl
                  bg-emerald-400/10 text-emerald-300
                  ring-1 ring-emerald-400/20
                "
              >
                <Headphones size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  Support workflow
                </p>

                <p className="truncate text-[10px] text-slate-500">
                  Simple and organized
                </p>
              </div>
            </div>

            <div
              className="
                flex shrink-0 items-center gap-1.5
                rounded-full border border-emerald-400/20
                bg-emerald-400/10 px-2.5 py-1
                text-[9px] font-bold text-emerald-300
              "
            >
              <CheckCircle2 size={11} />
              Ready
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            <WorkflowStep number="01" text="Create" active />
            <WorkflowStep number="02" text="Assign" />
            <WorkflowStep number="03" text="Resolve" />
            <WorkflowStep number="04" text="Close" />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
          <p className="text-[9px] font-medium text-slate-500">
            Simple. Organized. Efficient.
          </p>

          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-500">
            <ShieldCheck size={11} />
            Secure platform
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupSidePanel;