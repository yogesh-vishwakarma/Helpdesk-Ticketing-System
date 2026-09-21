import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import Modal from "../common/Modal";

const DeleteModal = ({ showDeleteModal, deleteType, deleteItem, deleting, setShowDeleteModal, setDeleteItem, handleDelete }) => {
  if (!showDeleteModal) return null;
  return (
        <Modal
          title={`Delete ${deleteType === "user" ? "User" : "Role"}`}
          subtitle={
            deleting
              ? "Please wait while we process your request..."
              : "This action requires confirmation."
          }
          icon={<Trash2 className="h-5 w-5" />}
          accent="red"
          onClose={() => {
            if (deleting) return;
            setShowDeleteModal(false);
            setDeleteItem(null);
          }}
        >
          <div className="text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-400/20 transition-all duration-300 ${
                deleting ? "animate-pulse scale-110" : ""
              }`}
            >
              {deleting ? (
                <Loader2 className="h-7 w-7 animate-spin text-red-400" />
              ) : (
                <Trash2 className="h-7 w-7 text-red-400" />
              )}
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              {deleting ? "Deleting..." : "Are you sure?"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              {deleting ? (
                <>
                  Removing{" "}
                  <span className="font-bold text-white">
                    {deleteItem?.name || deleteItem?.roleName}
                  </span>{" "}
                  from the system.
                </>
              ) : (
                <>
                  You are about to delete{" "}
                  <span className="font-bold text-white">
                    {deleteItem?.name || deleteItem?.roleName}
                  </span>
                  . This action cannot be undone.
                </>
              )}
            </p>

            {!deleting && (
              <div className="mx-auto mt-4 flex max-w-sm items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-300" />
                <span className="text-[11px] font-semibold text-red-200">
                  This action is permanent
                </span>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteItem(null);
              }}
              disabled={deleting}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 ring-1 ring-red-400/40 transition hover:-translate-y-0.5 hover:from-red-400 hover:to-rose-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </Modal>
  );
};

export default DeleteModal;
