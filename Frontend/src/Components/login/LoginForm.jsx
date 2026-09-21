import { Link } from "react-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

function LoginForm({
  register,
  handleSubmit,
  errors,
  onSubmit,
  loading,
  error,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      {/* SERVER ERROR */}
      {error && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-2.5
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-3
            py-2.5
            backdrop-blur-sm
          "
        >
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-red-500/20
              text-xs
              font-bold
              text-red-300
              ring-1
              ring-red-400/20
            "
          >
            !
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-red-200">
              Unable to sign in
            </p>

            <p className="truncate text-[10px] text-red-300/80">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-3.5"
      >
        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-bold text-slate-300"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={16}
              className={`
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
                -translate-y-1/2
                transition-colors
                ${errors.email ? "text-red-400" : "text-slate-500"}
              `}
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`
                h-12
                w-full
                rounded-xl
                border
                bg-slate-800/60
                pl-10
                pr-4
                text-sm
                font-medium
                text-white
                shadow-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-slate-500
                backdrop-blur-sm
                autofill:bg-slate-800
                autofill:text-white
                autofill:shadow-[inset_0_0_0_1000px_rgb(30_41_59)]
                ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                    : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
                }
              `}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-[10px] font-medium text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-bold text-slate-300"
            >
              Password
            </label>

            <button
              type="button"
              className="text-[11px] font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <LockKeyhole
              size={16}
              className={`
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
                -translate-y-1/2
                transition-colors
                ${errors.password ? "text-red-400" : "text-slate-500"}
              `}
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              className={`
                h-12
                w-full
                rounded-xl
                border
                bg-slate-800/60
                pl-10
                pr-12
                text-sm
                font-medium
                text-white
                shadow-sm
                outline-none
                transition-all
                duration-200
                placeholder:text-slate-500
                backdrop-blur-sm
                autofill:bg-slate-800
                autofill:text-white
                autofill:shadow-[inset_0_0_0_1000px_rgb(30_41_59)]
                ${
                  errors.password
                    ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                    : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
                }
              `}
            />

            <button
              type="button"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-2
                top-1/2
                z-10
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-slate-500
                transition
                hover:bg-slate-700/60
                hover:text-slate-200
              "
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-[10px] font-medium text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* REMEMBER */}
        <label className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-400">
          <input
            type="checkbox"
            className="
              h-4
              w-4
              cursor-pointer
              appearance-none
              rounded
              border-2
              border-slate-600
              bg-slate-800/60
              transition
              checked:border-emerald-500
              checked:bg-emerald-500
              checked:before:flex
              checked:before:items-center
              checked:before:justify-center
              checked:before:text-[10px]
              checked:before:font-bold
              checked:before:text-white
              checked:before:content-['✓']
              hover:border-emerald-500
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500/30
            "
          />

          <span>Remember me for 30 days</span>
        </label>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            group
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            to-teal-600
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-emerald-500/30
            ring-1
            ring-emerald-400/40
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:from-emerald-400
            hover:to-teal-500
            hover:shadow-xl
            hover:shadow-emerald-500/50
            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Signing in...
            </>
          ) : (
            <>
              Sign In

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* SIGNUP */}
      <p className="mt-4 text-center text-xs text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="
            font-bold
            text-emerald-400
            transition
            hover:text-emerald-300
          "
        >
          Create an account
        </Link>
      </p>

      {/* SECURE ACCESS */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-700/60" />

        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Secure access
        </span>

        <div className="h-px flex-1 bg-slate-700/60" />
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-500">
        <ShieldCheck size={12} className="text-emerald-500" />

        <span>Role-based secure access control</span>
      </div>

      {/* HOME */}
      <div className="mt-2 text-center">
        <Link
          to="/"
          className="
            text-[11px]
            font-semibold
            text-slate-500
            transition
            hover:text-emerald-400
          "
        >
          ← Back to homepage
        </Link>
      </div>
    </>
  );
}

export default LoginForm;