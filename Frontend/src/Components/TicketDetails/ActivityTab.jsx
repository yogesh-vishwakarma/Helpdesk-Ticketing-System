import { Clock } from "lucide-react";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const formatRelativeTime = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ActivityTab = ({
  activities,
  paginatedActivities,
  totalActivityPages,
  activityPage,
  setActivityPage,
}) => (
  <div className="flex flex-1 flex-col">
    {activities.length === 0 ? (
      <div className="flex flex-1">
        <EmptyState
          icon={<Clock className="h-6 w-6" />}
          title="No activity yet"
          text="There is no activity history available."
          fullHeight
        />
      </div>
    ) : (
      <>
        <div className="relative space-y-3">
          <div className="absolute bottom-3 left-[19px] top-3 w-px bg-gradient-to-b from-emerald-400/40 via-white/[0.06] to-transparent" />

          {paginatedActivities.map((activity) => {
            const actor =
              activity.performedBy ||
              activity.user ||
              activity.actor ||
              activity.createdBy ||
              activity.author ||
              null;

            const actorName =
              actor?.name ||
              activity.userName ||
              activity.actorName ||
              "System";

            const actorEmail =
              actor?.email ||
              activity.userEmail ||
              activity.actorEmail ||
              "";

            const initial = actorName.charAt(0).toUpperCase();

            const details =
              activity.details ||
              activity.description ||
              activity.message ||
              activity.note ||
              "";

            const action =
              activity.action ||
              activity.type ||
              activity.event ||
              "Activity";

            const timestamp =
              activity.createdAt ||
              activity.timestamp ||
              activity.date ||
              null;

            const actionKey = String(action).toLowerCase();

            const getActionMeta = () => {
              if (actionKey.includes("creat")) {
                return {
                  border: "border-emerald-400/25",
                  bg: "bg-emerald-400/[0.04]",
                  iconBg:
                    "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
                  dot: "from-emerald-500 to-teal-600",
                  badge:
                    "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
                };
              }

              if (actionKey.includes("assign")) {
                return {
                  border: "border-indigo-400/25",
                  bg: "bg-indigo-400/[0.04]",
                  iconBg:
                    "bg-indigo-400/15 text-indigo-300 ring-indigo-400/20",
                  dot: "from-indigo-500 to-violet-600",
                  badge:
                    "bg-indigo-400/10 text-indigo-300 border-indigo-400/25",
                };
              }

              if (
                actionKey.includes("status") ||
                actionKey.includes("update")
              ) {
                return {
                  border: "border-blue-400/25",
                  bg: "bg-blue-400/[0.04]",
                  iconBg:
                    "bg-blue-400/15 text-blue-300 ring-blue-400/20",
                  dot: "from-blue-500 to-indigo-600",
                  badge:
                    "bg-blue-400/10 text-blue-300 border-blue-400/25",
                };
              }

              if (
                actionKey.includes("priorit") ||
                actionKey.includes("critical") ||
                actionKey.includes("escalat")
              ) {
                return {
                  border: "border-orange-400/25",
                  bg: "bg-orange-400/[0.04]",
                  iconBg:
                    "bg-orange-400/15 text-orange-300 ring-orange-400/20",
                  dot: "from-orange-500 to-red-500",
                  badge:
                    "bg-orange-400/10 text-orange-300 border-orange-400/25",
                };
              }

              if (
                actionKey.includes("comment") ||
                actionKey.includes("note")
              ) {
                return {
                  border: "border-amber-400/25",
                  bg: "bg-amber-400/[0.04]",
                  iconBg:
                    "bg-amber-400/15 text-amber-300 ring-amber-400/20",
                  dot: "from-amber-500 to-orange-500",
                  badge:
                    "bg-amber-400/10 text-amber-300 border-amber-400/25",
                };
              }

              if (
                actionKey.includes("resolve") ||
                actionKey.includes("close")
              ) {
                return {
                  border: "border-emerald-400/25",
                  bg: "bg-emerald-400/[0.04]",
                  iconBg:
                    "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
                  dot: "from-emerald-500 to-teal-600",
                  badge:
                    "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
                };
              }

              if (
                actionKey.includes("attach") ||
                actionKey.includes("file")
              ) {
                return {
                  border: "border-cyan-400/25",
                  bg: "bg-cyan-400/[0.04]",
                  iconBg:
                    "bg-cyan-400/15 text-cyan-300 ring-cyan-400/20",
                  dot: "from-cyan-500 to-blue-600",
                  badge:
                    "bg-cyan-400/10 text-cyan-300 border-cyan-400/25",
                };
              }

              return {
                border: "border-white/[0.08]",
                bg: "bg-white/[0.02]",
                iconBg:
                  "bg-white/[0.06] text-slate-300 ring-white/[0.08]",
                dot: "from-slate-500 to-slate-600",
                badge:
                  "bg-white/[0.04] text-slate-400 border-white/[0.08]",
              };
            };

            const meta = getActionMeta();

            const displayAction = String(action).replace(
              /_/g,
              " ",
            );

            return (
              <div
                key={activity._id}
                className="relative flex gap-4"
              >
                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-slate-950 bg-gradient-to-br ${meta.dot} shadow-sm ring-1 ring-white/[0.08]`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <div
                  className={`min-w-0 flex-1 rounded-2xl border ${meta.border} ${meta.bg} p-4 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-400/30`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ring-1 ${meta.iconBg}`}
                      >
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-white">
                            {actorName}
                          </p>

                          {actorEmail && (
                            <p className="truncate text-[10px] text-slate-500">
                              {actorEmail}
                            </p>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}
                          >
                            {displayAction}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-medium text-slate-500">
                      {timestamp ? formatRelativeTime(timestamp) : ""}
                    </span>
                  </div>

                  {details && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {totalActivityPages > 1 && (
          <Pagination
            page={activityPage}
            totalPages={totalActivityPages}
            onPrevious={() =>
              setActivityPage((p) => Math.max(p - 1, 1))
            }
            onNext={() =>
              setActivityPage((p) =>
                Math.min(p + 1, totalActivityPages),
              )
            }
          />
        )}
      </>
    )}
  </div>
);

export default ActivityTab;

