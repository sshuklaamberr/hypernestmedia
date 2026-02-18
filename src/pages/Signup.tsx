import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists with this email");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch {
      setError("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full">

        {/* LEFT — FORM */}
        <div className="flex flex-col justify-center max-w-md">

          <Link
            to="/"
            className="text-lg font-semibold tracking-tight mb-10"
          >
            HyperNestMedia
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Access your HyperNestMedia dashboard
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 text-sm
                         bg-[#0f172a] border border-white/10
                         rounded-lg outline-none
                         focus:border-white transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-sm
                         bg-[#0f172a] border border-white/10
                         rounded-lg outline-none
                         focus:border-white transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password (min 6 chars)"
              className="w-full px-4 py-3 text-sm
                         bg-[#0f172a] border border-white/10
                         rounded-lg outline-none
                         focus:border-white transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full
                         bg-white text-black
                         text-sm font-medium
                         hover:bg-gray-200 transition
                         disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full py-3 rounded-full
                       border border-white/20 bg-[#0f172a]
                       text-sm flex items-center justify-center gap-3
                       hover:border-white transition"
          >
            <img src="/google-logo.svg" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT — BRAND MESSAGE / IMAGE */}
        <div className="hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            High-performance
            <span className="text-gray-400"> digital products.</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            Secure access, clean workflows, and infrastructure built for scale.
          </p>
        </div>

      </div>
    </main>
  );
}