import { useEffect, useRef } from "react";
import { AlertCircle, RefreshCw, Trash2 } from "lucide-react";

function DeleteConfirmModal({ ticket, loading, error, onCancel, onConfirm }) {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-[fadeIn_150ms_ease-out]"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl animate-[popIn_200ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-[80px]" />

        <div className="relative p-6 sm:p-7">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-400/20">
            <Trash2 className="h-7 w-7 text-red-400" />
          </div>

          <h3 className="mt-5 text-center text-xl font-bold tracking-tight text-white">
            Delete this ticket?
          </h3>

          <p className="mt-2 text-center text-sm leading-6 text-slate-400">
            You are about to permanently delete{" "}
            <span className="font-bold text-white">
              {ticket.title || ticket.ticketId}
            </span>
            . This action cannot be undone.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-300" />
            <span className="text-xs font-semibold text-red-200">
              This action is permanent
            </span>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300" />
              <p className="text-xs font-medium leading-5 text-red-200">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              ref={confirmButtonRef}
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 ring-1 ring-red-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-red-400 hover:to-rose-500 hover:shadow-xl hover:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-500/40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default DeleteConfirmModal;
