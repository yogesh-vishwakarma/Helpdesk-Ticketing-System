import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CircleDot,
  Clock,
  Flag,
  MessageSquare,
  Paperclip,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  Ticket,
  Trash2,
  Upload,
  User,
  UserRound,
  X,
  XCircle,
  Zap,
  Image as ImageIcon,
  Loader2,
  FileImage,
  ExternalLink,
  UploadCloud,
} from "lucide-react";

import axios from "../../services/axios";
import usePermission from "../../hooks/usePermission";

import LoadingState from "../../Components/TicketDetails/LoadingState";
import ErrorState from "../../Components/TicketDetails/ErrorState";
import ErrorAlert from "../../Components/TicketDetails/ErrorAlert";
import TicketHero from "../../Components/TicketDetails/TicketHero";
import TicketDescription from "../../Components/TicketDetails/TicketDescription";
import TicketTabs from "../../Components/TicketDetails/TicketTabs";
import CommentsTab from "../../Components/TicketDetails/CommentsTab";
import InternalNotesTab from "../../Components/TicketDetails/InternalNotesTab";
import ActivityTab from "../../Components/TicketDetails/ActivityTab";
import AssignmentCard from "../../Components/TicketDetails/AssignmentCard";
import StatusPriorityCard from "../../Components/TicketDetails/StatusPriorityCard";
import AttachmentsCard from "../../Components/TicketDetails/AttachmentsCard";
import EditTicketButton from "../../Components/TicketDetails/EditTicketButton";
import Toast from "../../Components/TicketDetails/Toast";


