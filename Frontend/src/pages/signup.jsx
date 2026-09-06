import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Please enter a valid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const getPasswordStrength = () => {
    if (!password) {
      return {
        text: "",
        width: "w-0",
      };
    }

    if (password.length < 8) {
      return {
        text: "Weak password",
        width: "w-1/3",
      };
    }

    if (password.length < 12) {
      return {
        text: "Good password",
        width: "w-2/3",
      };
    }

    return {
      text: "Strong password",
      width: "w-full",
    };
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Signup successful:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);

      setServerError(
        error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT - SIGNUP FORM */}
        <div className="flex items-center justify-center px-6 py-8 sm:px-10 lg:px-14">
          <div className="w-full max-w-lg">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
                H
              </div>

              <div>
                <h1 className="font-bold text-stone-900">HelpDesk</h1>

                <p className="text-xs text-stone-500">Support Management</p>
              </div>
            </Link>

            {/* Heading */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Join HelpDesk and start managing your support requests
                efficiently.
              </p>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={`input h-12 w-full rounded-xl border bg-white px-4 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 transition-all duration-200 hover:border-stone-400 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-stone-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`input h-12 w-full rounded-xl border bg-white px-4 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 transition-all duration-200 hover:border-stone-400 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-stone-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      {...register("password")}
                      className={`input h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 transition-all duration-200 hover:border-stone-400 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2">
                      <div className="h-1 overflow-hidden rounded-full bg-stone-200">
                        <div
                          className={`h-full rounded-full bg-emerald-500 transition-all ${passwordStrength.width}`}
                        />
                      </div>

                      <p className="mt-1 text-[11px] text-stone-500">
                        {passwordStrength.text}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-stone-700">
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      className={`input h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 transition-all duration-200 hover:border-stone-400 focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  required
                  className="checkbox checkbox-sm mt-0.5 border-stone-300 checked:border-emerald-600 checked:bg-emerald-600"
                />

                <span className="text-xs leading-5 text-stone-500">
                  I agree to the HelpDesk terms and understand that my account
                  will be created as a customer account.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Sign in
              </Link>
            </p>

            {/* Back Home */}
            <div className="mt-5 text-center">
              <Link
                to="/"
                className="text-xs font-medium text-stone-400 hover:text-stone-700"
              >
                ← Back to homepage
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT - INFORMATION */}
        <div className="hidden bg-emerald-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-600 px-4 py-2 text-xs font-semibold">
              WELCOME TO HELPDESK
            </div>

            <h2 className="mt-8 text-4xl font-bold leading-tight">
              A better way to
              <span className="block text-emerald-100">manage support.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50">
              Keep support requests organized, collaborate with your team, and
              give customers a clear path from issue to resolution.
            </p>
          </div>

          {/* Workflow */}
          <div className="my-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-emerald-200">
              How HelpDesk works
            </p>

            <div className="space-y-3">
              {[
                ["01", "Create a ticket"],
                ["02", "Assign to support"],
                ["03", "Work on the issue"],
                ["04", "Resolve & close"],
              ].map(([number, text]) => (
                <div
                  key={number}
                  className="flex items-center gap-4 rounded-xl border border-emerald-500/40 bg-emerald-600/60 px-4 py-3"
                >
                  <span className="text-xs font-bold text-emerald-200">
                    {number}
                  </span>

                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-emerald-500/50 pt-5">
            <p className="text-xs text-emerald-100">
              Simple. Organized. Efficient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
