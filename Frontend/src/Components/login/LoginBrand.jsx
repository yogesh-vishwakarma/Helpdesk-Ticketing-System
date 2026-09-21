import { Link } from "react-router";
import { Ticket } from "lucide-react";

function LoginBrand() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-emerald-500
          to-teal-600
          text-white
          shadow-lg
          shadow-emerald-500/40
          ring-1
          ring-emerald-400/30
          transition
          duration-200
          group-hover:-translate-y-0.5
          group-hover:shadow-xl
          group-hover:shadow-emerald-500/50
        "
      >
        <Ticket size={22} strokeWidth={2.5} />
      </div>

      <div className="min-w-0">
        <h1 className="text-base font-extrabold tracking-tight text-white">
          HelpDesk
        </h1>

        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
          Support Management
        </p>
      </div>
    </Link>
  );
}

export default LoginBrand;