import { useState } from "react";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

import SignupBrand from "../Components/signup/SignupBrand";
import SignupHeader from "../Components/signup/SignupHeader";
import SignupForm from "../Components/signup/SignupForm";
import SignupSidePanel from "../Components/signup/SignupSidePanel";

/* =========================================================
   VALIDATION
   DO NOT CHANGE
========================================================= */

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* =========================================================
   SIGNUP PAGE
========================================================= */

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  /* =========================================================
     PASSWORD STRENGTH
     DO NOT CHANGE
  ========================================================= */

  const getPasswordStrength = () => {
    if (!password) {
      return {
        text: "",
        width: "w-0",
        color: "from-slate-300 to-slate-300",
      };
    }

    if (password.length < 8) {
      return {
        text: "Weak password",
        width: "w-1/3",
        color: "from-red-400 to-rose-500",
      };
    }

    if (password.length < 12) {
      return {
        text: "Good password",
        width: "w-2/3",
        color: "from-amber-400 to-orange-500",
      };
    }

    return {
      text: "Strong password",
      width: "w-full",
      color: "from-emerald-400 to-teal-500",
    };
  };

  const passwordStrength = getPasswordStrength();

  /* =========================================================
     PASSWORD CHECKS
     VISUAL ONLY
  ========================================================= */

  const passwordChecks = {
    length: password.length >= 8,

    strong: password.length >= 12,

    match:
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,

    uppercase: /[A-Z]/.test(password),

    number: /[0-9]/.test(password),
  };

  /* =========================================================
     SUBMIT
     DO NOT CHANGE API / REDUX LOGIC
  ========================================================= */

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );

      if (registerUser.fulfilled.match(result)) {
        console.log("Signup successful");

        navigate("/welcome");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* PAGE CONTAINER */}
      <div className="relative flex h-full w-full items-center justify-center p-0 sm:p-3 lg:p-4">
        <div
          className="
            grid h-full w-full max-w-[1280px]
            overflow-hidden border border-white/10
            bg-slate-900/80
            shadow-[0_30px_100px_-30px_rgba(16,185,129,0.35)]
            backdrop-blur-xl
            sm:h-[calc(100dvh-24px)]
            sm:max-h-[800px]
            sm:rounded-[32px]
            lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          "
        >
          {/* LEFT SIDE */}
          <section className="min-h-0 min-w-0 overflow-hidden bg-slate-900">
            <div
              className="
                flex h-full min-h-0 w-full
                items-center justify-center
                px-5 py-5 sm:px-7 sm:py-6
                lg:px-9 xl:px-11
              "
            >
              <div className="w-full max-w-[460px]">
                {/* BRAND */}
                <SignupBrand />

                {/* HEADER */}
                <SignupHeader />

                {/* FORM */}
                <SignupForm
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  onSubmit={onSubmit}
                  loading={loading}
                  error={error}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={
                    setShowConfirmPassword
                  }
                  password={password}
                  passwordStrength={passwordStrength}
                  passwordChecks={passwordChecks}
                />
              </div>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <SignupSidePanel />
        </div>
      </div>
    </main>
  );
}

export default Signup;
















// import { useState } from "react";
// import { Link, useNavigate } from "react-router";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import {
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   Eye,
//   EyeOff,
//   Headphones,
//   KeyRound,
//   LockKeyhole,
//   Mail,
//   ShieldCheck,
//   Sparkles,
//   Ticket,
//   UserRound,
//   Users,
//   Zap,
// } from "lucide-react";

// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/slices/authSlice";

// /* =========================================================
//    VALIDATION
//    DO NOT CHANGE
// ========================================================= */

// const signupSchema = z
//   .object({
//     name: z.string().min(3, "Name must be at least 3 characters"),

//     email: z.email("Please enter a valid email address"),

//     password: z.string().min(8, "Password must be at least 8 characters"),

//     confirmPassword: z.string().min(8, "Please confirm your password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// /* =========================================================
//    SIGNUP PAGE
// ========================================================= */

// function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loading, error } = useSelector((state) => state.auth);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signupSchema),
//   });

//   const password = watch("password", "");
//   const confirmPassword = watch("confirmPassword", "");

//   /* =========================================================
//      PASSWORD STRENGTH
//      DO NOT CHANGE
//   ========================================================= */

//   const getPasswordStrength = () => {
//     if (!password) {
//       return {
//         text: "",
//         width: "w-0",
//         color: "from-slate-300 to-slate-300",
//       };
//     }

//     if (password.length < 8) {
//       return {
//         text: "Weak password",
//         width: "w-1/3",
//         color: "from-red-400 to-rose-500",
//       };
//     }

//     if (password.length < 12) {
//       return {
//         text: "Good password",
//         width: "w-2/3",
//         color: "from-amber-400 to-orange-500",
//       };
//     }

//     return {
//       text: "Strong password",
//       width: "w-full",
//       color: "from-emerald-400 to-teal-500",
//     };
//   };

//   const passwordStrength = getPasswordStrength();

//   /* =========================================================
//      PASSWORD CHECKS
//      VISUAL ONLY
//   ========================================================= */

//   const passwordChecks = {
//     length: password.length >= 8,
//     strong: password.length >= 12,
//     match:
//       password.length > 0 &&
//       confirmPassword.length > 0 &&
//       password === confirmPassword,
//     uppercase: /[A-Z]/.test(password),
//     number: /[0-9]/.test(password),
//   };

//   /* =========================================================
//      SUBMIT
//      DO NOT CHANGE API / REDUX LOGIC
//   ========================================================= */

//   const onSubmit = async (data) => {
//     try {
//       const result = await dispatch(
//         registerUser({
//           name: data.name,
//           email: data.email,
//           password: data.password,
//         }),
//       );

//       if (registerUser.fulfilled.match(result)) {
//         console.log("Signup successful");

//         navigate("/welcome");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//     }
//   };

//   return (
//     <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
//       {/* =====================================================
//           BACKGROUND
//       ====================================================== */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />
//         <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
//         <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
//             backgroundSize: "42px 42px",
//           }}
//         />
//       </div>

//       {/* =====================================================
//           PAGE CONTAINER
//       ====================================================== */}

//       <div className="relative flex h-full w-full items-center justify-center p-0 sm:p-3 lg:p-4">
//         <div
//           className="
//             grid
//             h-full
//             w-full
//             max-w-[1280px]
//             overflow-hidden
//             border
//             border-white/10
//             bg-slate-900/80
//             shadow-[0_30px_100px_-30px_rgba(16,185,129,0.35)]
//             backdrop-blur-xl
//             sm:h-[calc(100dvh-24px)]
//             sm:max-h-[800px]
//             sm:rounded-[32px]
//             lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
//           "
//         >
//           {/* =================================================
//               LEFT SIDE — FORM
//           ================================================== */}

//           <section className="min-h-0 min-w-0 overflow-hidden bg-slate-900">
//             <div className="flex h-full min-h-0 w-full items-center justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-9 xl:px-11">
//               <div className="w-full max-w-[460px]">
//                 {/* BRAND */}
//                 <Link to="/" className="group inline-flex items-center gap-3">
//                   <div
//                     className="
//                       flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
//                       bg-gradient-to-br from-emerald-500 to-teal-600 text-white
//                       shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/30
//                       transition duration-200
//                       group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-emerald-500/50
//                     "
//                   >
//                     <Ticket size={22} strokeWidth={2.5} />
//                   </div>

//                   <div className="min-w-0">
//                     <h1 className="text-base font-extrabold tracking-tight text-white">
//                       HelpDesk
//                     </h1>

//                     <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
//                       Support Management
//                     </p>
//                   </div>
//                 </Link>

