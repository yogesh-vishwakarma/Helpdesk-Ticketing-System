import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

import LoginBrand from "../Components/login/LoginBrand";
import LoginHeader from "../Components/login/LoginHeader";
import LoginForm from "../Components/login/LoginForm";
import LoginSidePanel from "../Components/login/LoginSidePanel";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      );

      console.log("Redux login result:", result);
      console.log("User from result:", result.payload);
      console.log(
        "Permissions from result:",
        result.payload?.permissions,
      );

      if (loginUser.fulfilled.match(result)) {
        console.log("Login successful");
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-slate-950">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Emerald glow top-left */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[120px]" />

        {/* Cyan glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />

        {/* Violet glow center */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* MAIN CARD */}
      <div className="relative flex h-full w-full items-center justify-center p-0 sm:p-3 lg:p-4">
        <div
          className="
            grid
            h-full
            w-full
            max-w-[1280px]
            overflow-hidden
            border
            border-white/10
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
                flex
                h-full
                w-full
                items-center
                justify-center
                px-5
                py-5
                sm:px-7
                sm:py-6
                lg:px-9
                xl:px-11
              "
            >
              <div className="w-full max-w-[460px]">
                {/* BRAND */}
                <LoginBrand />

                {/* HEADER */}
                <LoginHeader />

                {/* FORM */}
                <LoginForm
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  onSubmit={onSubmit}
                  loading={loading}
                  error={error}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <LoginSidePanel />
        </div>
      </div>
    </main>
  );
}

export default Login;







