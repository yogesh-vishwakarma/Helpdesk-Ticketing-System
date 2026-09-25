import {
  AlertCircle,
  Loader2,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import Modal from "../common/Modal";

const DeleteModal = ({
  showDeleteModal,
  deleteType,
  deleteItem,
  deleting,
  setShowDeleteModal,
  setDeleteItem,
  handleDelete,
}) => {
  if (!showDeleteModal) return null;

  const isUser = deleteType === "user";

  const itemName =
    deleteItem?.name ||
    deleteItem?.roleName ||
    "this item";

  const itemType = isUser ? "user" : "role";

  const handleClose = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setDeleteItem(null);
  };

  return (
    <Modal
      title={`Delete ${isUser ? "User" : "Role"}`}
      subtitle={
        deleting
          ? "Please wait while we process your request..."
          : "This action requires confirmation."
      }
      icon={<Trash2 className="h-5 w-5" />}
      accent="red"
      onClose={handleClose}
    >
      {/* =====================================================
          MODAL CONTENT
      ===================================================== */}

      <div className="relative">
        {/* ===================================================
            DELETE ICON
        =================================================== */}

        <div className="flex justify-center">
          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
              ring-1
              ring-red-400/20
              transition-all
              duration-300
              ${
                deleting
                  ? "scale-105 animate-pulse"
                  : ""
              }
            `}
          >
            {deleting ? (
              <Loader2 className="h-7 w-7 animate-spin text-red-400" />
            ) : (
              <Trash2 className="h-7 w-7 text-red-400" />
            )}
          </div>
        </div>

        {/* ===================================================
            TITLE
        =================================================== */}

        <h3 className="mt-5 text-center text-xl font-bold tracking-tight text-white">
          {deleting
            ? `Deleting ${isUser ? "user" : "role"}...`
            : `Delete this ${isUser ? "user" : "role"}?`}
        </h3>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-400">
          {deleting ? (
            <>
              Removing{" "}
              <span className="font-semibold text-white">
                {itemName}
              </span>{" "}
              from the system.
            </>
          ) : (
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {itemName}
              </span>
              ?
            </>
          )}
        </p>

        {/* ===================================================
            ITEM INFO
        =================================================== */}

        {!deleting && (
          <div className="mx-auto mt-4 flex max-w-sm items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800/80 text-slate-400 ring-1 ring-white/[0.06]">
              {isUser ? (
                <UserRound className="h-4 w-4" />
              ) : (
                <UsersRound className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {isUser ? "User" : "Role"}
              </p>

              <p
                className="truncate text-xs font-semibold text-slate-200"
                title={itemName}
              >
                {itemName}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            WARNING
        =================================================== */}

        {!deleting && (
          <div className="mx-auto mt-4 flex max-w-sm items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

            <span className="text-xs font-medium leading-5 text-amber-200">
              This action is permanent and cannot be undone.
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        {/* CANCEL */}

        <button
          type="button"
          onClick={handleClose}
          disabled={deleting}
          className="
            h-10
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            px-5
            text-sm
            font-semibold
            text-slate-300
            transition-all
            duration-200
            hover:bg-white/[0.07]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        {/* DELETE */}

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-red-500
            to-rose-600
            px-5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-red-500/20
            ring-1
            ring-red-400/30
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-red-400
            hover:to-rose-500
            hover:shadow-red-500/30
            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
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
