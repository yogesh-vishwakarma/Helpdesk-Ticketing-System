import { AlertCircle, User } from "lucide-react";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const InternalNotesTab = ({
  internalNotes,
  paginatedInternalNotes,
  totalInternalNotePages,
  internalNotePage,
  setInternalNotePage,
  canCreateInternalNote,
  internalNote,
  setInternalNote,
  submittingInternalNote,
  handleAddInternalNote,
}) => (
  <div className="flex flex-1 flex-col">
    <div className="mb-3 flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-2">
      <AlertCircle className="h-4 w-4 text-amber-300" />
      <p className="text-xs font-semibold text-amber-300">
        Visible only to authorized staff members.
      </p>
    </div>

    {internalNotes.length === 0 ? (
      <div className="flex flex-1">
        <EmptyState
          icon={<AlertCircle className="h-6 w-6" />}
          title="No internal notes"
          text="There are currently no internal notes for this ticket."
          amber
          fullHeight
        />
      </div>
    ) : (
      <>
        <div className="space-y-3">
          {paginatedInternalNotes.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-3.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {item.author?.name || "User"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {item.createdAt
                      ? new Date(
                          item.createdAt,
                        ).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {item.message || item.content || ""}
              </p>
            </div>
          ))}
        </div>

        {totalInternalNotePages > 1 && (
          <Pagination
            page={internalNotePage}
            totalPages={totalInternalNotePages}
            onPrevious={() =>
              setInternalNotePage((p) => Math.max(p - 1, 1))
            }
            onNext={() =>
              setInternalNotePage((p) =>
                Math.min(p + 1, totalInternalNotePages),
              )
            }
            amber
          />
        )}
      </>
    )}

    {canCreateInternalNote && (
      <form
        onSubmit={handleAddInternalNote}
        className="mt-4 border-t border-amber-400/20 pt-4"
      >
        <div className="mb-2.5 flex items-center justify-between">
          <label className="text-sm font-bold text-white">
            Add Internal Note
          </label>
          <span className="text-[11px] text-slate-500">
            Staff only
          </span>
        </div>

        <textarea
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          rows="3"
          placeholder="Write an internal note..."
          className="w-full resize-none rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] px-4 py-3 text-sm text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-amber-400 focus:bg-slate-900 focus:ring-4 focus:ring-amber-500/20"
        />

        <div className="mt-2.5 flex justify-end">
          <button
            type="submit"
            disabled={
              submittingInternalNote || !internalNote.trim()
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          >
            {submittingInternalNote
              ? "Adding..."
              : "Add Internal Note"}
          </button>
        </div>
      </form>
    )}
  </div>
);

export default InternalNotesTab;
