import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-black px-6 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-semibold mb-8">
          About HyperNestMedia
        </h1>

        <p className="text-xl text-gray-400 leading-relaxed">
          HyperNestMedia is a technology-focused digital agency.
          We believe great software should feel invisible — fast,
          intuitive, and carefully engineered.
        </p>

        <p className="mt-6 text-gray-400 leading-relaxed">
          Our work sits at the intersection of engineering,
          design, and long-term thinking. We don’t chase trends.
          We build products that last.
        </p>
      </motion.div>
    </main>
  );
}