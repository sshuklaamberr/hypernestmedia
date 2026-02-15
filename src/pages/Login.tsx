import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  // EMAIL LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("No account exists with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    setError("");
    setInfo("");

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setInfo("Password reset email sent successfully");
    } catch {
      setError("Unable to send reset email");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full">

        {/* LEFT – LOGIN */}
        <div className="flex flex-col justify-center max-w-md">

          <Link
            to="/"
            className="text-xl font-semibold text-emerald-400 mb-10"
          >
            HyperNestMedia
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight">
            Login to HyperNestMedia
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Access your dashboard securely
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-sm
                         bg-[#0f172a] border border-white/10
                         rounded-lg outline-none
                         focus:border-emerald-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-sm
                         bg-[#0f172a] border border-white/10
                         rounded-lg outline-none
                         focus:border-emerald-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
            {info && <p className="text-xs text-emerald-400">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full
                         bg-emerald-500 text-black
                         text-sm font-medium
                         hover:bg-emerald-400 transition
                         disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <button
            onClick={handleForgotPassword}
            className="text-xs text-gray-400 mt-4 hover:text-white"
          >
            Forgot password?
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-full
                       border border-white/15 bg-[#0f172a]
                       text-sm flex items-center justify-center gap-3
                       hover:border-white transition"
          >
            <img src="/google-logo.png" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-emerald-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT – HOME STYLE MESSAGE */}
        <div className="hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            We build high-performance
            <span className="text-emerald-400"> digital experiences.</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            Secure access to your HyperNestMedia dashboard — fast, reliable,
            and built for scale.
          </p>
        </div>

      </div>
    </main>
  );
}