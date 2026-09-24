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