//                 {/* HEADING */}
//                 <div className="mt-5">
//                   <div
//                     className="
//                       inline-flex items-center gap-1.5 rounded-full
//                       border border-emerald-400/30 bg-emerald-400/10
//                       px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300
//                     "
//                   >
//                     <Sparkles size={11} />
//                     Get started free
//                   </div>

//                   <h2
//                     className="
//                       mt-3 text-[28px] font-black leading-[1.05] tracking-tight text-white
//                       sm:text-[32px] xl:text-[36px]
//                     "
//                   >
//                     Create your
//                     <span
//                       className="
//                         block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300
//                         bg-clip-text text-transparent
//                       "
//                     >
//                       HelpDesk account.
//                     </span>
//                   </h2>

//                   <p className="mt-2 max-w-[420px] text-[12px] leading-5 text-slate-400 sm:text-sm">
//                     Join your support workspace and start managing customer
//                     requests in minutes — no setup required.
//                   </p>
//                 </div>

//                 {/* SERVER ERROR */}
//                 {error && (
//                   <div
//                     className="
//                       mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/30
//                       bg-red-500/10 px-3 py-2.5 backdrop-blur-sm
//                     "
//                   >
//                     <div
//                       className="
//                         flex h-7 w-7 shrink-0 items-center justify-center
//                         rounded-lg bg-red-500/20 text-xs font-bold text-red-300
//                         ring-1 ring-red-400/20
//                       "
//                     >
//                       !
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-xs font-bold text-red-200">
//                         Unable to create account
//                       </p>

//                       <p className="truncate text-[10px] text-red-300/80">
//                         {error}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* =================================================
//                     FORM
//                 ================================================== */}

//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="mt-4 space-y-3"
//                 >
//                   {/* NAME */}
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="mb-1.5 block text-xs font-bold text-slate-300"
//                     >
//                       Full name
//                     </label>

//                     <div className="relative">
//                       <UserRound
//                         size={16}
//                         className={`
//                           pointer-events-none
//                           absolute
//                           left-3.5
//                           top-1/2
//                           z-10
//                           -translate-y-1/2
//                           transition-colors
//                           ${errors.name ? "text-red-400" : "text-slate-500"}
//                         `}
//                       />

//                       <input
//                         id="name"
//                         type="text"
//                         autoComplete="name"
//                         placeholder="Enter your full name"
//                         {...register("name")}
//                         className={`
//                           h-11
//                           w-full
//                           rounded-xl
//                           border
//                           bg-slate-800/60
//                           pl-10
//                           pr-3
//                           text-sm
//                           font-medium
//                           text-white
//                           shadow-sm
//                           outline-none
//                           transition-all
//                           duration-200
//                           placeholder:text-slate-500
//                           backdrop-blur-sm
//                           ${
//                             errors.name
//                               ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
//                               : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
//                           }
//                         `}
//                       />
//                     </div>

//                     {errors.name && (
//                       <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-red-400">
//                         {errors.name.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* EMAIL */}
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="mb-1.5 block text-xs font-bold text-slate-300"
//                     >
//                       Email address
//                     </label>

//                     <div className="relative">
//                       <Mail
//                         size={16}
//                         className={`
//                           pointer-events-none
//                           absolute
//                           left-3.5
//                           top-1/2
//                           z-10
//                           -translate-y-1/2
//                           transition-colors
//                           ${errors.email ? "text-red-400" : "text-slate-500"}
//                         `}
//                       />

//                       <input
//                         id="email"
//                         type="email"
//                         autoComplete="email"
//                         placeholder="you@example.com"
//                         {...register("email")}
//                         className={`
//                           h-11
//                           w-full
//                           rounded-xl
//                           border
//                           bg-slate-800/60
//                           pl-10
//                           pr-3
//                           text-sm
//                           font-medium
//                           text-white
//                           shadow-sm
//                           outline-none
//                           transition-all
//                           duration-200
//                           placeholder:text-slate-500
//                           backdrop-blur-sm
//                           ${
//                             errors.email
//                               ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
//                               : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
//                           }
//                         `}
//                       />
//                     </div>

//                     {errors.email && (
//                       <p className="mt-1 text-[10px] font-medium text-red-400">
//                         {errors.email.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* PASSWORD ROW */}
//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                     {/* PASSWORD */}
//                     <div className="min-w-0">
//                       <label
//                         htmlFor="password"
//                         className="mb-1.5 block text-xs font-bold text-slate-300"
//                       >
//                         Password
//                       </label>

//                       <div className="relative">
//                         <LockKeyhole
//                           size={16}
//                           className={`
//                             pointer-events-none
//                             absolute
//                             left-3.5
//                             top-1/2
//                             z-10
//                             -translate-y-1/2
//                             transition-colors
//                             ${
//                               errors.password
//                                 ? "text-red-400"
//                                 : "text-slate-500"
//                             }
//                           `}
//                         />

//                         <input
//                           id="password"
//                           type={showPassword ? "text" : "password"}
//                           autoComplete="new-password"
//                           placeholder="Create password"
//                           {...register("password")}
//                           className={`
//                             h-11
//                             w-full
//                             rounded-xl
//                             border
//                             bg-slate-800/60
//                             pl-10
//                             pr-10
//                             text-sm
//                             font-medium
//                             text-white
//                             shadow-sm
//                             outline-none
//                             transition-all
//                             duration-200
//                             placeholder:text-slate-500
//                             backdrop-blur-sm
//                             ${
//                               errors.password
//                                 ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
//                                 : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
//                             }
//                           `}
//                         />

//                         <button
//                           type="button"
//                           aria-label={
//                             showPassword ? "Hide password" : "Show password"
//                           }
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="
//                             absolute
//                             right-1.5
//                             top-1/2
//                             z-10
//                             flex
//                             h-8
//                             w-8
//                             -translate-y-1/2
//                             items-center
//                             justify-center
//                             rounded-lg
//                             text-slate-500
//                             transition
//                             hover:bg-slate-700/60
//                             hover:text-slate-200
//                           "
//                         >
//                           {showPassword ? (
//                             <EyeOff size={15} />
//                           ) : (
//                             <Eye size={15} />
//                           )}
//                         </button>
//                       </div>

//                       {errors.password && (
//                         <p className="mt-1 text-[10px] font-medium text-red-400">
//                           {errors.password.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* CONFIRM PASSWORD */}
//                     <div className="min-w-0">
//                       <label
//                         htmlFor="confirmPassword"
//                         className="mb-1.5 block text-xs font-bold text-slate-300"
//                       >
//                         Confirm password
//                       </label>

//                       <div className="relative">
//                         <KeyRound
//                           size={16}
//                           className={`
//                             pointer-events-none
//                             absolute
//                             left-3.5
//                             top-1/2
//                             z-10
//                             -translate-y-1/2
//                             transition-colors
//                             ${
//                               errors.confirmPassword
//                                 ? "text-red-400"
//                                 : "text-slate-500"
//                             }
//                           `}
//                         />

//                         <input
//                           id="confirmPassword"
//                           type={showConfirmPassword ? "text" : "password"}
//                           autoComplete="new-password"
//                           placeholder="Confirm password"
//                           {...register("confirmPassword")}
//                           className={`
//                             h-11
//                             w-full
//                             rounded-xl
//                             border
//                             bg-slate-800/60
//                             pl-10
//                             pr-10
//                             text-sm
//                             font-medium
//                             text-white
//                             shadow-sm
//                             outline-none
//                             transition-all
//                             duration-200
//                             placeholder:text-slate-500
//                             backdrop-blur-sm
//                             ${
//                               errors.confirmPassword
//                                 ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
//                                 : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/15"
//                             }
//                           `}
//                         />

