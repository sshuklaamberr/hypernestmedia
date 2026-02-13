import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="min-h-screen bg-black px-6 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        <h1 className="text-5xl font-semibold mb-8">
          Let’s Talk
        </h1>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-5 py-4 rounded-xl
                       bg-white/5 border border-white/10
                       focus:outline-none focus:border-white/30"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-4 rounded-xl
                       bg-white/5 border border-white/10
                       focus:outline-none focus:border-white/30"
          />

          <textarea
            placeholder="Tell us about your project"
            rows={4}
            className="w-full px-5 py-4 rounded-xl
                       bg-white/5 border border-white/10
                       focus:outline-none focus:border-white/30"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-full
                       bg-white text-black font-medium
                       hover:scale-[1.02] transition"
          >
            Send message
          </button>
        </form>
      </motion.div>
    </main>
  );
}