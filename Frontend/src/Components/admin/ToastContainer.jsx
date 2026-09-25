import Toast from "./common/Toast";

const ToastContainer = ({ toasts, dismissToast }) => (
  <div className=" pointer-events-none
    fixed
    inset-x-0
    bottom-4
    z-[9999]
    flex
    justify-center
    px-4
    sm:inset-x-auto
    sm:right-5
    sm:justify-end
    sm:px-0
    md:right-6
    md:bottom-6">
    {toasts.map((toast) => (
      <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
    ))}
  </div>
);

export default ToastContainer;