const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  /* ================= PERMISSIONS ================= */
  const canViewAll = hasPermission("TICKET_VIEW_ALL");
  const canViewAssigned = hasPermission("TICKET_VIEW_ASSIGNED");
  const canViewOwn = hasPermission("TICKET_VIEW_OWN");

  const canCreateComment = hasPermission("COMMENT_CREATE");
  const canViewComments = hasPermission("COMMENT_VIEW");
  const canCreateInternalNote = hasPermission("INTERNAL_NOTE_CREATE");
  const canViewInternalNotes = hasPermission("INTERNAL_NOTE_VIEW");
  const canViewActivity = hasPermission("ACTIVITY_VIEW");
  const canUpdateStatus = hasPermission("TICKET_UPDATE_STATUS");
  const canUpdatePriority = hasPermission("TICKET_UPDATE_PRIORITY");
  const canAssign = hasPermission("TICKET_ASSIGN");
  const canUpdate = hasPermission("TICKET_UPDATE");
  const canCreateAttachment = hasPermission("TICKET_ATTACHMENT_CREATE");
  const canDeleteAttachment = hasPermission("TICKET_ATTACHMENT_DELETE");

  /* ================= STATE ================= */
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);
  const [activities, setActivities] = useState([]);

  const [comment, setComment] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingInternalNote, setSubmittingInternalNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPriority, setUpdatingPriority] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("comments");

  const [commentPage, setCommentPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [internalNotePage, setInternalNotePage] = useState(1);

  const commentsPerPage = 4;
  const activitiesPerPage = 4;
  const internalNotesPerPage = 4;

  /* ================= TOASTS ================= */
  const [toasts, setToasts] = useState([]);

  const pushToast = (type, title, message = "") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /* ================= ATTACHMENT STATE ================= */
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [deletingAttachmentId, setDeletingAttachmentId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const abortControllerRef = useRef(null);
  const fileInputRef = useRef(null);
  const attachmentsRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`/tickets/${ticketId}`);
      const ticketData = response.data?.ticket;

      setTicket(ticketData);
      setStatus(ticketData?.status || "");
      setPriority(ticketData?.priority || "");

      if (canViewComments) {
        try {
          const commentResponse = await axios.get(`/comments/${ticketId}`);
          setComments(commentResponse.data?.comments || []);
        } catch (err) {
          console.error("COMMENTS ERROR:", err);
          setComments([]);
        }
      }

      if (canViewInternalNotes) {
        try {
          const internalNoteResponse = await axios.get(
            `/comments/${ticketId}/internal-notes`,
          );
          setInternalNotes(
            internalNoteResponse.data?.internalNotes ||
              internalNoteResponse.data?.notes ||
              [],
          );
        } catch (err) {
          console.error("INTERNAL NOTES ERROR:", err);
          setInternalNotes([]);
        }
      }

      if (canViewActivity) {
        try {
          const activityResponse = await axios.get(
            `/tickets/${ticketId}/activities`,
          );
          setActivities(activityResponse.data?.activities || []);
        } catch (err) {
          console.error("ACTIVITY ERROR:", err);
          setActivities([]);
        }
      }
    } catch (error) {
      console.error("TICKET DETAILS ERROR:", error);
      setError(
        error.response?.data?.message || "Unable to load ticket details.",
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      await fetchTicketDetails();
      setLoading(false);
    };
    if (ticketId) loadData();
  }, [ticketId]);

  /* ================= HANDLERS ================= */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmittingComment(true);
      setError("");
      await axios.post(`/comments/${ticketId}`, { content: comment.trim() });
      const commentResponse = await axios.get(`/comments/${ticketId}`);
      setComments(commentResponse.data?.comments || []);
      setComment("");
      setCommentPage(1);
      await fetchTicketDetails();
      pushToast("success", "Comment added", "Your comment has been posted.");
    } catch (error) {
      console.error("ADD COMMENT ERROR:", error);
      const msg = error.response?.data?.message || "Unable to add comment.";
      setError(msg);
      pushToast("error", "Failed to add comment", msg);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleAddInternalNote = async (e) => {
    e.preventDefault();
    if (!internalNote.trim()) return;

    try {
      setSubmittingInternalNote(true);
      setError("");
      await axios.post(`/comments/${ticketId}/internal`, {
        content: internalNote.trim(),
      });
      const internalNoteResponse = await axios.get(
        `/comments/${ticketId}/internal-notes`,
      );
      setInternalNotes(
        internalNoteResponse.data?.internalNotes ||
          internalNoteResponse.data?.notes ||
          [],
      );
      setInternalNote("");
      setInternalNotePage(1);
      await fetchTicketDetails();
      pushToast(
        "success",
        "Internal note added",
        "Your note is now visible to staff.",
      );
    } catch (error) {
      console.error("ADD INTERNAL NOTE ERROR:", error);
      const msg =
        error.response?.data?.message || "Unable to add internal note.";
      setError(msg);
      pushToast("error", "Failed to add note", msg);
    } finally {
      setSubmittingInternalNote(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!status || !ticket) return;
    try {
      setUpdatingStatus(true);
      setError("");
      await axios.patch(`/tickets/${ticketId}/status`, { status });
      await fetchTicketDetails();
      pushToast(
        "success",
        "Status updated",
        `Ticket status changed to ${status}.`,
      );
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
      const msg = error.response?.data?.message || "Unable to update status.";
      setError(msg);
      pushToast("error", "Failed to update status", msg);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdatePriority = async () => {
    if (!priority || !ticket) return;
    try {
      setUpdatingPriority(true);
      setError("");
      await axios.patch(`/tickets/${ticketId}/priority`, { priority });
      await fetchTicketDetails();
      pushToast(
        "success",
        "Priority updated",
        `Ticket priority changed to ${priority}.`,
      );
    } catch (error) {
      console.error("UPDATE PRIORITY ERROR:", error);
      const msg =
        error.response?.data?.message || "Unable to update priority.";
      setError(msg);
      pushToast("error", "Failed to update priority", msg);
    } finally {
      setUpdatingPriority(false);
    }
  };

  /* ================= FILE VALIDATION ================= */
  const validateFile = (file) => {
    if (!file) return "Please select a file.";

    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed (JPG, PNG, WEBP, GIF).";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "Image size must be less than 5 MB.";
    }

    return null;
  };

  const resetUploadState = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadProgress(0);
    setUploadError("");
    setUploadSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setUploadError("");
    setUploadSuccess("");
    setUploadProgress(0);

    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    setUploadError("");
    setUploadSuccess("");
    setUploadProgress(0);

    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select an image first.");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");
      setUploadSuccess("");
      setUploadProgress(0);

      abortControllerRef.current = new AbortController();

      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        `/tickets/${ticketId}/attachments`,
        formData,
        {
          signal: abortControllerRef.current.signal,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percent);
          },
        },
      );

      const newAttachment =
        response.data?.attachment ||
        response.data?.data?.attachment ||
        response.data?.data ||
        null;

      setTicket((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          attachments: [
            ...(prev.attachments || []),
            ...(newAttachment ? [newAttachment] : []),
          ],
        };
      });

      setUploadSuccess("Image uploaded successfully.");
      setUploadProgress(100);

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl("");

      pushToast("success", "Image uploaded", "Your attachment is now visible.");

      setTimeout(() => {
        attachmentsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);

      setTimeout(() => setUploadSuccess(""), 3000);
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        setUploadError("Upload cancelled.");
        return;
      }

      console.error("UPLOAD ERROR:", error);
      const msg =
        error.response?.data?.message || "Unable to upload image.";
      setUploadError(msg);
      pushToast("error", "Upload failed", msg);
    } finally {
      setUploading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDeleteAttachment = async (attachment) => {
    const id = attachment?._id;
    if (!id) return;

    if (!window.confirm("Delete this attachment? This cannot be undone.")) {
      return;
    }

    try {
      setDeletingAttachmentId(id);
      await axios.delete(`/tickets/${ticketId}/attachments/${id}`);

      setTicket((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          attachments: (prev.attachments || []).filter((a) => a._id !== id),
        };
      });

      pushToast("success", "Attachment deleted", "The image was removed.");
    } catch (error) {
      console.error("DELETE ATTACHMENT ERROR:", error);
      const msg =
        error.response?.data?.message || "Unable to delete attachment.";
      pushToast("error", "Delete failed", msg);
    } finally {
      setDeletingAttachmentId(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* ================= PAGINATION ================= */
  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);
  const commentStartIndex = (commentPage - 1) * commentsPerPage;
  const paginatedComments = comments.slice(
    commentStartIndex,
    commentStartIndex + commentsPerPage,
  );

  const totalActivityPages = Math.ceil(activities.length / activitiesPerPage);
  const activityStartIndex = (activityPage - 1) * activitiesPerPage;
  const paginatedActivities = activities.slice(
    activityStartIndex,
    activityStartIndex + activitiesPerPage,
  );

  const totalInternalNotePages = Math.ceil(
    internalNotes.length / internalNotesPerPage,
  );
  const internalNoteStartIndex = (internalNotePage - 1) * internalNotesPerPage;
  const paginatedInternalNotes = internalNotes.slice(
    internalNoteStartIndex,
    internalNoteStartIndex + internalNotesPerPage,
  );

  /* ================= TABS ================= */
  const tabs = [
    canViewComments && {
      id: "comments",
      label: "Comments",
      count: comments.length,
      icon: <MessageSquare size={15} />,
    },
    canViewInternalNotes && {
      id: "notes",
      label: "Internal Notes",
      count: internalNotes.length,
      icon: <AlertCircle size={15} />,
    },
    canViewActivity && {
      id: "activity",
      label: "Activity",
      count: activities.length,
      icon: <Clock size={15} />,
    },
  ].filter(Boolean);

  /* ================= HELPERS ================= */
  const getStatusStyle = (value) => {
    const styles = {
      Open: {
        bg: "bg-blue-400/10",
        text: "text-blue-300",
        ring: "ring-blue-400/25",
        dot: "bg-blue-400",
      },
      "In Progress": {
        bg: "bg-amber-400/10",
        text: "text-amber-300",
        ring: "ring-amber-400/25",
        dot: "bg-amber-400",
      },
      Waiting: {
        bg: "bg-orange-400/10",
        text: "text-orange-300",
        ring: "ring-orange-400/25",
        dot: "bg-orange-400",
      },
      Resolved: {
        bg: "bg-emerald-400/10",
        text: "text-emerald-300",
        ring: "ring-emerald-400/25",
        dot: "bg-emerald-400",
      },
      Closed: {
        bg: "bg-slate-400/10",
        text: "text-slate-300",
        ring: "ring-slate-400/25",
        dot: "bg-slate-400",
      },
    };
    return styles[value] || styles.Open;
  };

  const getPriorityStyle = (value) => {
    const styles = {
      Low: {
        bg: "bg-emerald-400/10",
        text: "text-emerald-300",
        ring: "ring-emerald-400/25",
        dot: "bg-emerald-400",
      },
      Medium: {
        bg: "bg-amber-400/10",
        text: "text-amber-300",
        ring: "ring-amber-400/25",
        dot: "bg-amber-400",
      },
      High: {
        bg: "bg-orange-400/10",
        text: "text-orange-300",
        ring: "ring-orange-400/25",
        dot: "bg-orange-400",
      },
      Critical: {
        bg: "bg-red-400/10",
        text: "text-red-300",
        ring: "ring-red-400/25",
        dot: "bg-red-400",
      },
    };
    return styles[value] || styles.Medium;
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <LoadingState />;
  }

  if (!ticket) {
    return <ErrorState error={error} navigate={navigate} />;
  }

  const statusStyle = getStatusStyle(ticket.status);
  const priorityStyle = getPriorityStyle(ticket.priority);
  const attachmentsCount = ticket.attachments?.length || 0;

  /* ================= RENDER ================= */
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
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

      <div className="relative mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
        <TicketHero
          ticket={ticket}
          statusStyle={statusStyle}
          priorityStyle={priorityStyle}
          comments={comments}
          activities={activities}
        />

        {error && <ErrorAlert error={error} setError={setError} />}

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          <main className="flex flex-col gap-5 lg:col-span-8">
            <TicketDescription ticket={ticket} />

            <TicketTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              {activeTab === "comments" && canViewComments && (
                <CommentsTab
                  comments={comments}
                  paginatedComments={paginatedComments}
                  totalCommentPages={totalCommentPages}
                  commentPage={commentPage}
                  setCommentPage={setCommentPage}
                  canCreateComment={canCreateComment}
                  comment={comment}
                  setComment={setComment}
                  submittingComment={submittingComment}
                  handleAddComment={handleAddComment}
                />
              )}

              {activeTab === "notes" && canViewInternalNotes && (
                <InternalNotesTab
                  internalNotes={internalNotes}
                  paginatedInternalNotes={paginatedInternalNotes}
                  totalInternalNotePages={totalInternalNotePages}
                  internalNotePage={internalNotePage}
                  setInternalNotePage={setInternalNotePage}
                  canCreateInternalNote={canCreateInternalNote}
                  internalNote={internalNote}
                  setInternalNote={setInternalNote}
                  submittingInternalNote={submittingInternalNote}
                  handleAddInternalNote={handleAddInternalNote}
                />
              )}

              {activeTab === "activity" && canViewActivity && (
                <ActivityTab
                  activities={activities}
                  paginatedActivities={paginatedActivities}
                  totalActivityPages={totalActivityPages}
                  activityPage={activityPage}
                  setActivityPage={setActivityPage}
                />
              )}
            </TicketTabs>
          </main>

          <aside className="flex flex-col gap-4 lg:col-span-4">
            <AssignmentCard ticket={ticket} canAssign={canAssign} />

            {(canUpdateStatus || canUpdatePriority) && (
              <StatusPriorityCard
                canUpdateStatus={canUpdateStatus}
                canUpdatePriority={canUpdatePriority}
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                updatingStatus={updatingStatus}
                updatingPriority={updatingPriority}
                ticket={ticket}
                handleUpdateStatus={handleUpdateStatus}
                handleUpdatePriority={handleUpdatePriority}
              />
            )}

            {canCreateAttachment && (
              <AttachmentsCard
                ticket={ticket}
                canCreateAttachment={canCreateAttachment}
                canDeleteAttachment={canDeleteAttachment}
                attachmentsRef={attachmentsRef}
                attachmentsCount={attachmentsCount}
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                uploading={uploading}
                uploadProgress={uploadProgress}
                uploadError={uploadError}
                uploadSuccess={uploadSuccess}
                deletingAttachmentId={deletingAttachmentId}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                resetUploadState={resetUploadState}
                handleUpload={handleUpload}
                handleCancelUpload={handleCancelUpload}
                handleDeleteAttachment={handleDeleteAttachment}
              />
            )}

            {canUpdate && (
              <EditTicketButton
                ticket={ticket}
                canUpdate={canUpdate}
                navigate={navigate}
              />
            )}
          </aside>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 pb-3 text-center text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Ticket information is protected by your permissions.</span>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-5 right-5 z-[200] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketDetails;

