import {
  Clock3,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Ticket,
  Zap,
} from "lucide-react";

import SectionHeading from "./SectionHeading";

function FeaturesSection() {
  const features = [
    {
      icon: Ticket,
      title: "Smart Ticket Management",
      text: "Create, assign, update, track, and resolve support requests from one organized workspace.",
      accent: "emerald",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access",
      text: "Give customers, executives, managers, and administrators access according to their responsibilities.",
      accent: "cyan",
    },
    {
      icon: Zap,
      title: "Priority & Status",
      text: "Keep important issues visible with clear priorities and a structured ticket lifecycle.",
      accent: "violet",
    },
    {
      icon: MessageSquare,
      title: "Comments & Notes",
      text: "Communicate with customers while keeping internal support discussions private.",
      accent: "amber",
    },
    {
      icon: LayoutDashboard,
      title: "Support Dashboard",
      text: "Understand ticket volume, workload, status distribution, and support activity at a glance.",
      accent: "blue",
    },
    {
      icon: Clock3,
      title: "Activity History",
      text: "Follow important ticket actions and changes throughout the complete support journey.",
      accent: "rose",
    },
  ];

  const accentMap = {
    emerald: {
      bg: "bg-emerald-400/10",
      text: "text-emerald-300",
      ring: "ring-emerald-400/20",
      hoverBg: "group-hover:bg-emerald-500",
    },
    cyan: {
      bg: "bg-cyan-400/10",
      text: "text-cyan-300",
      ring: "ring-cyan-400/20",
      hoverBg: "group-hover:bg-cyan-500",
    },
    violet: {
      bg: "bg-violet-400/10",
      text: "text-violet-300",
      ring: "ring-violet-400/20",
      hoverBg: "group-hover:bg-violet-500",
    },
    amber: {
      bg: "bg-amber-400/10",
      text: "text-amber-300",
      ring: "ring-amber-400/20",
      hoverBg: "group-hover:bg-amber-500",
    },
    blue: {
      bg: "bg-blue-400/10",
      text: "text-blue-300",
      ring: "ring-blue-400/20",
      hoverBg: "group-hover:bg-blue-500",
    },
    rose: {
      bg: "bg-rose-400/10",
      text: "text-rose-300",
      ring: "ring-rose-400/20",
      hoverBg: "group-hover:bg-rose-500",
    },
  };

  return (
    <section id="features" className="relative py-20 sm:py-20">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Powerful Features"
          title="Everything your support team needs"
          description="A clean, focused workspace for managing the complete support lifecycle — without unnecessary complexity."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            const accent = accentMap[feature.accent];

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.05]"
              >

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.text} ring-1 ${accent.ring} transition duration-300 ${accent.hoverBg} group-hover:text-white`}
                >
                  <FeatureIcon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.text}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;