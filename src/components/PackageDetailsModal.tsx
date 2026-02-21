import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, Zap, MessageCircle, Shield,
  Clock, CheckCircle2, Loader2, Lock, CreditCard
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PLATFORM_FEE = 49;
const PHONE = "916389709229";
const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY_ID"; // 🔑 Replace with your key

declare global {
  interface Window { Razorpay: any; }
}

interface Package {
  name: string;
  price: number;       // already 75% discounted (from Dashboard calculatePrice)
  features: string[];
  originalPrice: number;
}

interface Props {
  pkg: Package;
  serviceName: string;
  onClose: () => void;
  onContinue: () => void;
}

export default function PackageDetailsModal({ pkg, serviceName, onClose, onContinue }: Props) {
  const [step, setStep] = useState<"details" | "form" | "success">("details");
  const [payLoading, setPayLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", brief: "" });

  // ── Pricing breakdown ──
  const basePrice = pkg.price;                                             // 75% off price
  const originalPrice = pkg.originalPrice; // full original price from ServicePackageModal
  const totalPrice = basePrice + PLATFORM_FEE;                             // base + ₹49
  const savings = originalPrice - basePrice;

  const whatsappMsg = `Hello HyperNestMedia 👋\n\nI'm interested in:\n🔹 Service: ${serviceName}\n🔹 Package: ${pkg.name}\n💰 Base: ₹${basePrice.toLocaleString()} + ₹${PLATFORM_FEE} fee\n💳 Total: ₹${totalPrice.toLocaleString()}\n\nPlease share next steps. Thank you!`;
  const whatsappLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMsg)}`;

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpay = async () => {
    if (!form.name || !form.phone) return;
    setPayLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Payment gateway failed to load. Please try WhatsApp instead.");
      setPayLoading(false);
      return;
    }
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: totalPrice * 100,
      currency: "INR",
      name: "HyperNestMedia",
      description: `${serviceName} — ${pkg.name}`,
      image: "/favicon.ico",
      prefill: { name: form.name, contact: form.phone },
      theme: { color: "#34d399" },
      handler: () => {
        setPayLoading(false);
        setStep("success");
        onContinue();
      },
      modal: { ondismiss: () => setPayLoading(false) },
    });
    rzp.open();
    setPayLoading(false);
  };

  const benefits = [
    { icon: <Shield size={14} />, text: "Free discovery call included" },
    { icon: <Clock size={14} />, text: "On-time delivery guaranteed" },
    { icon: <Check size={14} />, text: "Revisions until you're satisfied" },
    { icon: <Zap size={14} />, text: "Priority support during build" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="payment-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#050807] text-white overflow-y-auto"
      >
        <style>{`
          @keyframes slowPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
          .orb { animation: slowPulse 8s ease-in-out infinite; }
          .pay-btn {
            background: linear-gradient(135deg, #34d399, #0d9488);
            transition: box-shadow 0.3s ease, transform 0.15s ease;
          }
          .pay-btn:hover:not(:disabled) {
            box-shadow: 0 0 30px rgba(52,211,153,0.4), 0 0 60px rgba(52,211,153,0.15);
            transform: scale(1.015);
          }
          .pay-btn:active:not(:disabled) { transform: scale(0.985); }
          .input-field { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
          .input-field:focus {
            border-color: rgba(52,211,153,0.5);
            box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
            outline: none;
          }
        `}</style>

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="orb absolute top-[-200px] left-[-150px] w-[600px] h-[600px]
                          bg-emerald-500/8 rounded-full blur-[180px]" />
          <div className="orb absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px]
                          bg-teal-500/6 rounded-full blur-[160px]" />
          <div className="absolute inset-0 opacity-[0.025]"
               style={{
                 backgroundImage: `linear-gradient(rgba(52,211,153,1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)`,
                 backgroundSize: "60px 60px",
               }} />
        </div>

        {/* ── NAVBAR ── */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4
                        bg-[#050807]/80 backdrop-blur-xl border-b border-white/[0.05]">
          <button
            onClick={step === "form" ? () => setStep("details") : onClose}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            {step === "form" ? "Back" : "Back to Services"}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600
                            flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white" fillOpacity="0.95"/>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">HyperNestMedia</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Lock size={12} /> Secure checkout
          </div>
        </div>

        {/* ── STEP 1: DETAILS ── */}
        {step === "details" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-emerald-400/8 border border-emerald-500/20 mb-4">
                <Zap size={11} className="text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  75% Off — Grand Launch
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">{serviceName}</h1>
              <p className="text-gray-600 mt-1.5">{pkg.name} Package</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* LEFT: Features + Benefits */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-5">
                    What's included
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full
                                         bg-emerald-400/15 text-emerald-400
                                         flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="text-sm text-gray-400">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-5">
                    Why HyperNest
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.07]
                                         flex items-center justify-center text-emerald-400 shrink-0">
                          {b.icon}
                        </span>
                        <span className="text-sm text-gray-400">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/15
                                flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-400 mb-1">Limited Slots Available</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Grand launch pricing ends soon. Lock in your 75% discount before slots fill up. Only a handful of client spots remain at this price.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: Price summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                                  shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                    <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl
                                    bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

                    <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-5">
                      Price Summary
                    </p>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{pkg.name} Package</span>
                        <span className="text-sm text-white font-medium">₹{basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-700">Original price</span>
                        <span className="text-gray-700 line-through">₹{originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-emerald-600">75% discount</span>
                        <span className="text-emerald-500">−₹{savings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Platform fee</span>
                        <span className="text-gray-400">+₹{PLATFORM_FEE}</span>
                      </div>
                    </div>

                    <div className="h-px bg-white/[0.06] mb-4" />

                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-emerald-300 tracking-tight">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setStep("form")}
                      className="pay-btn w-full py-3.5 rounded-xl text-sm font-bold text-black
                                 flex items-center justify-center gap-2 mb-3"
                    >
                      <CreditCard size={15} /> Pay ₹{totalPrice.toLocaleString()} Now
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl text-sm font-semibold
                                 bg-white/[0.03] border border-white/[0.08] text-gray-400
                                 flex items-center justify-center gap-2
                                 hover:bg-white/[0.07] hover:text-white transition-all"
                    >
                      <MessageCircle size={14} /> Chat on WhatsApp
                    </a>

                    <p className="text-center text-[10px] text-gray-700 mt-3">
                      Secured by Razorpay · UPI · Cards · Net Banking
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {["No hidden fees", "Instant confirm", "Safe checkout"].map((t) => (
                      <div key={t} className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <p className="text-[10px] text-gray-600 leading-tight">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: ORDER FORM ── */}
        {step === "form" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-5xl mx-auto px-6 py-12"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">Complete your order</h1>
              <p className="text-sm text-gray-600 mt-1">{serviceName} — {pkg.name} Package</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-5">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-5">
                    Your Details
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-600 uppercase tracking-widest font-semibold block mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-field w-full px-4 py-3 text-sm
                                   bg-white/[0.02] border border-white/[0.08] rounded-xl
                                   text-white placeholder:text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 uppercase tracking-widest font-semibold block mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-field w-full px-4 py-3 text-sm
                                   bg-white/[0.02] border border-white/[0.08] rounded-xl
                                   text-white placeholder:text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 uppercase tracking-widest font-semibold block mb-2">
                        Project Brief{" "}
                        <span className="text-gray-700 normal-case tracking-normal font-normal">(optional)</span>
                      </label>
                      <textarea
                        placeholder="Briefly describe your project goals, timeline, or any specific requirements..."
                        value={form.brief}
                        onChange={(e) => setForm({ ...form, brief: e.target.value })}
                        rows={4}
                        className="input-field w-full px-4 py-3 text-sm
                                   bg-white/[0.02] border border-white/[0.08] rounded-xl
                                   text-white placeholder:text-gray-700 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRazorpay}
                  disabled={payLoading || !form.name || !form.phone}
                  className="pay-btn w-full py-4 rounded-xl text-base font-bold text-black
                             disabled:opacity-40 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {payLoading
                    ? <><Loader2 size={16} className="animate-spin" /> Opening Razorpay...</>
                    : <><Lock size={15} /> Pay ₹{totalPrice.toLocaleString()} Securely</>
                  }
                </button>
                <p className="text-center text-xs text-gray-700">
                  UPI · Credit/Debit Cards · Net Banking · Wallets
                </p>
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">
                    Order Summary
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{pkg.name} Package</span>
                      <span className="text-white">₹{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Original price</span>
                      <span className="text-gray-700 line-through">₹{originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-600">75% discount</span>
                      <span className="text-emerald-500">−₹{savings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Platform fee</span>
                      <span className="text-gray-400">+₹{PLATFORM_FEE}</span>
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-emerald-300 text-lg">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: SUCCESS ── */}
        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6 py-12"
          >
            <div className="w-full max-w-lg text-center">
              <div className="relative mx-auto w-24 h-24 mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-400/30
                                flex items-center justify-center
                                shadow-[0_0_60px_rgba(52,211,153,0.25)]">
                  <CheckCircle2 size={44} className="text-emerald-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-400/5 blur-2xl" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white mb-3">
                Payment Successful!
              </h1>
              <p className="text-gray-500 leading-relaxed mb-2 max-w-sm mx-auto">
                Your order for <span className="text-white font-medium">{serviceName} — {pkg.name}</span> has been confirmed.
              </p>
              <p className="text-sm text-gray-700 mb-10">
                Our team will reach out within 24 hours to kick things off.
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6 text-left space-y-3">
                {[
                  { label: "Service", value: serviceName },
                  { label: "Package", value: pkg.name },
                  { label: "Base price", value: `₹${basePrice.toLocaleString()}` },
                  { label: "Platform fee", value: `₹${PLATFORM_FEE}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="text-white">{row.value}</span>
                  </div>
                ))}
                <div className="h-px bg-white/[0.06]" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-white">Amount Paid</span>
                  <span className="text-lg font-bold text-emerald-400">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl text-sm font-semibold
                             bg-white/[0.03] border border-white/[0.08] text-gray-300
                             flex items-center justify-center gap-2
                             hover:bg-white/[0.07] hover:text-white transition-all"
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
                <button
                  onClick={onClose}
                  className="pay-btn flex-1 py-3 rounded-xl text-sm font-bold text-black"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}