import { useState, useEffect } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/operation/authOperaton";
import signpBanner from '../assets/images/signupbanner.png';
import { useSelector } from "react-redux";
import { toastHandler } from "../util/toastHandler";
import api from "../lib/axios";
const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user } = useSelector((state) => state.user);
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState({ loading: false, message: "", error: false });

  const handleLogin = async (data) => {
    dispatch(login(data, setIsPending, navigate, from));
  };

  const handleResetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetStatus({ loading: false, message: "Invalid email", error: true });
      return;
    }
    const response = await toastHandler(api.post("/auth/send-otp", { email: resetEmail }), "Sending reset link...", "Reset link sent!", "Something went wrong");
    if (response.status === 200) {
      setResetStatus({ loading: false, message: response.data.message, error: false });
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User is logged in, redirecting to ", from);
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
              Chatter
            </span>
          </div>

          <div className="w-full">
            {showModal ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Reset Password</h2>
                  <p className="text-sm opacity-70">
                    Enter your email to receive a password reset link
                  </p>
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="hello@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>

                {resetStatus.message && (
                  <p className={`text-sm ${resetStatus.error ? "text-error" : "text-success"}`}>
                    {resetStatus.message}
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleResetPassword}
                    disabled={resetStatus.loading}
                  >
                    {resetStatus.loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                  <button className="btn w-full" onClick={() => setShowModal(false)}>Back to Login</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Welcome Back</h2>
                    <p className="text-sm opacity-70">
                      Sign in to your account to continue your language journey
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="form-control w-full space-y-2">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="hello@example.com"
                        className="input input-bordered w-full"
                        {...register("email", { required: "Email is required" })}
                        required
                      />
                      {errors.email && <p className="alert alert-error">{errors.email.message}</p>}
                    </div>

                    <div className="form-control w-full space-y-2">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        {...register("password", { required: "Password is required" })}
                        required
                      />
                      {errors.password && <p className="alert alert-error">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                      {isPending ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p className="text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline">
                          Create one
                        </Link>
                      </p>
                      <p className="text-sm mt-2">
                        Forgot your password?{" "}
                        <button onClick={() => setShowModal(true)} className="text-primary hover:underline">Reset it</button>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={signpBanner} alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default LoginPage;