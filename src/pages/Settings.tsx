import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Bell,
  Lock,
  Globe,
  LogOut,
  Trash2,
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

// ── Animated Toggle ──
function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none
                  ${enabled ? "bg-emerald-500" : "bg-white/10"}`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-4 h-4 rounded-full shadow-md
                    ${enabled ? "bg-black" : "bg-white/40"}`}
      />
    </button>
  );
}

// ── Section Header ──
function SectionHeader({ icon, label, color = "emerald" }) {
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    blue: "bg-blue-500/10 text-blue-400",
    red: "bg-red-500/10 text-red-400",
  };
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`p-2 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <h3 className="text-base font-semibold text-white tracking-tight">{label}</h3>
    </div>
  );
}

// ── Delete Confirm Modal ──
function DeleteModal({ onCancel, onConfirm }) {
  const [input, setInput] = useState("");
  const canDelete = input === "DELETE";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4
                 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl
                   bg-[#090d0b] border border-red-500/20
                   shadow-[0_30px_80px_rgba(0,0,0,0.7)]
                   p-8 overflow-hidden"
      >
        {/* top accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px]
                        bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <button onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-600
                     hover:text-white hover:bg-white/5 transition">
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-400">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Delete Account</p>
            <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          All your project data, orders, and account information will be permanently erased.
          Type <span className="text-red-400 font-mono font-bold">DELETE</span> to confirm.
        </p>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type DELETE to confirm"
          className="w-full bg-black/60 border border-white/[0.08] rounded-xl
                     px-4 py-3 text-white text-sm placeholder:text-gray-700
                     focus:border-red-500/50 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.2)]
                     outline-none transition-all mb-5 font-mono"
        />

        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/[0.08]
                       text-sm text-gray-400 hover:text-white hover:bg-white/10 transition">
            Cancel
          </button>
          <button
            disabled={!canDelete}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-black text-sm font-bold
                       hover:bg-red-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Delete Forever
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [resetSent, setResetSent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toggles, setToggles] = useState({ notifications: true, billing: true });

  const handlePasswordReset = async () => {
    if (auth.currentUser?.email) {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleDeleteConfirm = async () => {
    // Add delete logic here
    setShowDeleteModal(false);
  };

  const flipToggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        .settings-card {
          transition: border-color 0.3s ease;
        }
        .settings-row {
          transition: background 0.2s ease;
        }
        .settings-row:hover {
          background: rgba(255,255,255,0.015);
        }
      `}</style>

      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-8 pb-20 font-['Sora',sans-serif]"
      >
        {/* ── Page Header ── */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Account Settings</h2>
          <p className="text-gray-600 mt-1.5 text-sm">
            Manage your security, notifications, and portal preferences.
          </p>
        </motion.div>

        {/* ── SECURITY ── */}
        <motion.section variants={itemVariants}>
          <SectionHeader icon={<Shield size={16} />} label="Security & Privacy" color="emerald" />

          <div className="settings-card rounded-2xl overflow-hidden
                          border border-white/[0.06] bg-white/[0.02]
                          shadow-[0_8px_40px_rgba(0,0,0,0.3)]">

            {/* Top accent */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />

            {/* Password Reset Row */}
            <div className="settings-row p-6 flex flex-col md:flex-row items-start md:items-center
                            justify-between gap-5 border-b border-white/[0.04]">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04] text-gray-500 border border-white/[0.06]">
                  <Lock size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Password Recovery</p>
                  <p className="text-xs text-gray-600 mt-0.5 max-w-xs">
                    Send a secure reset link to{" "}
                    <span className="text-gray-500">{auth.currentUser?.email}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handlePasswordReset}
                className={`shrink-0 px-5 py-2 rounded-xl text-xs font-semibold transition-all border
                            ${resetSent
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:text-white"
                            }`}
              >
                {resetSent ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Sent!
                  </span>
                ) : "Send Reset Email"}
              </button>
            </div>

            {/* Device Row */}
            <div className="settings-row p-6 flex flex-col md:flex-row items-start md:items-center
                            justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04] text-gray-500 border border-white/[0.06]">
                  <Smartphone size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Active Session</p>
                  <p className="text-xs text-gray-600 mt-0.5">Currently logged in from this browser.</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest
                               font-bold text-emerald-400 px-3 py-1.5
                               bg-emerald-400/8 border border-emerald-500/15 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Now
              </span>
            </div>
          </div>
        </motion.section>

        {/* ── PREFERENCES ── */}
        <motion.section variants={itemVariants}>
          <SectionHeader icon={<Globe size={16} />} label="Preferences" color="blue" />

          <div className="settings-card rounded-2xl overflow-hidden
                          border border-white/[0.06] bg-white/[0.02]
                          shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

            {[
              {
                key: "notifications",
                icon: <Bell size={16} />,
                title: "Project Notifications",
                desc: "Email updates when your project milestones are reached.",
              },
              {
                key: "billing",
                icon: <CreditCard size={16} />,
                title: "Billing & Currency",
                desc: "Show prices in Indian Rupee (₹) by default.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                className={`settings-row p-6 flex items-center justify-between gap-5
                            ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] text-gray-500 border border-white/[0.06]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5 max-w-xs">{item.desc}</p>
                  </div>
                </div>
                <Toggle
                  enabled={toggles[item.key]}
                  onToggle={() => flipToggle(item.key)}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── DANGER ZONE ── */}
        <motion.section variants={itemVariants}>
          <SectionHeader icon={<Trash2 size={16} />} label="Danger Zone" color="red" />

          <div className="settings-card rounded-2xl overflow-hidden
                          border border-red-500/[0.12] bg-red-500/[0.02]
                          shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

            {/* Logout Row */}
            <div className="settings-row p-6 flex flex-col md:flex-row items-start md:items-center
                            justify-between gap-5 border-b border-white/[0.04]">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04] text-gray-500 border border-white/[0.06]">
                  <LogOut size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Sign Out</p>
                  <p className="text-xs text-gray-600 mt-0.5">End your current session securely.</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 px-5 py-2 rounded-xl text-xs font-semibold
                           bg-white/[0.04] border border-white/[0.08]
                           text-gray-300 hover:bg-white/[0.08] hover:text-white
                           transition-all flex items-center gap-1.5"
              >
                <LogOut size={13} /> Logout
              </button>
            </div>

            {/* Delete Row */}
            <div className="settings-row p-6 flex flex-col md:flex-row items-start md:items-center
                            justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                  <Trash2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Delete Account</p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Permanently erase your account and all project data.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="shrink-0 px-5 py-2 rounded-xl text-xs font-semibold
                           bg-red-500/10 border border-red-500/25 text-red-400
                           hover:bg-red-500 hover:text-black hover:border-red-500
                           transition-all"
              >
                Delete Account
              </button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
}