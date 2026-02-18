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
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN (UPGRADED SAFELY)
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google Login Success:", result.user);

      navigate("/dashboard");

    } catch (err: any) {
      console.error("Google Login Error:", err);

      if (err.code === "auth/operation-not-allowed") {
        setError("Google sign-in is not enabled in Firebase.");
      } 
      else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase.");
      } 
      else if (err.code === "auth/popup-closed-by-user") {
        setError("Google popup was closed before completing sign-in.");
      } 
      else if (err.code === "auth/network-request-failed") {
        setError("Network error. Check Firebase configuration.");
      } 
      else {
        setError(err.message || "Google login failed.");
      }
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
    } catch (err: any) {
      setError(err.message || "Unable to send reset email");
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">

      {/* Ambient glow – matches Home */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 w-[720px] h-[720px]
                     -translate-x-1/2 -translate-y-1/2
                     rounded-full bg-white/5 blur-[140px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full">

        {/* LEFT – LOGIN FORM */}
        <div className="flex flex-col justify-center max-w-md">

          <Link
            to="/"
            className="text-lg font-semibold tracking-tight mb-10"
          >
            HyperNestMedia
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Secure access to your dashboard
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-sm
                         bg-black border border-white/15
                         rounded-lg outline-none
                         focus:border-white transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-sm
                         bg-black border border-white/15
                         rounded-lg outline-none
                         focus:border-white transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-xs text-red-500">{error}</p>}
            {info && <p className="text-xs text-gray-300">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full
                         bg-white text-black
                         text-sm font-medium
                         hover:shadow-lg hover:shadow-white/20
                         transition
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
                       border border-white/20 bg-black
                       text-sm flex items-center justify-center gap-3
                       hover:bg-white hover:text-black transition"
          >
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-white underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/login-visual.jpg"
            alt="Digital agency visual"
            className="max-w-md rounded-2xl opacity-90"
          />
        </div>

      </div>
    </main>
  );
}