//                         <button
//                           type="button"
//                           aria-label={
//                             showConfirmPassword
//                               ? "Hide password"
//                               : "Show password"
//                           }
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                           className="
//                             absolute
//                             right-1.5
//                             top-1/2
//                             z-10
//                             flex
//                             h-8
//                             w-8
//                             -translate-y-1/2
//                             items-center
//                             justify-center
//                             rounded-lg
//                             text-slate-500
//                             transition
//                             hover:bg-slate-700/60
//                             hover:text-slate-200
//                           "
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff size={15} />
//                           ) : (
//                             <Eye size={15} />
//                           )}
//                         </button>
//                       </div>

//                       {errors.confirmPassword && (
//                         <p className="mt-1 text-[10px] font-medium text-red-400">
//                           {errors.confirmPassword.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* PASSWORD STRENGTH */}
//                   {password && (
//                     <div
//                       className="
//                         rounded-xl
//                         border
//                         border-slate-700/60
//                         bg-slate-800/40
//                         px-3
//                         py-2.5
//                         backdrop-blur-sm
//                       "
//                     >
//                       <div className="flex items-center justify-between">
//                         <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                           Password strength
//                         </p>

//                         <p
//                           className={`text-[10px] font-bold ${
//                             password.length < 8
//                               ? "text-red-400"
//                               : password.length < 12
//                                 ? "text-amber-400"
//                                 : "text-emerald-400"
//                           }`}
//                         >
//                           {passwordStrength.text}
//                         </p>
//                       </div>

//                       <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-700">
//                         <div
//                           className={`
//                             h-full
//                             rounded-full
//                             bg-gradient-to-r
//                             ${passwordStrength.color}
//                             transition-all
//                             duration-500
//                             ${passwordStrength.width}
//                           `}
//                         />
//                       </div>

//                       <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
//                         <PasswordRequirement
//                           active={passwordChecks.length}
//                           text="8+ chars"
//                         />

//                         <PasswordRequirement
//                           active={passwordChecks.strong}
//                           text="12+ strong"
//                         />

//                         <PasswordRequirement
//                           active={passwordChecks.uppercase}
//                           text="Uppercase"
//                         />

//                         <PasswordRequirement
//                           active={passwordChecks.match}
//                           text="Match"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* TERMS */}
//                   <label className="flex cursor-pointer items-start gap-2.5 pt-1">
//                     <input
//                       type="checkbox"
//                       required
//                       className="
//                         mt-0.5
//                         h-4
//                         w-4
//                         shrink-0
//                         cursor-pointer
//                         appearance-none
//                         rounded
//                         border-2
//                         border-slate-600
//                         bg-slate-800/60
//                         transition
//                         checked:border-emerald-500
//                         checked:bg-emerald-500
//                         checked:before:flex
//                         checked:before:items-center
//                         checked:before:justify-center
//                         checked:before:text-[10px]
//                         checked:before:font-bold
//                         checked:before:text-white
//                         checked:before:content-['✓']
//                         hover:border-emerald-500
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-emerald-500/30
//                       "
//                     />

//                     <span className="text-[11px] leading-4 text-slate-400">
//                       I agree to the HelpDesk{" "}
//                       <span className="font-semibold text-emerald-400">
//                         terms of service
//                       </span>{" "}
//                       and understand that my account will be created as a
//                       customer account.
//                     </span>
//                   </label>

//                   {/* SUBMIT */}
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="
//                       group
//                       flex
//                       h-11
//                       w-full
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-xl
//                       bg-gradient-to-r
//                       from-emerald-500
//                       to-teal-600
//                       text-sm
//                       font-bold
//                       text-white
//                       shadow-lg
//                       shadow-emerald-500/30
//                       ring-1
//                       ring-emerald-400/40
//                       transition-all
//                       duration-200
//                       hover:-translate-y-0.5
//                       hover:from-emerald-400
//                       hover:to-teal-500
//                       hover:shadow-xl
//                       hover:shadow-emerald-500/50
//                       disabled:cursor-not-allowed
//                       disabled:translate-y-0
//                       disabled:opacity-60
//                     "
//                   >
//                     {loading ? (
//                       <>
//                         <span className="loading loading-spinner loading-xs" />
//                         Creating account...
//                       </>
//                     ) : (
//                       <>
//                         Create Account
//                         <ArrowRight
//                           size={16}
//                           className="transition-transform duration-200 group-hover:translate-x-1"
//                         />
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 {/* LOGIN */}
//                 <p className="mt-4 text-center text-xs text-slate-400">
//                   Already have an account?{" "}
//                   <Link
//                     to="/login"
//                     className="font-bold text-emerald-400 transition hover:text-emerald-300"
//                   >
//                     Sign in
//                   </Link>
//                 </p>

//                 {/* SECURITY */}
//                 <div className="mt-4 flex items-center gap-3">
//                   <div className="h-px flex-1 bg-slate-700/60" />
//                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
//                     Secure access
//                   </span>
//                   <div className="h-px flex-1 bg-slate-700/60" />
//                 </div>

//                 <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-500">
//                   <ShieldCheck size={12} className="text-emerald-500" />
//                   Protected with role-based access control
//                 </div>

//                 <div className="mt-2 text-center">
//                   <Link
//                     to="/"
//                     className="text-[11px] font-semibold text-slate-500 transition hover:text-emerald-400"
//                   >
//                     ← Back to homepage
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* =================================================
//               RIGHT SIDE — DECORATIVE PANEL
//           ================================================== */}

//           <section
//             className="
//               relative
//               hidden
//               min-h-0
//               min-w-0
//               overflow-hidden
//               bg-[#06141C]
//               lg:flex
//               lg:flex-col
//             "
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#082028] to-[#043A35]" />

//             <div className="pointer-events-none absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-400/25 blur-[110px]" />
//             <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[110px]" />
//             <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-400/10 blur-[100px]" />

//             <div
//               className="pointer-events-none absolute inset-0 opacity-[0.04]"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
//                 backgroundSize: "40px 40px",
//               }}
//             />

//             <div className="pointer-events-none absolute -right-14 top-24 h-72 w-72 rounded-full border border-emerald-400/10" />
//             <div className="pointer-events-none absolute right-10 top-36 h-52 w-52 rounded-full border border-cyan-400/10" />
//             <div className="pointer-events-none absolute right-28 top-48 h-24 w-24 rounded-full bg-emerald-400/10" />

//             <div
//               className="
//                 relative
//                 z-10
//                 flex
//                 h-full
//                 min-h-0
//                 min-w-0
//                 flex-col
//                 justify-between
//                 p-8
//                 xl:p-10
//               "
//             >
//               <div className="min-w-0">
//                 <div
//                   className="
//                     inline-flex
//                     items-center
//                     gap-2
//                     rounded-full
//                     border
//                     border-emerald-400/25
//                     bg-emerald-400/10
//                     px-3
//                     py-1.5
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-[0.2em]
//                     text-emerald-300
//                     backdrop-blur-sm
//                   "
//                 >
//                   <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
//                   Welcome to HelpDesk
//                 </div>

//                 <h2
//                   className="
//                     mt-6
//                     max-w-[520px]
//                     text-[38px]
//                     font-black
//                     leading-[1.02]
//                     tracking-[-0.04em]
//                     text-white
//                     xl:text-[44px]
//                   "
//                 >
//                   Everything your
//                   <span
//                     className="
//                       block
//                       bg-gradient-to-r
//                       from-emerald-300
//                       via-teal-300
//                       to-cyan-300
//                       bg-clip-text
//                       text-transparent
//                     "
//                   >
//                     support team
//                   </span>
//                   needs to succeed.
//                 </h2>

