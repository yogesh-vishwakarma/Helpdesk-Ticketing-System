import Toast from "./common/Toast";

const ToastContainer = ({ toasts, dismissToast }) => (
  <div className="pointer-events-none fixed bottom-5 right-5 z-[200] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
    {toasts.map((toast) => (
      <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
    ))}
  </div>
);

export default ToastContainer;
