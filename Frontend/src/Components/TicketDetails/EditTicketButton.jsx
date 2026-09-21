import { ArrowRight, Pencil } from "lucide-react";

const EditTicketButton = ({ ticket, navigate }) => (
  <button
    type="button"
    onClick={() => navigate(`/tickets/${ticket._id}/edit`)}
    className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-300 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
  >
    <Pencil size={15} />
    Edit Ticket
    <ArrowRight
      size={15}
      className="transition-transform group-hover:translate-x-1"
    />
  </button>
);

export default EditTicketButton;