//                 <p className="mt-4 max-w-[480px] text-[13px] leading-6 text-slate-400 xl:text-sm">
//                   Create your account and get a cleaner, smarter way to manage
//                   customer support — from ticket creation all the way to
//                   resolution.
//                 </p>
//               </div>

//               <div className="my-5 min-w-0 space-y-2.5">
//                 <SignupFeature
//                   icon={Ticket}
//                   title="Organized Tickets"
//                   text="Keep every customer request in one place."
//                   iconClass="bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20"
//                 />

//                 <SignupFeature
//                   icon={Users}
//                   title="Better Collaboration"
//                   text="Connect customers and support teams seamlessly."
//                   iconClass="bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20"
//                 />

//                 <SignupFeature
//                   icon={Zap}
//                   title="Faster Resolution"
//                   text="Track issues from creation through completion."
//                   iconClass="bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/20"
//                 />
//               </div>

//               <div
//                 className="
//                   min-w-0
//                   rounded-2xl
//                   border
//                   border-white/[0.08]
//                   bg-white/[0.04]
//                   p-4
//                   shadow-2xl
//                   shadow-black/30
//                   backdrop-blur-xl
//                 "
//               >
//                 <div className="flex min-w-0 items-center justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-2.5">
//                     <div
//                       className="
//                         flex
//                         h-9
//                         w-9
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-xl
//                         bg-emerald-400/10
//                         text-emerald-300
//                         ring-1
//                         ring-emerald-400/20
//                       "
//                     >
//                       <Headphones size={17} />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-bold text-white">
//                         Support workflow
//                       </p>

//                       <p className="truncate text-[10px] text-slate-500">
//                         Simple and organized
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
//                     <CheckCircle2 size={11} />
//                     Ready
//                   </div>
//                 </div>

//                 <div className="mt-3 grid grid-cols-4 gap-2">
//                   <WorkflowStep number="01" text="Create" active />
//                   <WorkflowStep number="02" text="Assign" />
//                   <WorkflowStep number="03" text="Resolve" />
//                   <WorkflowStep number="04" text="Close" />
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
//                 <p className="text-[9px] font-medium text-slate-500">
//                   Simple. Organized. Efficient.
//                 </p>

//                 <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-500">
//                   <ShieldCheck size={11} />
//                   Secure platform
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* =========================================================
//    PASSWORD REQUIREMENT
// ========================================================= */

// function PasswordRequirement({ active, text }) {
//   return (
//     <div className="flex min-w-0 items-center gap-1.5">
//       <span
//         className={`
//           flex
//           h-3.5
//           w-3.5
//           shrink-0
//           items-center
//           justify-center
//           rounded-full
//           transition-all
//           ${
//             active
//               ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/50"
//               : "bg-slate-700 text-slate-500"
//           }
//         `}
//       >
//         <Check size={9} strokeWidth={3} />
//       </span>

//       <span
//         className={`
//           truncate
//           text-[9px]
//           font-medium
//           ${active ? "text-emerald-400" : "text-slate-500"}
//         `}
//       >
//         {text}
//       </span>
//     </div>
//   );
// }

// /* =========================================================
//    RIGHT FEATURE
// ========================================================= */

// function SignupFeature({ icon: Icon, title, text, iconClass }) {
//   return (
//     <div
//       className="
//         group
//         min-w-0
//         rounded-xl
//         border
//         border-white/[0.08]
//         bg-white/[0.03]
//         p-3
//         transition-all
//         duration-200
//         hover:border-emerald-400/25
//         hover:bg-white/[0.06]
//         hover:shadow-lg
//         hover:shadow-emerald-500/5
//       "
//     >
//       <div className="flex min-w-0 items-center gap-3">
//         <div
//           className={`
//             flex
//             h-9
//             w-9
//             shrink-0
//             items-center
//             justify-center
//             rounded-xl
//             ${iconClass}
//           `}
//         >
//           <Icon size={16} />
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-center justify-between gap-2">
//             <h3 className="truncate text-xs font-bold text-white">{title}</h3>

//             <Check size={13} className="shrink-0 text-emerald-400" />
//           </div>

//           <p className="mt-0.5 truncate text-[9px] leading-3.5 text-slate-500">
//             {text}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    WORKFLOW STEP
// ========================================================= */

// function WorkflowStep({ number, text, active = false }) {
//   return (
//     <div
//       className={`
//         min-w-0
//         rounded-lg
//         border
//         p-2
//         transition-all
//         ${
//           active
//             ? "border-emerald-400/30 bg-emerald-400/10 shadow-sm shadow-emerald-500/20"
//             : "border-white/[0.06] bg-black/20"
//         }
//       `}
//     >
//       <p
//         className={`
//           text-[8px]
//           font-bold
//           ${active ? "text-emerald-300" : "text-slate-600"}
//         `}
//       >
//         {number}
//       </p>

//       <p
//         className={`
//           mt-0.5
//           truncate
//           text-[10px]
//           font-semibold
//           ${active ? "text-white" : "text-slate-500"}
//         `}
//       >
//         {text}
//       </p>
//     </div>
//   );
// }

// export default Signup;

// // import { Link, useNavigate } from "react-router";

// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";

// // import {
// //   ArrowRight,
// //   Check,
// //   CheckCircle2,
// //   Eye,
// //   EyeOff,
// //   Headphones,
// //   KeyRound,
// //   LockKeyhole,
// //   Mail,
// //   ShieldCheck,
// //   Sparkles,
// //   Ticket,
// //   UserRound,
// //   Users,
// //   Zap,
// // } from "lucide-react";

// // import { useDispatch, useSelector } from "react-redux";
// // import { registerUser } from "../redux/slices/authSlice";

// // /* =========================================================
// //    VALIDATION
// //    DO NOT CHANGE
// // ========================================================= */

// // const signupSchema = z
// //   .object({
// //     name: z
// //       .string()
// //       .min(3, "Name must be at least 3 characters"),

// //     email: z.email("Please enter a valid email address"),

// //     password: z
// //       .string()
// //       .min(8, "Password must be at least 8 characters"),

// //     confirmPassword: z
// //       .string()
// //       .min(8, "Please confirm your password"),
// //   })
// //   .refine((data) => data.password === data.confirmPassword, {
// //     message: "Passwords do not match",
// //     path: ["confirmPassword"],
// //   });

// // /* =========================================================
// //    SIGNUP PAGE
// // ========================================================= */

// // function Signup() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const { loading, error } = useSelector(
// //     (state) => state.auth,
// //   );

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] =
// //     useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: zodResolver(signupSchema),
// //   });

// //   const password = watch("password", "");
// //   const confirmPassword = watch("confirmPassword", "");

// //   /* =========================================================
// //      PASSWORD STRENGTH
// //      DO NOT CHANGE
// //   ========================================================= */

// //   const getPasswordStrength = () => {
// //     if (!password) {
// //       return {
// //         text: "",
// //         width: "w-0",
// //         color: "from-slate-300 to-slate-300",
// //       };
// //     }

// //     if (password.length < 8) {
// //       return {
// //         text: "Weak password",
// //         width: "w-1/3",
// //         color: "from-red-400 to-rose-500",
// //       };
// //     }

// //     if (password.length < 12) {
// //       return {
// //         text: "Good password",
// //         width: "w-2/3",
// //         color: "from-amber-400 to-orange-500",
// //       };
// //     }

// //     return {
// //       text: "Strong password",
// //       width: "w-full",
// //       color: "from-emerald-400 to-teal-500",
// //     };
// //   };

// //   const passwordStrength = getPasswordStrength();

