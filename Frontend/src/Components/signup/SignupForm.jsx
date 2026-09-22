import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import PasswordRequirement from "./PasswordRequirement";
import { Link } from "react-router";


function SignupForm({
  register,
  handleSubmit,
  errors,
  onSubmit,
  loading,
  error,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  password,
  passwordStrength,
  passwordChecks,
}) {
  return (
    <>
      {/* SERVER ERROR */}
      {error && (
        <div
          className="
            mt-4 flex items-center gap-2.5 rounded-xl
            border border-red-500/30 bg-red-500/10
            px-3 py-2.5 backdrop-blur-sm
          "
        >
          <div
            className="
              flex h-7 w-7 shrink-0 items-center justify-center
              rounded-lg bg-red-500/20 text-xs font-bold
              text-red-300 ring-1 ring-red-400/20
            "
          >
            !
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-red-200">
              Unable to create account
            </p>

            <p className="truncate text-[10px] text-red-300/80">{error}</p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-bold text-slate-300"
          >
            Full name
          </label>

          <div className="relative">
            <UserRound
              size={16}
              className={`
                pointer-events-none absolute left-3.5 top-1/2
                z-10 -translate-y-1/2 transition-colors
                ${errors.name ? "text-red-400" : "text-slate-500"}
              `}
            />

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              {...register("name")}
              className={`
                h-11 w-full rounded-xl border bg-slate-800/60
                pl-10 pr-3 text-sm font-medium text-white
                shadow-sm outline-none transition-all duration-200
                placeholder:text-slate-500 backdrop-blur-sm
                ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                    : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
                }
              `}
            />
          </div>

          {errors.name && (
            <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

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
                pointer-events-none absolute left-3.5 top-1/2
                z-10 -translate-y-1/2 transition-colors
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
                h-11 w-full rounded-xl border bg-slate-800/60
                pl-10 pr-3 text-sm font-medium text-white
                shadow-sm outline-none transition-all duration-200
                placeholder:text-slate-500 backdrop-blur-sm
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

        {/* PASSWORD ROW */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* PASSWORD */}
          <div className="min-w-0">
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-bold text-slate-300"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={16}
                className={`
                  pointer-events-none absolute left-3.5 top-1/2
                  z-10 -translate-y-1/2 transition-colors
                  ${errors.password ? "text-red-400" : "text-slate-500"}
                `}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create password"
                {...register("password")}
                className={`
                  h-11 w-full rounded-xl border bg-slate-800/60
                  pl-10 pr-10 text-sm font-medium text-white
                  shadow-sm outline-none transition-all duration-200
                  placeholder:text-slate-500 backdrop-blur-sm
                  ${
                    errors.password
                      ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                      : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
                  }
                `}
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-1.5 top-1/2 z-10
                  flex h-8 w-8 -translate-y-1/2
                  items-center justify-center rounded-lg
                  text-slate-500 transition
                  hover:bg-slate-700/60 hover:text-slate-200
                "
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-[10px] font-medium text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="min-w-0">
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-bold text-slate-300"
            >
              Confirm password
            </label>

            <div className="relative">
              <KeyRound
                size={16}
                className={`
                  pointer-events-none absolute left-3.5 top-1/2
                  z-10 -translate-y-1/2 transition-colors
                  ${errors.confirmPassword ? "text-red-400" : "text-slate-500"}
                `}
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className={`
                  h-11 w-full rounded-xl border bg-slate-800/60
                  pl-10 pr-10 text-sm font-medium text-white
                  shadow-sm outline-none transition-all duration-200
                  placeholder:text-slate-500 backdrop-blur-sm
                  ${
                    errors.confirmPassword
                      ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                      : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
                  }
                `}
              />

              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute right-1.5 top-1/2 z-10
                  flex h-8 w-8 -translate-y-1/2
                  items-center justify-center rounded-lg
                  text-slate-500 transition
                  hover:bg-slate-700/60 hover:text-slate-200
                "
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-[10px] font-medium text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* PASSWORD STRENGTH */}
        {password && (
          <div
            className="
              rounded-xl border border-slate-700/60
              bg-slate-800/40 px-3 py-2.5 backdrop-blur-sm
            "
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Password strength
              </p>

              <p
                className={`
                  text-[10px] font-bold
                  ${
                    password.length < 8
                      ? "text-red-400"
                      : password.length < 12
                        ? "text-amber-400"
                        : "text-emerald-400"
                  }
                `}
              >
                {passwordStrength.text}
              </p>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div
                className={`
                  h-full rounded-full bg-gradient-to-r
                  ${passwordStrength.color}
                  transition-all duration-500
                  ${passwordStrength.width}
                `}
              />
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              <PasswordRequirement
                active={passwordChecks.length}
                text="8+ chars"
              />

              <PasswordRequirement
                active={passwordChecks.strong}
                text="12+ strong"
              />

              <PasswordRequirement
                active={passwordChecks.uppercase}
                text="Uppercase"
              />

              <PasswordRequirement active={passwordChecks.match} text="Match" />
            </div>
          </div>
        )}

        {/* TERMS */}
        <label className="flex cursor-pointer items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            required
            className="
              mt-0.5 h-4 w-4 shrink-0 cursor-pointer
              appearance-none rounded border-2 border-slate-600
              bg-slate-800/60 transition
              checked:border-emerald-500 checked:bg-emerald-500
              checked:before:flex checked:before:items-center
              checked:before:justify-center checked:before:text-[10px]
              checked:before:font-bold checked:before:text-white
              checked:before:content-['✓']
              hover:border-emerald-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/30
            "
          />

          <span className="text-[11px] leading-4 text-slate-400">
            I agree to the HelpDesk{" "}
            <span className="font-semibold text-emerald-400">
              terms of service
            </span>{" "}
            and understand that my account will be created as a customer
            account.
          </span>
        </label>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            group flex h-11 w-full items-center justify-center
            gap-2 rounded-xl bg-gradient-to-r from-emerald-500
            to-teal-600 text-sm font-bold text-white
            shadow-lg shadow-emerald-500/30
            ring-1 ring-emerald-400/40
            transition-all duration-200
            hover:-translate-y-0.5 hover:from-emerald-400
            hover:to-teal-500 hover:shadow-xl
            hover:shadow-emerald-500/50
            disabled:cursor-not-allowed
            disabled:translate-y-0 disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* LOGIN */}
      <p className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-emerald-400 transition hover:text-emerald-300"
        >
          Sign in
        </Link>
      </p>

      {/* SECURITY */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-700/60" />

        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Secure access
        </span>

        <div className="h-px flex-1 bg-slate-700/60" />
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-500">
        <ShieldCheck size={12} className="text-emerald-500" />
        Protected with role-based access control
      </div>

      <div className="mt-2 text-center">
        <a
          href="/"
          className="text-[11px] font-semibold text-slate-500 transition hover:text-emerald-400"
        >
          ← Back to homepage
        </a>
      </div>
    </>
  );
}

export default SignupForm;