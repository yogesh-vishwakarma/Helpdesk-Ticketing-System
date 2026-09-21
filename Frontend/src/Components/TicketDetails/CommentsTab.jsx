import { MessageSquare, Send } from "lucide-react";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const CommentsTab = ({
  comments,
  paginatedComments,
  totalCommentPages,
  commentPage,
  setCommentPage,
  canCreateComment,
  comment,
  setComment,
  submittingComment,
  handleAddComment,
}) => (
  <div className="flex flex-1 flex-col">
    {comments.length === 0 ? (
      <div className="flex flex-1">
        <EmptyState
          icon={<MessageSquare className="h-6 w-6" />}
          title="No comments yet"
          text="There are currently no comments for this ticket."
          fullHeight
        />
      </div>
    ) : (
      <>
        <div className="space-y-3">
          {paginatedComments.map((item, index) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 shadow-sm transition-all duration-200 hover:border-emerald-400/20 hover:bg-white/[0.04]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shadow-sm ring-1 ring-emerald-400/30">
                    {item.author?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {item.author?.name || "User"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  #{paginatedComments.length - index}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {item.message ||
                  item.content ||
                  item.comment ||
                  ""}
              </p>
            </div>
          ))}
        </div>

        {totalCommentPages > 1 && (
          <Pagination
            page={commentPage}
            totalPages={totalCommentPages}
            onPrevious={() =>
              setCommentPage((p) => Math.max(p - 1, 1))
            }
            onNext={() =>
              setCommentPage((p) =>
                Math.min(p + 1, totalCommentPages),
              )
            }
          />
        )}
      </>
    )}

    {canCreateComment && (
      <form
        onSubmit={handleAddComment}
        className="mt-4 border-t border-white/[0.06] pt-4"
      >
        <div className="mb-2.5 flex items-center justify-between">
          <label className="text-sm font-bold text-white">
            Add Comment
          </label>

          <span className="text-[11px] text-slate-500">
            Share an update
          </span>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          placeholder="Write your comment..."
          className="w-full resize-none rounded-2xl border border-white/[0.08] bg-slate-900/60 px-4 py-3 text-sm text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
        />

        <div className="mt-2.5 flex justify-end">
          <button
            type="submit"
            disabled={submittingComment || !comment.trim()}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
          >
            <Send size={15} />
            {submittingComment
              ? "Adding..."
              : "Add Comment"}
          </button>
        </div>
      </form>
    )}
  </div>
);

export default CommentsTab;

