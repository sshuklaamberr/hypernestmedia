import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../lib/useAuth";

export default function Home() {
  const { user, loading } = useAuth();

  // ✅ Prevent flicker on refresh
  if (loading) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0 aurora-layer">
          <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px]
                          bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-transparent
                          rounded-full blur-[200px]" />

          <div className="absolute bottom-[-300px] right-[-300px] w-[800px] h-[800px]
                          bg-gradient-to-br from-teal-500/20 via-emerald-400/10 to-transparent
                          rounded-full blur-[220px]" />
        </div>

        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-white/5 blur-[240px]" />

        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </div>

      {/* ✅ FIXED LOGO */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="text-white text-lg font-semibold tracking-tight"
        >
          HyperNestMedia
        </Link>
      </div>

      {/* AUTH BUTTON */}
      <div className="absolute top-6 right-6 z-20">
        {user ? (
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-full
                       text-sm font-medium
                       bg-white/10 text-white
                       border border-white/20
                       backdrop-blur
                       hover:bg-white/20 transition"
          >
            Explore Services
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 rounded-full
                       text-sm font-medium
                       border border-white/20
                       hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl text-center"
        >
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            Digital Growth Studio
          </p>

          <h1 className="mt-6 text-6xl md:text-7xl font-semibold tracking-tight leading-tight">
            We design and build{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              high-performance
            </span>{" "}
            digital experiences.
          </h1>

          <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
            Websites, e-commerce, branding, and growth systems —
            everything your business needs to scale.
          </p>

          {/* CTA */}
          <div className="mt-14">
            {user ? (
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-4 rounded-full bg-white text-black font-medium"
                >
                  Explore Services
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-4 rounded-full border border-white/20"
                >
                  Get Started
                </motion.button>
              </Link>
            )}
          </div>

        </motion.div>
      </div>
    </main>
  );
}
