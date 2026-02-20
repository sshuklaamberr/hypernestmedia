import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../lib/useAuth";
import {
  Mail,
  Calendar,
  Edit3,
  ShieldCheck,
  Save,
  X,
  Award,
  CircleDot,
  CheckCircle2,
  Package,
  Star,
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const initial = (user?.displayName || user?.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  const joinDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recent";

  const handleUpdateName = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
      });
      setSaved(true);
      setTimeout(() => {
        setIsEditing(false);
        setSaved(false);
      }, 1200);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Project Status",
      value: "Active",
      icon: <Award size={16} />,
      accent: "emerald",
      dot: true,
    },
    {
      label: "Completed Orders",
      value: "0",
      icon: <Package size={16} />,
      accent: "white",
      dot: false,
    },
    {
      label: "Client Level",
      value: "Tier 1",
      icon: <Star size={16} />,
      accent: "white",
      dot: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl space-y-6 pb-16 font-['Sora',sans-serif]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400&display=swap');

        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.3), 0 0 30px rgba(52,211,153,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(52,211,153,0.08), 0 0 50px rgba(52,211,153,0.2); }
        }
        .avatar-ring { animation: ringPulse 4s ease-in-out infinite; }

        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .stat-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }

        .edit-input:focus {
          box-shadow: 0 0 0 2px rgba(52,211,153,0.3);
        }
      `}</style>

      {/* ── HERO CARD ── */}
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02]
                      shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]
                        bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72
                        bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48
                        bg-teal-500/8 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="avatar-ring w-28 h-28 rounded-full
                              bg-gradient-to-br from-emerald-400 to-teal-600
                              p-[2px] rounded-full">
                <div className="w-full h-full rounded-full bg-[#060a08]
                                flex items-center justify-center">
                  <span className="text-5xl font-bold
                                   bg-gradient-to-b from-white to-emerald-300
                                   bg-clip-text text-transparent select-none
                                   font-['Playfair_Display',serif] italic">
                    {initial}
                  </span>
                </div>
              </div>
              {/* Online dot */}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full
                              bg-emerald-400 border-2 border-[#060a08]
                              shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full">
              {/* Name row */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                <h2 className="text-3xl font-semibold text-white tracking-tight">
                  {user?.displayName || "Member"}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                 bg-emerald-500/10 border border-emerald-500/20
                                 text-emerald-400 text-[10px] font-bold tracking-widest uppercase
                                 w-fit mx-auto md:mx-0">
                  <ShieldCheck size={11} /> Verified Client
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-col md:flex-row gap-3 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={14} className="text-emerald-400/40" />
                  {user?.email}
                </span>
                <span className="hidden md:block text-white/10">·</span>
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar size={14} className="text-emerald-400/40" />
                  Member since {joinDate}
                </span>
              </div>

              {/* Edit button */}
              <button
                onClick={() => { setIsEditing(!isEditing); setSaved(false); }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-white/[0.04] hover:bg-white/[0.08]
                           border border-white/[0.08] hover:border-white/[0.15]
                           transition-all duration-200
                           text-sm font-medium text-gray-400 hover:text-white"
              >
                {isEditing ? <><X size={14} /> Cancel</> : <><Edit3 size={14} /> Edit Name</>}
              </button>
            </div>
          </div>

          {/* ── EDIT FORM (inline, smooth) ── */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-end
                                p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex-1 w-full space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold ml-0.5">
                      Display Name
                    </label>
                    <input
                      autoFocus
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdateName()}
                      placeholder="Enter your full name"
                      className="edit-input w-full bg-black/60 border border-white/[0.08]
                                 rounded-xl px-4 py-3 text-white text-sm
                                 placeholder:text-gray-700
                                 focus:border-emerald-400/50 outline-none transition-all"
                    />
                  </div>
                  <button
                    disabled={loading || saved}
                    onClick={handleUpdateName}
                    className={`h-[46px] px-7 rounded-xl font-semibold text-sm
                               flex items-center gap-2 transition-all duration-200 shrink-0
                               ${saved
                                 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                 : "bg-emerald-500 hover:bg-emerald-400 text-black"
                               } disabled:opacity-60`}
                  >
                    {loading ? (
                      <CircleDot className="animate-spin" size={15} />
                    ) : saved ? (
                      <><CheckCircle2 size={15} /> Saved!</>
                    ) : (
                      <><Save size={15} /> Save</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="stat-card relative rounded-2xl p-6
                       bg-white/[0.02] border border-white/[0.05]
                       overflow-hidden"
          >
            {/* subtle top line accent on first card */}
            {i === 0 && (
              <div className="absolute top-0 left-0 right-0 h-[1px]
                              bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
            )}

            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">
                {stat.label}
              </p>
              <span className={stat.accent === "emerald" ? "text-emerald-400/60" : "text-gray-700"}>
                {stat.icon}
              </span>
            </div>

            <div className="flex items-end gap-2">
              <p className={`text-2xl font-bold tracking-tight
                             ${stat.accent === "emerald" ? "text-emerald-400" : "text-white"}`}>
                {stat.value}
              </p>
              {stat.dot && (
                <span className="mb-1 flex items-center gap-1 text-[10px] text-emerald-400/70 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  live
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── SECURITY BADGE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between
                   px-5 py-4 rounded-2xl
                   bg-emerald-500/[0.03] border border-emerald-500/[0.08]"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse
                          shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <p className="text-xs text-gray-600">
            Account secured with Firebase Authentication
          </p>
        </div>
        <p className="text-[10px] font-bold text-emerald-400/40 uppercase tracking-widest hidden sm:block">
          HyperNest Secure
        </p>
      </motion.div>
    </motion.div>
  );
}