// //   /* =========================================================
// //      PASSWORD CHECKS
// //      VISUAL ONLY
// //   ========================================================= */

// //   const passwordChecks = {
// //     length: password.length >= 8,
// //     strong: password.length >= 12,
// //     match:
// //       password.length > 0 &&
// //       confirmPassword.length > 0 &&
// //       password === confirmPassword,
// //     uppercase: /[A-Z]/.test(password),
// //     number: /[0-9]/.test(password),
// //   };

// //   /* =========================================================
// //      SUBMIT
// //      DO NOT CHANGE API / REDUX LOGIC
// //   ========================================================= */

// //   const onSubmit = async (data) => {
// //     try {
// //       const result = await dispatch(
// //         registerUser({
// //           name: data.name,
// //           email: data.email,
// //           password: data.password,
// //         }),
// //       );

// //       if (registerUser.fulfilled.match(result)) {
// //         console.log("Signup successful");

// //         navigate("/welcome");
// //       }
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //     }
// //   };

// //   return (
// //     <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
// //       {/* =====================================================
// //           BACKGROUND
// //       ====================================================== */}

// //       <div className="pointer-events-none absolute inset-0 overflow-hidden">
// //         {/* Emerald glow top-left */}
// //         <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />

// //         {/* Cyan glow bottom-right */}
// //         <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />

// //         {/* Violet glow center */}
// //         <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

// //         {/* Grid pattern */}
// //         <div
// //           className="absolute inset-0 opacity-[0.025]"
// //           style={{
// //             backgroundImage:
// //               "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
// //             backgroundSize: "42px 42px",
// //           }}
// //         />
// //       </div>

// //       {/* =====================================================
// //           PAGE CONTAINER
// //       ====================================================== */}

// //       <div className="relative flex h-full w-full items-center justify-center p-0 sm:p-3 lg:p-4">
// //         <div
// //           className="
// //             grid
// //             h-full
// //             w-full
// //             max-w-[1280px]
// //             overflow-hidden
// //             border
// //             border-white/10
// //             bg-slate-900/80
// //             shadow-[0_30px_100px_-30px_rgba(16,185,129,0.35)]
// //             backdrop-blur-xl
// //             sm:h-[calc(100dvh-24px)]
// //             sm:max-h-[800px]
// //             sm:rounded-[32px]
// //             lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
// //           "
// //         >
// //           {/* =================================================
// //               LEFT SIDE — FORM
// //           ================================================== */}

// //           <section className="min-h-0 min-w-0 overflow-hidden bg-slate-900">
// //             <div className="flex h-full min-h-0 w-full items-center justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-9 xl:px-11">
// //               <div className="w-full max-w-[460px]">
// //                 {/* =================================================
// //                     BRAND
// //                 ================================================== */}

// //                 <Link
// //                   to="/"
// //                   className="group inline-flex items-center gap-3"
// //                 >
// //                   <div
// //                     className="
// //                       flex
// //                       h-11
// //                       w-11
// //                       shrink-0
// //                       items-center
// //                       justify-center
// //                       rounded-2xl
// //                       bg-gradient-to-br
// //                       from-emerald-500
// //                       to-teal-600
// //                       text-white
// //                       shadow-lg
// //                       shadow-emerald-500/40
// //                       ring-1
// //                       ring-emerald-400/30
// //                       transition
// //                       duration-200
// //                       group-hover:-translate-y-0.5
// //                       group-hover:shadow-xl
// //                       group-hover:shadow-emerald-500/50
// //                     "
// //                   >
// //                     <Ticket size={22} strokeWidth={2.5} />
// //                   </div>

// //                   <div className="min-w-0">
// //                     <h1 className="text-base font-extrabold tracking-tight text-white">
// //                       HelpDesk
// //                     </h1>

// //                     <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
// //                       Support Management
// //                     </p>
// //                   </div>
// //                 </Link>

// //                 {/* =================================================
// //                     HEADING
// //                 ================================================== */}

// //                 <div className="mt-5">
// //                   <div
// //                     className="
// //                       inline-flex
// //                       items-center
// //                       gap-1.5
// //                       rounded-full
// //                       border
// //                       border-emerald-400/30
// //                       bg-emerald-400/10
// //                       px-3
// //                       py-1
// //                       text-[10px]
// //                       font-bold
// //                       uppercase
// //                       tracking-wider
// //                       text-emerald-300
// //                     "
// //                   >
// //                     <Sparkles size={11} />

// //                     Get started free
// //                   </div>

// //                   <h2
// //                     className="
// //                       mt-3
// //                       text-[28px]
// //                       font-black
// //                       leading-[1.05]
// //                       tracking-tight
// //                       text-white
// //                       sm:text-[32px]
// //                       xl:text-[36px]
// //                     "
// //                   >
// //                     Create your

// //                     <span
// //                       className="
// //                         block
// //                         bg-gradient-to-r
// //                         from-emerald-300
// //                         via-teal-300
// //                         to-cyan-300
// //                         bg-clip-text
// //                         text-transparent
// //                       "
// //                     >
// //                       HelpDesk account.
// //                     </span>
// //                   </h2>

// //                   <p className="mt-2 max-w-[420px] text-[12px] leading-5 text-slate-400 sm:text-sm">
// //                     Join your support workspace and start managing
// //                     customer requests in minutes — no setup required.
// //                   </p>
// //                 </div>

// //                 {/* =================================================
// //                     SERVER ERROR
// //                 ================================================== */}

// //                 {error && (
// //                   <div
// //                     className="
// //                       mt-4
// //                       flex
// //                       items-center
// //                       gap-2.5
// //                       rounded-xl
// //                       border
// //                       border-red-500/30
// //                       bg-red-500/10
// //                       px-3
// //                       py-2.5
// //                       backdrop-blur-sm
// //                     "
// //                   >
// //                     <div
// //                       className="
// //                         flex
// //                         h-7
// //                         w-7
// //                         shrink-0
// //                         items-center
// //                         justify-center
// //                         rounded-lg
// //                         bg-red-500/20
// //                         text-xs
// //                         font-bold
// //                         text-red-300
// //                         ring-1
// //                         ring-red-400/20
// //                       "
// //                     >
// //                       !
// //                     </div>

// //                     <div className="min-w-0">
// //                       <p className="text-xs font-bold text-red-200">
// //                         Unable to create account
// //                       </p>

// //                       <p className="truncate text-[10px] text-red-300/80">
// //                         {error}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* =================================================
// //                     FORM
// //                 ================================================== */}

// //                 <form
// //                   onSubmit={handleSubmit(onSubmit)}
// //                   className="mt-4 space-y-3"
// //                 >
// //                   {/* =================================================
// //                       NAME
// //                   ================================================== */}

// //                   <div>
// //                     <label
// //                       htmlFor="name"
// //                       className="mb-1.5 block text-xs font-bold text-slate-300"
// //                     >
// //                       Full name
// //                     </label>

// //                     <div className="relative">
// //                       <UserRound
// //                         size={16}
// //                         className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
// //                           errors.name
// //                             ? "text-red-400"
// //                             : "text-slate-500"
// //                         }`}
// //                       />

// //                       <input
// //                         id="name"
// //                         type="text"
// //                         autoComplete="name"
// //                         placeholder="Enter your full name"
// //                         {...register("name")}
// //                         className={`
// //                           h-11
// //                           w-full
// //                           rounded-xl
// //                           border
// //                           bg-slate-800/60
// //                           pl-10
// //                           pr-3
// //                           text-sm
// //                           font-medium
// //                           text-white
// //                           outline-none
// //                           transition-all
// //                           duration-200
// //                           placeholder:text-slate-500
// //                           backdrop-blur-sm
// //                           ${
// //                             errors.name
// //                               ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/20"
// //                               : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/20"
// //                           }
// //                         `}
// //                       />
// //                     </div>

