import { useEffect, useRef } from "react";
import { AlertCircle, RefreshCw, Trash2, X } from "lucide-react";

function DeleteConfirmModal({ ticket, loading, error, onCancel, onConfirm }) {
  const confirmButtonRef = useRef(null);

  /* =========================================================
     MODAL SETUP
  ========================================================= */

  useEffect(() => {
    // Focus delete button when modal opens
    confirmButtonRef.current?.focus();

    // Prevent background page scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* =========================================================
     BACKDROP CLICK
  ========================================================= */

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  /* =========================================================
     KEYBOARD
  ========================================================= */

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && !loading) {
      onCancel();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-slate-950/45
        px-4
        py-6
        backdrop-blur-[2px]
      "
    >
      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-ticket-title"
        className="
          relative
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.10]
          bg-slate-900
          shadow-[0_25px_80px_-20px_rgba(0,0,0,0.75)]
          animate-[popIn_180ms_ease-out]
        "
      >
        {/* ===================================================
            TOP RED ACCENT
        =================================================== */}

        <div
          className="
            h-1
            w-full
            bg-gradient-to-r
            from-red-500
            via-rose-500
            to-red-500
          "
        />

        {/* ===================================================
            BACKGROUND GLOW
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-52
            w-52
            rounded-full
            bg-red-500/10
            blur-[70px]
          "
        />

        {/* ===================================================
            CLOSE BUTTON
        =================================================== */}

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close delete confirmation"
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition-all
            duration-200
            hover:bg-white/[0.06]
            hover:text-white
            disabled:pointer-events-none
            disabled:opacity-40
          "
        >
          <X className="h-4 w-4" />
        </button>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="relative px-5 py-6 sm:px-6 sm:py-7">
          {/* =================================================
              DELETE ICON
          ================================================= */}

          <div className="flex justify-center">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-500/10
                ring-1
                ring-red-400/20
              "
            >
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            id="delete-ticket-title"
            className="
              mt-4
              text-center
              text-lg
              font-bold
              tracking-tight
              text-white
            "
          >
            Delete this ticket?
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-2
              max-w-[340px]
              text-center
              text-sm
              leading-5
              text-slate-400
            "
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {ticket?.ticketId}
            </span>
            ?
          </p>

          {/* =================================================
              SOFT DELETE INFORMATION
          ================================================= */}

          <div
            className="
              mt-4
              flex
              items-start
              gap-2.5
              rounded-xl
              border
              border-amber-400/20
              bg-amber-400/[0.06]
              px-3
              py-2.5
            "
          >
            <AlertCircle
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                text-amber-400
              "
            />

            <span
              className="
                text-xs
                font-medium
                leading-5
                text-amber-200
              "
            >
              This ticket will be moved to the deleted state and removed from
              the active ticket list.
            </span>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                mt-3
                flex
                items-start
                gap-2.5
                rounded-xl
                border
                border-red-500/25
                bg-red-500/[0.08]
                px-3
                py-2.5
              "
            >
              <AlertCircle
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-red-400
                "
              />

              <p
                className="
                  text-xs
                  leading-5
                  text-red-200
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              mt-5
              flex
              flex-col-reverse
              gap-2.5
              sm:flex-row
              sm:justify-end
            "
          >
            {/* CANCEL */}
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
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
              ref={confirmButtonRef}
              type="button"
              onClick={onConfirm}
              disabled={loading}
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
                focus:outline-none
                focus:ring-4
                focus:ring-red-500/20
                disabled:cursor-not-allowed
                disabled:translate-y-0
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <RefreshCw
                    className="
                      h-4
                      w-4
                      animate-spin
                    "
                  />
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
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
