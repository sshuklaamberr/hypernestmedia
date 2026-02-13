import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl text-center"
      >
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">
          Crafting Digital Products
          <br />
          <span className="text-gray-400">with Precision & Taste</span>
        </h1>

        <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
          HyperNestMedia designs and engineers premium web experiences that
          feel effortless, fast, and future-ready.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button
            className="px-10 py-4 rounded-full bg-white text-black font-medium
                       hover:scale-105 transition"
          >
            Start a Project
          </button>

          <button
            className="px-10 py-4 rounded-full border border-white/20
                       text-white hover:border-white transition"
          >
            View Work
          </button>
        </div>
      </motion.div>
    </main>
  );
}