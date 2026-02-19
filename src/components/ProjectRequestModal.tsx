import { useState } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

interface Props {
  service: string;
  userId: string;
  onClose: () => void;
}

export default function ProjectRequestModal({
  service,
  userId,
  onClose,
}: Props) {

  const db = getFirestore(getApp());

  const [projectName, setProjectName] = useState(service); // ✅ AUTO-FILL
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ WhatsApp Link
  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=Hi,%20I%20want%20to%20start%20${service}%20project`;

  const handleSubmit = async () => {
    if (!projectName || !budget || !timeline) {
      setError("Please fill required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addDoc(collection(db, "projects"), {
        userId,
        service,
        projectName,
        budget,
        timeline,
        description,
        phone,
        status: "Pending",
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
        transition={{ duration: 0.3 }}
        className="relative bg-[#0b0f19] border border-white/10 rounded-3xl p-10 w-full max-w-lg"
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-2">
          Start Your Project
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Service: <span className="text-emerald-400">{service}</span>
        </p>

        {/* FORM */}
        <div className="space-y-4">

          <input
            placeholder="Project Name *"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <input
            placeholder="Budget (₹) *"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <input
            placeholder="Timeline (e.g. 2 weeks) *"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />

          <textarea
            placeholder="Project Description"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Phone Number"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-4 mt-8">

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-full
                       bg-gradient-to-r from-emerald-400 to-teal-400
                       text-black font-medium
                       hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {/* WHATSAPP */}
          <a
            href={whatsappLink}
            target="_blank"
            className="w-full py-3 text-center rounded-full
                       bg-green-500 text-black font-medium
                       hover:bg-green-400 transition"
          >
            Chat on WhatsApp
          </a>

          {/* CANCEL */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
          >
            Cancel
          </button>
        </div>

      </motion.div>
    </div>
  );
}