// //                     {errors.name && (
// //                       <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-red-400">
// //                         {errors.name.message}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* =================================================
// //                       EMAIL
// //                   ================================================== */}

// //                   <div>
// //                     <label
// //                       htmlFor="email"
// //                       className="mb-1.5 block text-xs font-bold text-slate-300"
// //                     >
// //                       Email address
// //                     </label>

// //                     <div className="relative">
// //                       <Mail
// //                         size={16}
// //                         className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
// //                           errors.email
// //                             ? "text-red-400"
// //                             : "text-slate-500"
// //                         }`}
// //                       />

// //                       <input
// //                         id="email"
// //                         type="email"
// //                         autoComplete="email"
// //                         placeholder="you@example.com"
// //                         {...register("email")}
// //                         className={`
// //                           h-11
// //                           w-full
// //                           rounded-xl
// //                           border
// //                           bg-slate-800/60
// //                           pl-10
// //                           pr-3
// //                           text-sm
// //                           font-medium
// //                           text-white
// //                           outline-none
// //                           transition-all
// //                           duration-200
// //                           placeholder:text-slate-500
// //                           backdrop-blur-sm
// //                           ${
// //                             errors.email
// //                               ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/20"
// //                               : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/20"
// //                           }
// //                         `}
// //                       />
// //                     </div>

// //                     {errors.email && (
// //                       <p className="mt-1 text-[10px] font-medium text-red-400">
// //                         {errors.email.message}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* =================================================
// //                       PASSWORD ROW
// //                   ================================================== */}

// //                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
// //                     {/* PASSWORD */}

// //                     <div className="min-w-0">
// //                       <label
// //                         htmlFor="password"
// //                         className="mb-1.5 block text-xs font-bold text-slate-300"
// //                       >
// //                         Password
// //                       </label>

// //                       <div className="relative">
// //                         <LockKeyhole
// //                           size={16}
// //                           className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
// //                             errors.password
// //                               ? "text-red-400"
// //                               : "text-slate-500"
// //                           }`}
// //                         />

// //                         <input
// //                           id="password"
// //                           type={
// //                             showPassword ? "text" : "password"
// //                           }
// //                           autoComplete="new-password"
// //                           placeholder="Create password"
// //                           {...register("password")}
// //                           className={`
// //                             h-11
// //                             w-full
// //                             rounded-xl
// //                             border
// //                             bg-slate-800/60
// //                             pl-10
// //                             pr-10
// //                             text-sm
// //                             font-medium
// //                             text-white
// //                             outline-none
// //                             transition-all
// //                             duration-200
// //                             placeholder:text-slate-500
// //                             backdrop-blur-sm
// //                             ${
// //                               errors.password
// //                                 ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/20"
// //                                 : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/20"
// //                             }
// //                           `}
// //                         />

// //                         <button
// //                           type="button"
// //                           aria-label={
// //                             showPassword
// //                               ? "Hide password"
// //                               : "Show password"
// //                           }
// //                           onClick={() =>
// //                             setShowPassword(!showPassword)
// //                           }
// //                           className="
// //                             absolute
// //                             right-1.5
// //                             top-1/2
// //                             flex
// //                             h-8
// //                             w-8
// //                             -translate-y-1/2
// //                             items-center
// //                             justify-center
// //                             rounded-lg
// //                             text-slate-500
// //                             transition
// //                             hover:bg-slate-700/60
// //                             hover:text-slate-200
// //                           "
// //                         >
// //                           {showPassword ? (
// //                             <EyeOff size={15} />
// //                           ) : (
// //                             <Eye size={15} />
// //                           )}
// //                         </button>
// //                       </div>

// //                       {errors.password && (
// //                         <p className="mt-1 text-[10px] font-medium text-red-400">
// //                           {errors.password.message}
// //                         </p>
// //                       )}
// //                     </div>

// //                     {/* CONFIRM PASSWORD */}

// //                     <div className="min-w-0">
// //                       <label
// //                         htmlFor="confirmPassword"
// //                         className="mb-1.5 block text-xs font-bold text-slate-300"
// //                       >
// //                         Confirm password
// //                       </label>

// //                       <div className="relative">
// //                         <KeyRound
// //                           size={16}
// //                           className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
// //                             errors.confirmPassword
// //                               ? "text-red-400"
// //                               : "text-slate-500"
// //                           }`}
// //                         />

// //                         <input
// //                           id="confirmPassword"
// //                           type={
// //                             showConfirmPassword
// //                               ? "text"
// //                               : "password"
// //                           }
// //                           autoComplete="new-password"
// //                           placeholder="Confirm password"
// //                           {...register("confirmPassword")}
// //                           className={`
// //                             h-11
// //                             w-full
// //                             rounded-xl
// //                             border
// //                             bg-slate-800/60
// //                             pl-10
// //                             pr-10
// //                             text-sm
// //                             font-medium
// //                             text-white
// //                             outline-none
// //                             transition-all
// //                             duration-200
// //                             placeholder:text-slate-500
// //                             backdrop-blur-sm
// //                             ${
// //                               errors.confirmPassword
// //                                 ? "border-red-500/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/20"
// //                                 : "border-slate-700/80 hover:border-slate-600 focus:border-emerald-400 focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/20"
// //                             }
// //                           `}
// //                         />

// //                         <button
// //                           type="button"
// //                           aria-label={
// //                             showConfirmPassword
// //                               ? "Hide password"
// //                               : "Show password"
// //                           }
// //                           onClick={() =>
// //                             setShowConfirmPassword(
// //                               !showConfirmPassword,
// //                             )
// //                           }
// //                           className="
// //                             absolute
// //                             right-1.5
// //                             top-1/2
// //                             flex
// //                             h-8
// //                             w-8
// //                             -translate-y-1/2
// //                             items-center
// //                             justify-center
// //                             rounded-lg
// //                             text-slate-500
// //                             transition
// //                             hover:bg-slate-700/60
// //                             hover:text-slate-200
// //                           "
// //                         >
// //                           {showConfirmPassword ? (
// //                             <EyeOff size={15} />
// //                           ) : (
// //                             <Eye size={15} />
// //                           )}
// //                         </button>
// //                       </div>

// //                       {errors.confirmPassword && (
// //                         <p className="mt-1 text-[10px] font-medium text-red-400">
// //                           {errors.confirmPassword.message}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* =================================================
// //                       PASSWORD STRENGTH + REQUIREMENTS
// //                   ================================================== */}

// //                   {password && (
// //                     <div
// //                       className="
// //                         rounded-xl
// //                         border
// //                         border-slate-700/60
// //                         bg-slate-800/40
// //                         px-3
// //                         py-2.5
// //                         backdrop-blur-sm
// //                       "
// //                     >
// //                       {/* Strength bar */}

// //                       <div className="flex items-center justify-between">
// //                         <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //                           Password strength
// //                         </p>

// //                         <p
// //                           className={`text-[10px] font-bold ${
// //                             password.length < 8
// //                               ? "text-red-400"
// //                               : password.length < 12
// //                                 ? "text-amber-400"
// //                                 : "text-emerald-400"
// //                           }`}
// //                         >
// //                           {passwordStrength.text}
// //                         </p>
// //                       </div>

// //                       <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-700">
// //                         <div
// //                           className={`
// //                             h-full
// //                             rounded-full
// //                             bg-gradient-to-r
// //                             ${passwordStrength.color}
// //                             transition-all
// //                             duration-500
// //                             ${passwordStrength.width}
// //                           `}
// //                         />
// //                       </div>

