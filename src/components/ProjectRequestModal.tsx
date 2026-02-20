import { useState } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

interface Props {
  service: string;
  userId: string;
  price: number; // ✅ Added price prop
  onClose: () => void;
}

export default function ProjectRequestModal({
  service,
  userId,
  price,
  onClose,
}: Props) {
  const db = getFirestore(getApp());

  const [projectName, setProjectName] = useState(service);
  const [budget, setBudget] = useState(price.toString()); // ✅ Pre-fill with package price
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=Hi,%20I%20want%20to%20start%20${service}%20project`;

  const handleSubmit = async () => {
    if (!projectName || !budget || !timeline) {
      setError("Please fill required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Saving to 'projects' collection
      await addDoc(collection(db, "projects"), {
        userId,
        service, // e.g., "E-commerce Store"
        projectName, // User's custom name
        amount: Number(budget), // Store as a number for the history table
        timeline,
        description,
        phone,
        status: "In Progress", // Default status for new orders
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Project submission error:", err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[#0b0f19] border border-white/10 rounded-3xl p-10 w-full max-w-lg"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>
        <h2 className="text-2xl font-semibold mb-2">Start Your Project</h2>
        <p className="text-sm text-gray-400 mb-6">
          Selected: <span className="text-emerald-400 font-medium">{service}</span>
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 mb-1 block">Project Title</label>
            <input
              placeholder="e.g. My Coffee Shop Website"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 mb-1 block">Budget (₹)</label>
              <input
                placeholder="Budget"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1 mb-1 block">Timeline</label>
              <input
                placeholder="e.g. 2 weeks"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />
            </div>
          </div>

          <textarea
            placeholder="Tell us more about your vision..."
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Phone Number (for updates)"
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-4">{error}</p>}

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm & Start Project"}
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            className="w-full py-4 text-center rounded-xl border border-green-500/30 text-green-500 font-medium hover:bg-green-500/5 transition"
          >
            Discuss on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}