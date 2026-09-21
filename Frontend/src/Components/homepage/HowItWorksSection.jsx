import {
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Headphones,
  Ticket,
  Users,
} from "lucide-react";

import SectionHeading from "./SectionHeading";

function HowItWorksSection() {
  const workflow = [
    {
      number: "01",
      icon: FileText,
      title: "Create",
      text: "A customer creates a support ticket.",
    },
    {
      number: "02",
      icon: Users,
      title: "Assign",
      text: "A manager assigns it to an executive.",
    },
    {
      number: "03",
      icon: Headphones,
      title: "Work",
      text: "The executive investigates and updates it.",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Resolve",
      text: "The issue is resolved and the customer is informed.",
    },
    {
      number: "05",
      icon: Check,
      title: "Close",
      text: "The completed ticket is closed cleanly.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-10">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Simple Workflow"
          title="From issue to resolution"
          description="Every ticket follows a clear, predictable journey — so nothing gets lost and everyone stays on the same page."
        />

        <div className="relative mt-8">

          <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent md:block" />

          <div className="grid gap-8 md:grid-cols-5">

            {workflow.map((item) => {
              const WorkflowIcon = item.icon;

              return (
                <div key={item.number} className="group relative text-center">

                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-slate-950 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40 transition duration-300 group-hover:scale-110">
                    <WorkflowIcon size={20} />
                  </div>

                  <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Step {item.number}
                  </span>

                  <h3 className="mt-1 text-base font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[190px] text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

        {/* Ticket Lifecycle */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-emerald-500/[0.03] p-6 shadow-xl shadow-black/30 sm:p-8">

          <div className="text-center">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <Ticket size={20} />
            </div>

            <h3 className="mt-3 text-lg font-bold text-white">
              Ticket Lifecycle
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              A clear progression keeps every request easy to understand.
            </p>

          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">

            {["Open", "In Progress", "Waiting", "Resolved", "Closed"].map(
              (status, index) => (
                <div
                  key={status}
                  className="flex items-center gap-2 sm:gap-3"
                >

                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2 text-xs font-bold text-emerald-300 sm:px-4 sm:text-sm">
                    {status}
                  </span>

                  {index < 4 && (
                    <ChevronRight
                      size={15}
                      className="hidden text-slate-600 sm:block"
                    />
                  )}

                </div>
              )
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;