// //                       {/* Requirements */}

// //                       <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
// //                         <PasswordRequirement
// //                           active={passwordChecks.length}
// //                           text="8+ chars"
// //                         />

// //                         <PasswordRequirement
// //                           active={passwordChecks.strong}
// //                           text="12+ strong"
// //                         />

// //                         <PasswordRequirement
// //                           active={passwordChecks.uppercase}
// //                           text="Uppercase"
// //                         />

// //                         <PasswordRequirement
// //                           active={passwordChecks.match}
// //                           text="Match"
// //                         />
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* =================================================
// //                       TERMS
// //                   ================================================== */}

// //                   <label className="flex cursor-pointer items-start gap-2.5 pt-1">
// //                     <input
// //                       type="checkbox"
// //                       required
// //                       className="
// //                         mt-0.5
// //                         h-4
// //                         w-4
// //                         shrink-0
// //                         cursor-pointer
// //                         appearance-none
// //                         rounded
// //                         border-2
// //                         border-slate-600
// //                         bg-slate-800/60
// //                         transition
// //                         checked:border-emerald-500
// //                         checked:bg-emerald-500
// //                         checked:before:flex
// //                         checked:before:items-center
// //                         checked:before:justify-center
// //                         checked:before:text-[10px]
// //                         checked:before:font-bold
// //                         checked:before:text-white
// //                         checked:before:content-['✓']
// //                         hover:border-emerald-500
// //                         focus:outline-none
// //                         focus:ring-2
// //                         focus:ring-emerald-500/30
// //                       "
// //                     />

// //                     <span className="text-[11px] leading-4 text-slate-400">
// //                       I agree to the HelpDesk{" "}
// //                       <span className="font-semibold text-emerald-400">
// //                         terms of service
// //                       </span>{" "}
// //                       and understand that my account will be created as a
// //                       customer account.
// //                     </span>
// //                   </label>

// //                   {/* =================================================
// //                       SUBMIT
// //                   ================================================== */}

// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="
// //                       group
// //                       flex
// //                       h-11
// //                       w-full
// //                       items-center
// //                       justify-center
// //                       gap-2
// //                       rounded-xl
// //                       bg-gradient-to-r
// //                       from-emerald-500
// //                       to-teal-600
// //                       text-sm
// //                       font-bold
// //                       text-white
// //                       shadow-lg
// //                       shadow-emerald-500/30
// //                       ring-1
// //                       ring-emerald-400/40
// //                       transition-all
// //                       duration-200
// //                       hover:-translate-y-0.5
// //                       hover:from-emerald-400
// //                       hover:to-teal-500
// //                       hover:shadow-xl
// //                       hover:shadow-emerald-500/50
// //                       disabled:cursor-not-allowed
// //                       disabled:translate-y-0
// //                       disabled:opacity-60
// //                     "
// //                   >
// //                     {loading ? (
// //                       <>
// //                         <span className="loading loading-spinner loading-xs" />

// //                         Creating account...
// //                       </>
// //                     ) : (
// //                       <>
// //                         Create Account

// //                         <ArrowRight
// //                           size={16}
// //                           className="transition-transform duration-200 group-hover:translate-x-1"
// //                         />
// //                       </>
// //                     )}
// //                   </button>
// //                 </form>

// //                 {/* =================================================
// //                     LOGIN
// //                 ================================================== */}

// //                 <p className="mt-4 text-center text-xs text-slate-400">
// //                   Already have an account?{" "}
// //                   <Link
// //                     to="/login"
// //                     className="font-bold text-emerald-400 transition hover:text-emerald-300"
// //                   >
// //                     Sign in
// //                   </Link>
// //                 </p>

// //                 {/* =================================================
// //                     SECURITY
// //                 ================================================== */}

// //                 <div className="mt-4 flex items-center gap-3">
// //                   <div className="h-px flex-1 bg-slate-700/60" />

// //                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
// //                     Secure access
// //                   </span>

// //                   <div className="h-px flex-1 bg-slate-700/60" />
// //                 </div>

// //                 <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-500">
// //                   <ShieldCheck
// //                     size={12}
// //                     className="text-emerald-500"
// //                   />

// //                   Protected with role-based access control
// //                 </div>

// //                 <div className="mt-2 text-center">
// //                   <Link
// //                     to="/"
// //                     className="text-[11px] font-semibold text-slate-500 transition hover:text-emerald-400"
// //                   >
// //                     ← Back to homepage
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>

// //           {/* =================================================
// //               RIGHT SIDE — DECORATIVE PANEL
// //           ================================================== */}

// //           <section
// //             className="
// //               relative
// //               hidden
// //               min-h-0
// //               min-w-0
// //               overflow-hidden
// //               bg-[#06141C]
// //               lg:flex
// //               lg:flex-col
// //             "
// //           >
// //             {/* =================================================
// //                 BACKGROUND
// //             ================================================== */}

// //             <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#082028] to-[#043A35]" />

// //             {/* GREEN GLOW */}

// //             <div
// //               className="
// //                 pointer-events-none
// //                 absolute
// //                 -right-32
// //                 -top-32
// //                 h-[450px]
// //                 w-[450px]
// //                 rounded-full
// //                 bg-emerald-400/25
// //                 blur-[110px]
// //               "
// //             />

// //             {/* CYAN GLOW */}

// //             <div
// //               className="
// //                 pointer-events-none
// //                 absolute
// //                 -bottom-40
// //                 -left-32
// //                 h-[420px]
// //                 w-[420px]
// //                 rounded-full
// //                 bg-cyan-400/15
// //                 blur-[110px]
// //               "
// //             />

// //             {/* VIOLET GLOW */}

// //             <div
// //               className="
// //                 pointer-events-none
// //                 absolute
// //                 bottom-1/3
// //                 right-1/4
// //                 h-[280px]
// //                 w-[280px]
// //                 rounded-full
// //                 bg-violet-400/10
// //                 blur-[100px]
// //               "
// //             />

// //             {/* =================================================
// //                 GRID BACKGROUND
// //             ================================================== */}

// //             <div
// //               className="
// //                 pointer-events-none
// //                 absolute
// //                 inset-0
// //                 opacity-[0.04]
// //               "
// //               style={{
// //                 backgroundImage:
// //                   "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
// //                 backgroundSize: "40px 40px",
// //               }}
// //             />

// //             {/* =================================================
// //                 DECORATIVE CIRCLES
// //             ================================================== */}

// //             <div className="pointer-events-none absolute -right-14 top-24 h-72 w-72 rounded-full border border-emerald-400/10" />

// //             <div className="pointer-events-none absolute right-10 top-36 h-52 w-52 rounded-full border border-cyan-400/10" />

// //             <div className="pointer-events-none absolute right-28 top-48 h-24 w-24 rounded-full bg-emerald-400/10" />

// //             {/* =================================================
// //                 RIGHT CONTENT
// //             ================================================== */}

// //             <div
// //               className="
// //                 relative
// //                 z-10
// //                 flex
// //                 h-full
// //                 min-h-0
// //                 min-w-0
// //                 flex-col
// //                 justify-between
// //                 p-8
// //                 xl:p-10
// //               "
// //             >
// //               {/* =================================================
// //                   TOP CONTENT
// //               ================================================== */}

// //               <div className="min-w-0">
// //                 {/* BADGE */}

// //                 <div
// //                   className="
// //                     inline-flex
// //                     items-center
// //                     gap-2
// //                     rounded-full
// //                     border
// //                     border-emerald-400/25
// //                     bg-emerald-400/10
// //                     px-3
// //                     py-1.5
// //                     text-[10px]
// //                     font-bold
// //                     uppercase
// //                     tracking-[0.2em]
// //                     text-emerald-300
// //                     backdrop-blur-sm
// //                   "
// //                 >
// //                   <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />

