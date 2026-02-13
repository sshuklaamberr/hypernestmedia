import { motion } from "framer-motion";

const services = [
  {
    title: "Web Engineering",
    desc: "High-performance, scalable React and modern web applications.",
  },
  {
    title: "UI / UX Design",
    desc: "Minimal, intentional interfaces focused on clarity and usability.",
  },
  {
    title: "SaaS Development",
    desc: "End-to-end SaaS products built for growth and reliability.",
  },
  {
    title: "Optimization",
    desc: "Speed, accessibility, SEO, and performance at scale.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-black px-6 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-semibold mb-12">
          What We Do
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-2xl border border-white/10
                         bg-white/[0.03] hover:bg-white/[0.06]
                         transition"
            >
              <h3 className="text-xl font-medium mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}