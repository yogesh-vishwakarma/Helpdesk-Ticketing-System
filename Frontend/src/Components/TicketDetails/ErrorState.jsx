import { AlertCircle } from "lucide-react";

const ErrorState = ({ error, navigate }) => (
<div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
  <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
    <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
    <div className="px-6 py-12 text-center sm:px-8">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      <h1 className="mt-7 text-2xl font-bold tracking-tight text-white">
        Unable to Load Ticket
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {error || "Ticket not found."}
      </p>
      <button
        onClick={() => navigate("/tickets")}
        className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
      >
        Back to Tickets
      </button>
    </div>
  </div>
</div>
);

export default ErrorState;
