import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Save,
  Ticket,
  FileText,
  Tag,
  Flag,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

import axios from "../../services/axios";
import Toast from "../../Components/TicketDetails/Toast";
import usePermission from "../../hooks/usePermission";

const EditTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  /* ================= PERMISSIONS ================= */
  const canUpdate = hasPermission("TICKET_UPDATE");

  /* ================= FORM DATA ================= */
  const [formData, setFormData] = useState({
    ticketId: "",
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });

  /* ================= STATES ================= */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState(null);

  /* ================= OPTIONS ================= */
  const categories = [
    "Technical",
    "Account",
    "Billing",
    "Dashboard",
    "General",
  ];
  const priorities = ["Low", "Medium", "High", "Critical"];

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/tickets/${ticketId}`);
      const ticket = response.data?.data || response.data?.ticket;

      setFormData({
        ticketId: ticket?.ticketId || "",
        title: ticket?.title || "",
        description: ticket?.description || "",
        category: ticket?.category || "",
        priority: ticket?.priority || "Medium",
      });
    } catch (error) {
      console.error("FETCH TICKET ERROR:", error);
      setError(error.response?.data?.message || "Unable to fetch ticket.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      setSaving(true);
      const data = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        priority: formData.priority,
      };
      const response = await axios.patch(`/tickets/${ticketId}`, data);
      console.log("UPDATE TICKET RESPONSE:", response.data);
      setToast({
        id: Date.now(),
        type: "success",
        title: "Ticket updated",
        message: response.data.message,
      });
      setTimeout(() => {
        navigate(`/welcome/tickets/${ticketId}`);
      }, 1800);
    } catch (error) {
      console.error("UPDATE TICKET ERROR:", error);
      setToast({
        id: Date.now(),
        type: "error",
        title: "Unable to update",
        message: error.response?.data?.message || "Unable to update ticket.",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ================= ACCESS DENIED ================= */
  if (!canUpdate) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
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
              You do not have permission to edit this ticket.
            </p>
            <button
              type="button"
              onClick={() => navigate(`/tickets/${ticketId}`)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              <ArrowLeft size={17} />
              Back to Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
              <Ticket size={28} className="text-emerald-400" />
            </div>
            <span className="absolute -right-1 -top-1 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-slate-950 bg-emerald-500" />
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400">Loading ticket...</p>
        </div>
      </div>
    );
  }

  /* ================= LOAD ERROR ================= */
  if (error && !formData.title) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="px-6 py-10 text-center sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 ring-1 ring-red-400/20">
              <AlertCircle size={32} className="text-red-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
              Unable to Load Ticket
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => navigate(`/tickets/${ticketId}`)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500"
            >
              <ArrowLeft size={17} />
              Back to Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <main className="relative mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                  <Sparkles size={11} />
                  Ticket Management
                </span>
                <span className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-400 ring-1 ring-white/[0.08]">
                  {formData.ticketId || "Ticket"}
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Edit Ticket
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Update the ticket information and save your changes.
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20">
              <CheckCircle2 size={17} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-emerald-200">
                Editing ticket information
              </p>
              <p className="mt-0.5 text-xs text-emerald-300/70">
                Make sure the information is accurate before saving.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FORM — 2 COLUMN ================= */}
        <form onSubmit={handleSubmit}>
          {/* items-stretch ensures both columns are the same height */}
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
            {/* ================= LEFT (8 cols) ================= */}
            <div className="flex flex-col gap-5 lg:col-span-8">
              {error && (
                <div className="flex items-start gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/20">
                    <AlertCircle size={18} className="text-red-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-red-200">
                      Unable to save changes
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-red-300/80">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* TICKET DETAILS CARD — flex-1 to fill the column height */}
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">
                        Ticket Details
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Update the information associated with this ticket
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
                      placeholder="Enter ticket title"
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

                  {/* DESCRIPTION — flex-1 to absorb extra vertical space */}
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Description <span className="text-red-400">*</span>
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the issue in detail..."
                      className={`w-full flex-1 resize-none rounded-xl border bg-slate-900/60 px-4 py-3.5 text-sm font-medium leading-6 text-white shadow-sm outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/15 focus:bg-slate-900 focus:ring-4 ${
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

                {/* =================================================
                    SAVE BUTTON — FOOTER OF CARD
                ================================================= */}
                <div className="border-t border-white/[0.06] bg-white/[0.02] px-5 py-4 sm:px-6">
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck size={13} className="text-emerald-400" />
                      <span>Changes will be securely saved.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/40 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
                    >
                      {saving ? (
                        <>
                          <span className="loading loading-spinner loading-sm" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={17} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT (4 cols) ================= */}
            <div className="flex flex-col gap-5 lg:col-span-4">
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

              {/* SUMMARY CARD — flex-1 to fill remaining column height */}
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
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
                </div>
              </div>

            </div>
          </div>
        </form>
      </main>

      {toast && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-[9999]">
          <Toast toast={toast} onDismiss={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

/* ================= PRIORITY INDICATOR ================= */
function PriorityIndicator({ priority }) {
  const colors = {
    Low: "bg-slate-400",
    Medium: "bg-blue-400",
    High: "bg-orange-400",
    Critical: "bg-red-400",
  };

  return (
    <span
      className={`pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_currentColor] ${
        colors[priority] || colors.Medium
      }`}
    />
  );
}

/* ================= SUMMARY ROW ================= */
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

export default EditTicket;