// //                   Welcome to HelpDesk
// //                 </div>

// //                 {/* HEADING */}

// //                 <h2
// //                   className="
// //                     mt-6
// //                     max-w-[520px]
// //                     text-[38px]
// //                     font-black
// //                     leading-[1.02]
// //                     tracking-[-0.04em]
// //                     text-white
// //                     xl:text-[44px]
// //                   "
// //                 >
// //                   Everything your

// //                   <span
// //                     className="
// //                       block
// //                       bg-gradient-to-r
// //                       from-emerald-300
// //                       via-teal-300
// //                       to-cyan-300
// //                       bg-clip-text
// //                       text-transparent
// //                     "
// //                   >
// //                     support team
// //                   </span>

// //                   needs to succeed.
// //                 </h2>

// //                 <p className="mt-4 max-w-[480px] text-[13px] leading-6 text-slate-400 xl:text-sm">
// //                   Create your account and get a cleaner, smarter way
// //                   to manage customer support — from ticket creation
// //                   all the way to resolution.
// //                 </p>
// //               </div>

// //               {/* =================================================
// //                   FEATURES
// //               ================================================== */}

// //               <div className="my-5 min-w-0 space-y-2.5">
// //                 <SignupFeature
// //                   icon={Ticket}
// //                   title="Organized Tickets"
// //                   text="Keep every customer request in one place."
// //                   iconClass="bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20"
// //                 />

// //                 <SignupFeature
// //                   icon={Users}
// //                   title="Better Collaboration"
// //                   text="Connect customers and support teams seamlessly."
// //                   iconClass="bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20"
// //                 />

// //                 <SignupFeature
// //                   icon={Zap}
// //                   title="Faster Resolution"
// //                   text="Track issues from creation through completion."
// //                   iconClass="bg-violet-400/15 text-violet-300 ring-1 ring-violet-400/20"
// //                 />
// //               </div>

// //               {/* =================================================
// //                   WORKFLOW CARD
// //               ================================================== */}

// //               <div
// //                 className="
// //                   min-w-0
// //                   rounded-2xl
// //                   border
// //                   border-white/[0.08]
// //                   bg-white/[0.04]
// //                   p-4
// //                   shadow-2xl
// //                   shadow-black/30
// //                   backdrop-blur-xl
// //                 "
// //               >
// //                 {/* HEADER */}

// //                 <div className="flex min-w-0 items-center justify-between gap-3">
// //                   <div className="flex min-w-0 items-center gap-2.5">
// //                     <div
// //                       className="
// //                         flex
// //                         h-9
// //                         w-9
// //                         shrink-0
// //                         items-center
// //                         justify-center
// //                         rounded-xl
// //                         bg-emerald-400/10
// //                         text-emerald-300
// //                         ring-1
// //                         ring-emerald-400/20
// //                       "
// //                     >
// //                       <Headphones size={17} />
// //                     </div>

// //                     <div className="min-w-0">
// //                       <p className="truncate text-sm font-bold text-white">
// //                         Support workflow
// //                       </p>

// //                       <p className="truncate text-[10px] text-slate-500">
// //                         Simple and organized
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">
// //                     <CheckCircle2 size={11} />

// //                     Ready
// //                   </div>
// //                 </div>

// //                 {/* WORKFLOW */}

// //                 <div className="mt-3 grid grid-cols-4 gap-2">
// //                   <WorkflowStep
// //                     number="01"
// //                     text="Create"
// //                     active
// //                   />

// //                   <WorkflowStep
// //                     number="02"
// //                     text="Assign"
// //                   />

// //                   <WorkflowStep
// //                     number="03"
// //                     text="Resolve"
// //                   />

// //                   <WorkflowStep
// //                     number="04"
// //                     text="Close"
// //                   />
// //                 </div>
// //               </div>

// //               {/* =================================================
// //                   FOOTER
// //               ================================================== */}

// //               <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
// //                 <p className="text-[9px] font-medium text-slate-500">
// //                   Simple. Organized. Efficient.
// //                 </p>

// //                 <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-500">
// //                   <ShieldCheck size={11} />

// //                   Secure platform
// //                 </div>
// //               </div>
// //             </div>
// //           </section>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// // /* =========================================================
// //    PASSWORD REQUIREMENT
// // ========================================================= */

// // function PasswordRequirement({ active, text }) {
// //   return (
// //     <div className="flex min-w-0 items-center gap-1.5">
// //       <span
// //         className={`
// //           flex
// //           h-3.5
// //           w-3.5
// //           shrink-0
// //           items-center
// //           justify-center
// //           rounded-full
// //           transition-all
// //           ${
// //             active
// //               ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/50"
// //               : "bg-slate-700 text-slate-500"
// //           }
// //         `}
// //       >
// //         <Check size={9} strokeWidth={3} />
// //       </span>

// //       <span
// //         className={`
// //           truncate
// //           text-[9px]
// //           font-medium
// //           ${
// //             active
// //               ? "text-emerald-400"
// //               : "text-slate-500"
// //           }
// //         `}
// //       >
// //         {text}
// //       </span>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    RIGHT FEATURE
// // ========================================================= */

// // function SignupFeature({
// //   icon: Icon,
// //   title,
// //   text,
// //   iconClass,
// // }) {
// //   return (
// //     <div
// //       className="
// //         group
// //         min-w-0
// //         rounded-xl
// //         border
// //         border-white/[0.08]
// //         bg-white/[0.03]
// //         p-3
// //         transition-all
// //         duration-200
// //         hover:border-emerald-400/25
// //         hover:bg-white/[0.06]
// //         hover:shadow-lg
// //         hover:shadow-emerald-500/5
// //       "
// //     >
// //       <div className="flex min-w-0 items-center gap-3">
// //         <div
// //           className={`
// //             flex
// //             h-9
// //             w-9
// //             shrink-0
// //             items-center
// //             justify-center
// //             rounded-xl
// //             ${iconClass}
// //           `}
// //         >
// //           <Icon size={16} />
// //         </div>

// //         <div className="min-w-0 flex-1">
// //           <div className="flex items-center justify-between gap-2">
// //             <h3 className="truncate text-xs font-bold text-white">
// //               {title}
// //             </h3>

// //             <Check
// //               size={13}
// //               className="shrink-0 text-emerald-400"
// //             />
// //           </div>

// //           <p className="mt-0.5 truncate text-[9px] leading-3.5 text-slate-500">
// //             {text}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* =========================================================
// //    WORKFLOW STEP
// // ========================================================= */

// // function WorkflowStep({
// //   number,
// //   text,
// //   active = false,
// // }) {
// //   return (
// //     <div
// //       className={`
// //         min-w-0
// //         rounded-lg
// //         border
// //         p-2        transition-all
// //         ${
// //           active
// //             ? "border-emerald-400/30 bg-emerald-400/10 shadow-sm shadow-emerald-500/20"
// //             : "border-white/[0.06] bg-black/20"
// //         }
// //       `}
// //     >
// //       <p
// //         className={`
// //           text-[8px]
// //           font-bold
// //           ${
// //             active
// //               ? "text-emerald-300"
// //               : "text-slate-600"
// //           }
// //         `}
// //       >
// //         {number}
// //       </p>

// //       <p
// //         className={`
// //           mt-0.5
// //           truncate
// //           text-[10px]
// //           font-semibold
// //           ${
// //             active
// //               ? "text-white"
// //               : "text-slate-500"
// //           }
// //         `}
// //       >
// //         {text}
// //       </p>
// //     </div>
// //   );
// // }

// // export default Signup;
