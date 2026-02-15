import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../lib/firebase";


export default function Home() {
  const user = auth.currentUser;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6">

      {/* Brand – top left */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="text-white text-lg font-semibold tracking-tight"
        >
          HyperNestMedia
        </Link>
      </div>

      {/* Login / Dashboard – top right */}
      <div className="absolute top-6 right-6 z-20">
        {user ? (
          <Link
            to="/dashboard"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 w-[720px] h-[720px]
                     -translate-x-1/2 -translate-y-1/2
                     rounded-full bg-white/5 blur-[140px]"
        />
      </div>

      {/* Center content */}
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm tracking-widest text-gray-500 uppercase"
          >
            Website Design & Development
          </motion.p>

          {/* Headline */}
          <h1 className="mt-6 text-6xl md:text-7xl font-semibold tracking-tight leading-tight text-white">
            We design and build
            <br />
            <span className="text-gray-400">
              high-performance websites.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Modern, fast, and conversion-focused websites
            for startups and growing businesses.
          </p>

          {/* CTA buttons */}
          <div className="mt-14 flex justify-center gap-6">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full bg-white text-black
                           font-medium shadow-lg shadow-white/10"
              >
                Start a Project
              </motion.button>
            </Link>

            <Link to="/work">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full border border-white/20
                           text-white hover:border-white transition"
              >
                View Work
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}