import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Paperclip,
  Send,
  X,
  Ticket,
  FileText,
  Tag,
  Flag,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import api from "../../services/axios";
import usePermission from "../../hooks/usePermission";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  /* ========================================================
     PERMISSIONS
  ======================================================== */
  const canCreateTicket = hasPermission("TICKET_CREATE");
  const canAttach = hasPermission("TICKET_ATTACHMENT_CREATE");

  /* ========================================================
     FORM STATE
  ======================================================== */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });

  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /* ========================================================
     OPTIONS
  ======================================================== */
  const categories = [
    "Technical",
    "Account",
    "Billing",
    "Dashboard",
    "General",
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  /* ========================================================
     HANDLERS
  ======================================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  /* ========================================================
     VALIDATION
  ======================================================== */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ========================================================
     SUBMIT — DO NOT CHANGE
  ======================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        priority: formData.priority,
        attachments,
      };

      const response = await api.post("/tickets", data);
      console.log("CREATE TICKET RESPONSE:", response.data);
      navigate("/ticketlist");
    } catch (error) {
      console.error("CREATE TICKET ERROR:", error);
      setServerError(
        error.response?.data?.message ||
          "Unable to create ticket. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ========================================================
     ACCESS DENIED
  ======================================================== */
  if (!canCreateTicket) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
        {/* Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-slate-500/10 blur-[120px]" />
        </div>

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

          <div className="px-6 py-10 text-center sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <ShieldCheck size={32} className="text-red-400" />
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Access Denied
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              You do not have permission to create a ticket.
            </p>

            <button
              type="button"
              onClick={() => navigate("/ticketlist")}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              Back to Tickets
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================
     RENDER
  ======================================================== */
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <main className="relative mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* =================================================
            PAGE HEADER
        ================================================= */}
        <div className="mb-5">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* TITLE */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                  <Sparkles size={11} />
                  Support Center
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Create Ticket
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Submit a new support request and provide the details below.
              </p>
            </div>
          </div>

          {/* INFO BAR */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/20 text-emerald-300">
              <CheckCircle2 size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-emerald-200">
                Ticket information
              </p>
              <p className="mt-0.5 text-xs text-emerald-300/70">
                Add a clear title, detailed description, category and priority.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN GRID — 2 columns on large screens
        ================================================= */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* =============================================
                LEFT — MAIN FORM (8 cols)
            ============================================= */}
            <div className="space-y-5 lg:col-span-8">
              {/* SERVER ERROR */}
              {serverError && (
                <div className="flex items-start gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/20">
                    <AlertCircle size={18} className="text-red-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-red-200">
                      Something went wrong
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-red-300/80">
                      {serverError}
                    </p>
                  </div>
                </div>
              )}

              {/* BASIC INFORMATION CARD */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                <div className="p-5 sm:p-6">
                  {/* Section header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                      <FileText size={18} />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-white">
                        Ticket Details
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Tell us what you need help with
                      </p>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Ticket Title <span className="text-red-400">*</span>
                    </label>

                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Unable to access my dashboard"
                      className={`h-12 w-full rounded-xl border bg-slate-900/60 px-4 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:bg-slate-900 focus:ring-4 ${
                        errors.title
                          ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/20"
                          : "border-white/[0.08] focus:border-emerald-400 focus:ring-emerald-500/20"
                      }`}
                    />

                    {errors.title && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <X size={13} />
                        {errors.title}
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Description <span className="text-red-400">*</span>
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows="6"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your issue in detail. Include relevant information that can help us understand and resolve the problem..."
                      className={`w-full resize-none rounded-xl border bg-slate-900/60 px-4 py-3.5 text-sm font-medium leading-6 text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:bg-slate-900 focus:ring-4 ${
                        errors.description
                          ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/20"
                          : "border-white/[0.08] focus:border-emerald-400 focus:ring-emerald-500/20"
                      }`}
                    />

                    {errors.description && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <X size={13} />
                        {errors.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ATTACHMENTS CARD */}
              {canAttach && (
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
                  <div className="p-5 sm:p-6">
                    {/* Section header */}
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                        <Paperclip size={18} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-white">
                          Attachments
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Add files that may help explain the issue
                        </p>
                      </div>
                    </div>

                    {/* Upload area */}
                    <label className="group flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/[0.12] bg-slate-900/40 px-5 py-6 text-center transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/[0.04]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 transition-transform duration-200 group-hover:scale-105">
                        <Upload size={20} />
                      </div>

                      <p className="mt-3 text-sm font-bold text-white">
                        Choose files to attach
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Click here to browse files from your device
                      </p>

                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* Attachment list */}
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-3 shadow-sm backdrop-blur-sm transition hover:border-emerald-400/25 hover:bg-white/[0.04]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                              <Paperclip size={17} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-200">
                                {file.name}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/15 hover:text-red-300"
                              title="Remove attachment"
                            >
                              <X size={17} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =============================================
                RIGHT — METADATA SIDEBAR (4 cols)
            ============================================= */}
            <div className="space-y-5 lg:col-span-4">
              {/* CATEGORY + PRIORITY */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

                <div className="space-y-5 p-5">
                  {/* CATEGORY */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      <Tag size={14} className="text-slate-500" />
                      Category <span className="text-red-400">*</span>
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`h-12 w-full rounded-xl border bg-slate-900/60 px-4 text-sm font-medium text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:bg-slate-900 focus:ring-4 ${
                        errors.category
                          ? "border-red-400/50 focus:border-red-400 focus:ring-red-500/20"
                          : "border-white/[0.08] focus:border-emerald-400 focus:ring-emerald-500/20"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    {errors.category && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <X size={13} />
                        {errors.category}
                      </div>
                    )}
                  </div>

                  {/* PRIORITY */}
                  <div>
                    <label
                      htmlFor="priority"
                      className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      <Flag size={14} className="text-slate-500" />
                      Priority
                    </label>

                    <div className="relative">
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="h-12 w-full appearance-none rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 pr-12 text-sm font-semibold text-white shadow-sm outline-none transition-all duration-200 hover:border-white/15 focus:border-emerald-400 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20"
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>

                      <PriorityIndicator priority={formData.priority} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SUMMARY CARD */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">Summary</h2>
                    <p className="text-xs text-slate-500">Quick review</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <SummaryRow
                    label="Title"
                    value={formData.title || "—"}
                    filled={!!formData.title.trim()}
                  />
                  <SummaryRow
                    label="Category"
                    value={formData.category || "Not selected"}
                    filled={!!formData.category}
                  />
                  <SummaryRow
                    label="Priority"
                    value={formData.priority}
                    filled
                  />
                  <SummaryRow
                    label="Attachments"
                    value={`${attachments.length} file${
                      attachments.length === 1 ? "" : "s"
                    }`}
                    filled={attachments.length > 0}
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Create Ticket
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/ticketlist")}
                    disabled={loading}
                    className="flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-bold text-slate-300 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-4 text-xs text-slate-500">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>Your ticket will be securely submitted.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

/* =========================================================
   PRIORITY INDICATOR
========================================================= */
function PriorityIndicator({ priority }) {
  const styles = {
    Low: "bg-slate-400",
    Medium: "bg-blue-400",
    High: "bg-orange-400",
    Critical: "bg-red-400",
  };

  return (
    <span
      className={`pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_currentColor] ${
        styles[priority] || styles.Medium
      }`}
    />
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */
function SummaryRow({ label, value, filled = false }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span
        className={`truncate text-xs font-semibold ${
          filled ? "text-slate-200" : "text-slate-500"
        }`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   FILE SIZE
========================================================= */
function formatFileSize(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default CreateTicket;
