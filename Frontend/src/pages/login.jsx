import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");

      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login successful:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setServerError(
        error.response?.data?.message ||
          "Unable to login. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT - LOGIN FORM */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
                H
              </div>

              <div>
                <h1 className="font-bold text-stone-900">
                  HelpDesk
                </h1>

                <p className="text-xs text-stone-500">
                  Support Management
                </p>
              </div>
            </Link>

            {/* Heading */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Sign in to manage your support tickets and stay connected
                with your team.
              </p>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
            >

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

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-stone-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember */}
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-600">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm border-2 border-stone-400 bg-white checked:border-emerald-600 checked:bg-emerald-600"
                />

                Remember me
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-stone-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Create an account
              </Link>
            </p>

            {/* Back Home */}
            <div className="mt-6 text-center">
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
              SUPPORT MANAGEMENT PLATFORM
            </div>

            <h2 className="mt-8 text-4xl font-bold leading-tight">
              Manage support.
              <span className="block text-emerald-100">
                Keep everything organized.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50">
              HelpDesk brings customers, support executives, managers,
              and administrators together in one centralized platform.
            </p>
          </div>


          {/* Features */}
          <div className="my-10 space-y-4">

            {[
              [
                "01",
                "Centralized Tickets",
                "Create and manage support requests from one place.",
              ],
              [
                "02",
                "Team Collaboration",
                "Communicate through comments and internal notes.",
              ],
              [
                "03",
                "Track Progress",
                "Follow every ticket from creation to resolution.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-emerald-500/40 bg-emerald-600/60 p-4"
              >
                <div className="flex gap-4">
                  <span className="text-sm font-bold text-emerald-200">
                    {number}
                  </span>

                  <div>
                    <h3 className="text-sm font-bold">
                      {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-emerald-100">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>


          <div className="border-t border-emerald-500/50 pt-5">
            <p className="text-xs font-medium text-emerald-100">
              Simple. Organized. Efficient.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;













// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";

// const loginSchema = z.object({
//   email: z.email("Please enter a valid email address"),

//   password: z.string().min(1, "Password is required"),
// });

// function Login() {
//   const [serverError, setServerError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmittedData = async (data) => {
//     try {
//       setLoading(true);
//       setServerError("");

//       const response = await axios.post(
//         "http://localhost:5000/auth/login",
//         {
//           email: data.email,
//           password: data.password,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       console.log("Login successful:", response.data);

//       // Later:
//       // 1. Store user information in Redux
//       // 2. Navigate to dashboard
//     } catch (error) {
//       console.error("Login error:", error);

//       setServerError(
//         error.response?.data?.message ||
//           "Unable to login. Please check your credentials.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-stone-100 px-4 py-6">
//       <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
//         <div className="grid w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/70 lg:grid-cols-[1.1fr_0.9fr]">
//           {/* ================================================= */}
//           {/* LEFT - LOGIN FORM */}
//           {/* ================================================= */}

//           <div className="px-7 py-8 sm:px-10 sm:py-10 lg:px-12">
//             {/* Brand */}
//             <div className="mb-10 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-700">
//                 H
//               </div>

//               <div>
//                 <h2 className="text-lg font-bold text-stone-900">HelpDesk</h2>

//                 <p className="text-xs text-stone-500">
//                   Support Management System
//                 </p>
//               </div>
//             </div>

//             {/* Heading */}
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
//                 Welcome back
//               </h1>

//               <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
//                 Sign in to access your support tickets and manage your requests.
//               </p>
//             </div>

//             {/* Server Error */}
//             {serverError && (
//               <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
//                 <p className="text-sm font-medium text-red-600">
//                   {serverError}
//                 </p>
//               </div>
//             )}

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit(onSubmittedData)}
//               className="space-y-5"
//             >
//               {/* Email */}
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-stone-700">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   {...register("email")}
//                   className={`input h-12 w-full rounded-lg border bg-white px-4 text-sm text-stone-900 shadow-sm transition-all duration-200 placeholder:text-stone-400 hover:border-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
//                     errors.email
//                       ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
//                       : "border-stone-300"
//                   }`}
//                 />

//                 {errors.email && (
//                   <p className="mt-1.5 text-xs font-medium text-red-500">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="mb-2 flex items-center justify-between">
//                   <label className="block text-sm font-semibold text-stone-700">
//                     Password
//                   </label>

//                   <button
//                     type="button"
//                     className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   {...register("password")}
//                   className={`input h-12 w-full rounded-lg border bg-white px-4 text-sm text-stone-900 shadow-sm transition-all duration-200 placeholder:text-stone-400 hover:border-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
//                     errors.password
//                       ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
//                       : "border-stone-300"
//                   }`}
//                 />

//                 {errors.password && (
//                   <p className="mt-1.5 text-xs font-medium text-red-500">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn h-12 w-full border-0 bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner loading-sm"></span>
//                     Signing In...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Signup */}
//             <div className="mt-8 text-center text-sm text-stone-500">
//               Don't have an account?
//               <button
//                 type="button"
//                 className="ml-1 font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
//               >
//                 Create Account
//               </button>
//             </div>
//           </div>

//           {/* ================================================= */}
//           {/* RIGHT - PLATFORM INFORMATION */}
//           {/* ================================================= */}

//           <div className="relative hidden overflow-hidden bg-emerald-50 lg:block">
//             {/* Decorative circles */}
//             <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100"></div>

//             <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-emerald-100/70"></div>

//             <div className="relative flex h-full flex-col justify-between p-10">
//               {/* Intro */}
//               <div>
//                 <div className="mb-5 flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

//                   <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
//                     HelpDesk Platform
//                   </span>
//                 </div>

//                 <h2 className="text-3xl font-bold leading-tight text-stone-900">
//                   Manage support
//                   <br />
//                   <span className="text-emerald-600">without the hassle.</span>
//                 </h2>

//                 <p className="mt-4 max-w-sm text-sm leading-6 text-stone-600">
//                   Access your support requests, communicate with support staff,
//                   and stay updated on your ticket progress.
//                 </p>
//               </div>

//               {/* Features */}
//               <div className="my-8 space-y-3">
//                 {/* Feature 1 */}
//                 <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-lg font-semibold text-emerald-700">
//                     ✓
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-semibold text-stone-800">
//                       Track Support Requests
//                     </h3>

//                     <p className="mt-0.5 text-xs text-stone-500">
//                       See the current status and progress of your tickets.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature 2 */}
//                 <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-lg text-emerald-700">
//                     💬
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-semibold text-stone-800">
//                       Communicate Easily
//                     </h3>

//                     <p className="mt-0.5 text-xs text-stone-500">
//                       Communicate directly with your support team.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Feature 3 */}
//                 <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-lg text-emerald-700">
//                     +
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-semibold text-stone-800">
//                       Create New Tickets
//                     </h3>

//                     <p className="mt-0.5 text-xs text-stone-500">
//                       Submit new support requests whenever you need help.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom */}
//               <div className="rounded-2xl bg-emerald-600 p-5 text-white shadow-lg shadow-emerald-600/20">
//                 <p className="text-xs font-medium uppercase tracking-wide text-emerald-100">
//                   Support Management
//                 </p>

//                 <div className="mt-1 flex items-center justify-between">
//                   <p className="text-sm font-semibold">
//                     Simple. Organized. Efficient.
//                   </p>

//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
//                     ✓
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
