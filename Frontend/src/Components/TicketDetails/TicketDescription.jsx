import { Calendar, Clock, MessageSquare, Tag, UserRound } from "lucide-react";
import SectionHeader from "./SectionHeader";
import DetailItem from "./DetailItem";

const TicketDescription = ({ ticket }) => (
<section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
  <SectionHeader
    icon={<MessageSquare className="h-4 w-4" />}
    title="Description"
    subtitle="What this ticket is about"
    accent="emerald"
  />

  <div className="p-5">
    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
      {ticket.description || "No description provided."}
    </p>

    <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <DetailItem
        icon={<UserRound size={15} />}
        label="Customer"
        value={ticket.customer?.name || "—"}
        subValue={ticket.customer?.email}
      />

      <DetailItem
        icon={<Calendar size={15} />}
        label="Created"
        value={
          ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )
            : "—"
        }
        subValue={
          ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleTimeString(
                undefined,
                { hour: "2-digit", minute: "2-digit" },
              )
            : ""
        }
      />

      <DetailItem
        icon={<Clock size={15} />}
        label="Updated"
        value={
          ticket.updatedAt
            ? new Date(ticket.updatedAt).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )
            : "—"
        }
        subValue={
          ticket.updatedAt
            ? new Date(ticket.updatedAt).toLocaleTimeString(
                undefined,
                { hour: "2-digit", minute: "2-digit" },
              )
            : ""
        }
      />

      <DetailItem
        icon={<Tag size={15} />}
        label="Category"
        value={ticket.category || "—"}
      />
    </div>
  </div>
</section>
);

export default TicketDescription;
