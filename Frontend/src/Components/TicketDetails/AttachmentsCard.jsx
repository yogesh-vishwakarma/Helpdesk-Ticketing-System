import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileImage,
  Image as ImageIcon,
  Loader2,
  Paperclip,
  Trash2,
  Upload,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";

const AttachmentsCard = ({
  ticket,
  canDeleteAttachment,
  attachmentsRef,
  attachmentsCount,
  selectedFile,
  previewUrl,
  uploading,
  uploadProgress,
  uploadError,
  uploadSuccess,
  deletingAttachmentId,
  isDragging,
  fileInputRef,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
  resetUploadState,
  handleUpload,
  handleCancelUpload,
  handleDeleteAttachment,
}) => (
  <section
    ref={attachmentsRef}
    className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl"
  >
    <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

    <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20">
          <Paperclip className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">
            Attachments
          </h2>
          <p className="text-[10px] text-slate-500">
            Images & screenshots
          </p>
        </div>
      </div>

      {attachmentsCount > 0 && (
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
          {attachmentsCount}{" "}
          {attachmentsCount === 1 ? "file" : "files"}
        </span>
      )}
    </div>

    <div className="p-4">
      {!selectedFile && (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-all duration-200 ${
            isDragging
              ? "border-emerald-400/60 bg-emerald-400/10 scale-[1.01]"
              : "border-white/[0.12] bg-white/[0.02] hover:border-emerald-400/40 hover:bg-emerald-400/[0.04]"
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 transition-transform duration-200 ${
              isDragging ? "scale-110" : "group-hover:scale-105"
            }`}
          >
            <UploadCloud className="h-5 w-5" />
          </div>

          <p className="mt-2.5 text-xs font-bold text-white">
            {isDragging
              ? "Drop your image here"
              : "Drop or choose an image"}
          </p>

          <p className="mt-0.5 text-[10px] font-medium text-slate-500">
            JPG, PNG, WEBP or GIF • Maximum 5 MB
          </p>

          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all group-hover:-translate-y-0.5">
            <ImageIcon className="h-3 w-3" />
            Choose Image
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {selectedFile && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
          <div className="flex items-start gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FileImage className="h-5 w-5 text-slate-500" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    {selectedFile.name}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                    MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetUploadState}
                  disabled={uploading}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/15 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Remove"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {uploading && (
                <div className="mt-2.5">
                  <div className="mb-1 flex items-center justify-between text-[10px] font-bold">
                    <span className="text-emerald-300">
                      Uploading...
                    </span>
                    <span className="text-emerald-300">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-200 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadSuccess && !uploading && (
                <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2 py-1">
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-300" />
                  <p className="truncate text-[10px] font-semibold text-emerald-300">
                    {uploadSuccess}
                  </p>
                </div>
              )}

              <div className="mt-2.5 flex gap-1.5">
                {!uploading && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-3 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
                  >
                    <Upload className="h-3 w-3" />
                    Upload
                  </button>
                )}

                {uploading && (
                  <button
                    type="button"
                    onClick={handleCancelUpload}
                    className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-[11px] font-bold text-red-300 transition hover:bg-red-500/20"
                  >
                    <XCircle className="h-3 w-3" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-300 mt-0.5" />
          <p className="text-[10px] font-semibold text-red-200">
            {uploadError}
          </p>
        </div>
      )}

      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <div className="mb-2.5 flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Uploaded Images
          </h3>
        </div>

        {attachmentsCount > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {ticket.attachments.map((attachment, index) => {
              const isDeleting =
                deletingAttachmentId === attachment._id;

              return (
                <div
                  key={attachment._id || index}
                  className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all hover:border-emerald-400/30 hover:bg-white/[0.04]"
                >
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                      <img
                        src={attachment.url}
                        alt={
                          attachment.fileName ||
                          `Attachment ${index + 1}`
                        }
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        loading="lazy"
                      />

                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </a>

                  {canDeleteAttachment && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAttachment(attachment);
                      }}
                      disabled={isDeleting}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md bg-slate-950/80 text-slate-300 opacity-0 backdrop-blur-sm transition-all hover:bg-red-500/80 hover:text-white group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-100"
                      title="Delete"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  )}

                  <div className="border-t border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
                    <p className="truncate text-[9px] font-semibold text-slate-400">
                      {attachment.fileName ||
                        `Attachment ${index + 1}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] px-4 py-5 text-center">
            <Paperclip className="mx-auto h-4 w-4 text-slate-500" />
            <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
              No attachments yet
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default AttachmentsCard;
