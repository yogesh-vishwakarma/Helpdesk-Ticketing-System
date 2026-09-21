import { AlertCircle } from "lucide-react";

const AdminAccessDenied = ({ onBack }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-slate-500/10 blur-[120px]" />
    </div>
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
      <div className="p-8 text-center sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
          <AlertCircle className="h-9 w-9 text-red-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">Access Denied</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">You do not have permission to access the administration section.</p>
        <button type="button" onClick={onBack} className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500">Back to Dashboard</button>
      </div>
    </div>
  </div>
);

export default AdminAccessDenied;
