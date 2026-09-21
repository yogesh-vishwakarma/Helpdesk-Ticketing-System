import { Sparkles } from "lucide-react";

function LoginHeader() {
  return (
    <div className="mt-5">
      <div
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-emerald-400/30
          bg-emerald-400/10
          px-3
          py-1
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          text-emerald-300
        "
      >
        <Sparkles size={11} />
        Welcome back
      </div>

      <h2
        className="
          mt-3
          text-[28px]
          font-black
          leading-[1.05]
          tracking-tight
          text-white
          sm:text-[32px]
          xl:text-[36px]
        "
      >
        Sign in to your

        <span
          className="
            block
            bg-gradient-to-r
            from-emerald-300
            via-teal-300
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          HelpDesk account.
        </span>
      </h2>

      <p className="mt-2 max-w-[420px] text-[12px] leading-5 text-slate-400 sm:text-sm">
        Access your support workspace, manage tickets, and stay connected with
        your team — all in one place.
      </p>
    </div>
  );
}

export default LoginHeader;