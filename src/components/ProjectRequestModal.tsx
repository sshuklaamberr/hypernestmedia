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
  // ✅ Initialize Firestore using existing app (no firebase.ts changes needed)
  const db = getFirestore(getApp());

  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0f172a] border border-white/10 rounded-3xl p-10 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">
          Request: {service}
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Project Name *"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <input
            placeholder="Budget Range *"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <input
            placeholder="Expected Timeline *"
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
            placeholder="Contact Number"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-500 text-black px-6 py-2 rounded-full hover:bg-emerald-400 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
