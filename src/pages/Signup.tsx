import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Techy animated visual
function AnimatedVisual() {
  const codeLines = [
    { text: "const site = await build({", indent: 0, delay: 0.2 },
    { text: "  perf: 'blazing',", indent: 1, delay: 0.4 },
    { text: "  seo: true,", indent: 1, delay: 0.6 },
    { text: "  scale: Infinity,", indent: 1, delay: 0.8 },
    { text: "});", indent: 0, delay: 1.0 },
    { text: "// ✓ Deployed in 4.9s", indent: 0, delay: 1.3 },
  ];

  const nodes = [
    { x: "15%", y: "20%", label: "UI/UX" },
    { x: "72%", y: "15%", label: "API" },
    { x: "80%", y: "55%", label: "CDN" },
    { x: "18%", y: "70%", label: "SEO" },
    { x: "50%", y: "82%", label: "DB" },
  ];

  const metrics = [
    { label: "Performance", value: "99", unit: "/100" },
    { label: "Uptime", value: "99.9", unit: "%" },
    { label: "Load Time", value: "0.8", unit: "s" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dataflow {
          0% { stroke-dashoffset: 200; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }
        @keyframes nodeGlow {
          0%, 100% { box-shadow: 0 0 6px rgba(52,211,153,0.4); }
          50% { box-shadow: 0 0 16px rgba(52,211,153,0.8), 0 0 30px rgba(52,211,153,0.3); }
        }
        .scanline {
          animation: scanline 6s linear infinite;
        }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .node-glow { animation: nodeGlow 2s ease-in-out infinite; }
        .data-line {
          stroke-dasharray: 200;
          animation: dataflow 3s ease-in-out infinite;
        }
        .data-line-2 { animation-delay: 1s; }
        .data-line-3 { animation-delay: 2s; }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
           style={{
             backgroundImage: `linear-gradient(rgba(52,211,153,1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)`,
             backgroundSize: "40px 40px",
           }} />

      {/* Scanline effect */}
      <div className="scanline absolute left-0 right-0 h-[2px]
                      bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent
                      pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[350px] h-[350px] rounded-full bg-emerald-500/8 blur-[100px]" />

      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
        <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="#34d399" strokeWidth="1" className="data-line" />
        <line x1="50%" y1="50%" x2="72%" y2="15%" stroke="#34d399" strokeWidth="1" className="data-line data-line-2" />
        <line x1="50%" y1="50%" x2="80%" y2="55%" stroke="#34d399" strokeWidth="1" className="data-line data-line-3" />
        <line x1="50%" y1="50%" x2="18%" y2="70%" stroke="#34d399" strokeWidth="1" className="data-line" />
        <line x1="50%" y1="50%" x2="50%" y2="82%" stroke="#34d399" strokeWidth="1" className="data-line data-line-2" />
      </svg>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: EASE }}
          style={{ position: "absolute", left: node.x, top: node.y }}
          className="flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="node-glow w-3 h-3 rounded-full bg-emerald-400
                          border border-emerald-300/50" />
          <span className="text-[10px] text-emerald-400/70 font-mono tracking-wider">
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Center: Logo + ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full border border-emerald-400/25
                          flex items-center justify-center
                          shadow-[0_0_40px_rgba(52,211,153,0.15)]">
            <div className="w-16 h-16 rounded-full border border-emerald-400/35
                            flex items-center justify-center bg-emerald-500/5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600
                              flex items-center justify-center
                              shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white" fillOpacity="0.95"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-2 h-2 rounded-full bg-emerald-400
                            shadow-[0_0_8px_rgba(52,211,153,1)]" />
          </motion.div>
          {/* Counter-orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-12px]"
          >
            <div className="absolute bottom-0 right-0
                            w-1.5 h-1.5 rounded-full bg-teal-300/70
                            shadow-[0_0_6px_rgba(94,234,212,0.8)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Terminal / code block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        className="absolute bottom-16 left-6 right-6
                   bg-black/60 border border-white/[0.07] rounded-2xl
                   backdrop-blur-sm overflow-hidden"
      >
        {/* Terminal header */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.05]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-[10px] text-gray-600 font-mono">hypernest ~ deploy</span>
        </div>

        {/* Code lines */}
        <div className="px-4 py-3 space-y-1">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.4, ease: EASE }}
              className="font-mono text-[11px] flex"
            >
              <span className="text-gray-700 mr-3 select-none w-3 text-right shrink-0">
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${line.indent * 12}px` }}
                className={
                  line.text.startsWith("//")
                    ? "text-gray-600"
                    : line.text.includes("const") || line.text.includes("await")
                    ? "text-teal-300"
                    : line.text.includes("true") || line.text.includes("Infinity")
                    ? "text-emerald-400"
                    : "text-gray-400"
                }>
                {line.text}
              </span>
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <div className="font-mono text-[11px] flex">
            <span className="text-gray-700 mr-3 w-3 text-right shrink-0">7</span>
            <span className="text-emerald-400">▋<span className="cursor-blink">|</span></span>
          </div>
        </div>
      </motion.div>

      {/* Metric pills — top right */}
      <div className="absolute top-6 right-6 space-y-2">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: EASE }}
            className="flex items-center justify-between gap-4
                       px-3 py-1.5 rounded-lg
                       bg-white/[0.03] border border-white/[0.06]
                       backdrop-blur-sm"
          >
            <span className="text-[10px] text-gray-600 font-mono">{m.label}</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {m.value}<span className="text-emerald-600 text-[10px]">{m.unit}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") setError("An account already exists with this email.");
      else if (err.code === "auth/invalid-email") setError("Invalid email address.");
      else setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") setError("Sign-in popup was closed.");
      else setError("Google signup failed. Try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050807] text-white flex overflow-hidden">
      <style>{`
        @keyframes slowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.04); }
        }
        .orb-pulse { animation: slowPulse 8s ease-in-out infinite; }

        .input-field {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-field:focus {
          border-color: rgba(52,211,153,0.5);
          box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
          outline: none;
        }

        .cta-btn {
          background: linear-gradient(135deg, #34d399, #0d9488);
          transition: box-shadow 0.3s ease, transform 0.15s ease;
        }
        .cta-btn:hover:not(:disabled) {
          box-shadow: 0 0 30px rgba(52,211,153,0.35), 0 0 60px rgba(52,211,153,0.12);
          transform: scale(1.02);
        }
        .cta-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="orb-pulse absolute top-[-200px] left-[-150px] w-[600px] h-[600px]
                        bg-gradient-to-br from-emerald-500/10 to-transparent
                        rounded-full blur-[180px]" />
        <div className="orb-pulse absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px]
                        bg-gradient-to-tl from-teal-500/8 to-transparent
                        rounded-full blur-[160px]" />
      </div>

      {/* ── LEFT: FORM ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 relative">
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[1px]
                        bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-10">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600
                              flex items-center justify-center
                              shadow-[0_0_16px_rgba(52,211,153,0.3)]
                              group-hover:shadow-[0_0_24px_rgba(52,211,153,0.5)] transition-shadow">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white" fillOpacity="0.95"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">HyperNestMedia</span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Create your account</h1>
            <p className="text-sm text-gray-600 mt-1.5">Access your HyperNestMedia client dashboard.</p>
          </motion.div>

          {/* Google Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full py-3 rounded-xl
                         bg-white/[0.03] border border-white/[0.08]
                         text-sm font-medium text-gray-300
                         flex items-center justify-center gap-3
                         hover:bg-white/[0.07] hover:border-white/[0.15] hover:text-white
                         transition-all duration-200 disabled:opacity-50 mb-6"
            >
              {googleLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-gray-700">or sign up with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>

          {/* Form */}
          <motion.form variants={itemVariants} onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="input-field w-full px-4 py-3 text-sm
                         bg-white/[0.02] border border-white/[0.08] rounded-xl
                         text-white placeholder:text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email address"
              className="input-field w-full px-4 py-3 text-sm
                         bg-white/[0.02] border border-white/[0.08] rounded-xl
                         text-white placeholder:text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                className="input-field w-full px-4 py-3 pr-11 text-sm
                           bg-white/[0.02] border border-white/[0.08] rounded-xl
                           text-white placeholder:text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-600 hover:text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                              bg-red-500/8 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle size={13} className="shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cta-btn w-full py-3 rounded-xl
                         text-sm font-semibold text-black
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Creating account...</> : "Create Account"}
            </button>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-5 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:text-emerald-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT: ANIMATED VISUAL ── */}
      <div className="hidden md:block w-1/2 relative">
        <AnimatedVisual />
      </div>
    </main>
  );
}