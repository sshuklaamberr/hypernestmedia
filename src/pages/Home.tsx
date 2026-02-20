import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAuth } from "../lib/useAuth";
import { useEffect } from "react";

// Floating orb that follows cursor subtly
function CursorOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)",
      }}
    />
  );
}

// Animated grid lines background
function GridLines() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.035]"
         style={{
           backgroundImage: `
             linear-gradient(rgba(52,211,153,1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)
           `,
           backgroundSize: "80px 80px",
         }}
    />
  );
}

// Marquee ticker
const services = ["Web Design", "E-Commerce", "Branding", "SEO", "Growth Systems", "UI/UX", "Performance"];
function Marquee() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...services, ...services, ...services, ...services].map((s, i) => (
          <span key={i} className="text-xs tracking-[0.3em] text-gray-600 uppercase flex items-center gap-12">
            {s}
            <span className="inline-block w-1 h-1 rounded-full bg-emerald-500/50" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();

  // FIX: cast ease arrays to proper tuple types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(16px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  if (loading) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050807] px-6 text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap');

        .text-glow {
          text-shadow: 0 0 80px rgba(52,211,153,0.4);
        }

        .pill-border {
          position: relative;
        }
        .pill-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(52,211,153,0.4), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .card-hover {
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(52,211,153,0.08);
        }

        @keyframes slowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .orb-pulse { animation: slowPulse 8s ease-in-out infinite; }
        .orb-pulse-2 { animation: slowPulse 11s ease-in-out infinite reverse; }

        .cta-btn {
          background: linear-gradient(135deg, #34d399, #0d9488);
          box-shadow: 0 0 0 0 rgba(52,211,153,0.4);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .cta-btn:hover {
          box-shadow: 0 0 40px rgba(52,211,153,0.35), 0 0 80px rgba(52,211,153,0.15);
          transform: scale(1.03);
        }
        .cta-btn:active { transform: scale(0.97); }
      `}</style>

      {/* Cursor Orb */}
      <CursorOrb />

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb-pulse absolute top-[-300px] left-[-200px] w-[750px] h-[750px]
                        bg-gradient-to-br from-emerald-500/15 via-teal-600/8 to-transparent
                        rounded-full blur-[200px]" />
        <div className="orb-pulse-2 absolute bottom-[-350px] right-[-250px] w-[850px] h-[850px]
                        bg-gradient-to-tl from-teal-500/12 via-emerald-600/6 to-transparent
                        rounded-full blur-[220px]" />
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[600px]
                        -translate-x-1/2 -translate-y-1/2
                        bg-emerald-950/20 blur-[180px] rounded-full" />
        <GridLines />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
             style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      {/* ===== NAV ===== */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-5
                   bg-[#050807]/70 backdrop-blur-xl
                   border-b border-white/[0.06]
                   shadow-[0_4px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(52,211,153,0.05)]"
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600
                          flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)]
                          group-hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-shadow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="text-white text-[15px] font-medium tracking-tight">HyperNestMedia</span>
        </Link>

        <div className="flex items-center">
          {user ? (
            <Link to="/dashboard"
              className="pill-border px-5 py-2 rounded-full text-sm font-medium bg-white/5 text-white backdrop-blur hover:bg-white/10 transition">
              Dashboard →
            </Link>
          ) : (
            <Link to="/login"
              className="pill-border px-5 py-2 rounded-full text-sm font-medium bg-white/5 text-white backdrop-blur hover:bg-white/10 transition">
              Login
            </Link>
          )}
        </div>
      </motion.nav>

      {/* ===== HERO CONTENT ===== */}
      <div className="flex min-h-screen flex-col items-center justify-center pt-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl w-full text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="pill-border inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs text-gray-400 tracking-widest uppercase">Digital Growth Studio</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-[82px] font-semibold tracking-[-0.04em] leading-[0.95] text-white"
          >
            We design and build{" "}
            <span className="italic font-['Playfair_Display',serif] font-normal bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent text-glow">
              high-performance
            </span>{" "}
            websites.
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link to="/dashboard">
                <button className="cta-btn px-9 py-3.5 rounded-full text-[15px] font-medium text-black">
                  Explore Services
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="cta-btn px-9 py-3.5 rounded-full text-[15px] font-medium text-black">
                  Get Started Free
                </button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling ticker */}
      <Marquee />
    </main>
  );
}