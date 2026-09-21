import { Check, Loader2 } from "lucide-react";

const ModalButtons = ({
  onCancel,
  submitText,
  submitting = false,
  submittingText = "Saving...",
}) => {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={submitting}
        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {submittingText}
          </>
        ) : (
          <>
            <Check className="h-4 w-4" />
            {submitText}
          </>
        )}
      </button>
    </div>
  );
};


export default ModalButtons;