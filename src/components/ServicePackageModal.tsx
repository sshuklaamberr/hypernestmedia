import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Star } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Package {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

interface Service {
  name: string;
  packages: Package[];
}

interface Props {
  service: Service;
  onClose: () => void;
  onSelectPackage: (pkg: Package) => void;
}

export default function ServicePackageModal({ service, onClose, onSelectPackage }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8
                   bg-black/75 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden
                     bg-[#070b09] border border-white/[0.07]
                     shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >
          <style>{`
            .pkg-card {
              transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                          border-color 0.25s ease,
                          box-shadow 0.35s ease;
            }
            .pkg-card:hover {
              transform: translateY(-6px);
            }
            .pkg-card-popular {
              transform: translateY(-4px);
            }
            .pkg-card-popular:hover {
              transform: translateY(-10px);
            }
            .choose-btn {
              transition: all 0.25s ease;
            }
            .choose-btn-primary {
              background: linear-gradient(135deg, #34d399, #0d9488);
            }
            .choose-btn-primary:hover {
              box-shadow: 0 0 24px rgba(52,211,153,0.4), 0 0 48px rgba(52,211,153,0.15);
              transform: scale(1.02);
            }
            .choose-btn-secondary:hover {
              background: rgba(255,255,255,0.07);
              border-color: rgba(52,211,153,0.3);
              color: white;
            }
          `}</style>

          {/* Top accent line */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Header */}
          <div className="relative px-10 pt-10 pb-8 border-b border-white/[0.05]">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px]
                            bg-emerald-500/6 blur-[60px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl
                         text-gray-600 hover:text-white hover:bg-white/5
                         transition-all duration-200"
            >
              <X size={16} />
            </button>

            <div className="relative text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {service.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1.5">
                Choose the package that fits your goals.
              </p>
            </div>
          </div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-5 p-8"
          >
            {service.packages.map((pkg, index) => {
              const displayPrice = pkg.price + 49;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  onClick={() => onSelectPackage(pkg)}
                  className={`pkg-card relative rounded-2xl p-8 cursor-pointer overflow-hidden min-h-[500px] flex flex-col
                              border
                              ${pkg.popular
                                ? "pkg-card-popular border-emerald-400/40 bg-emerald-500/[0.04] shadow-[0_0_40px_rgba(52,211,153,0.08)]"
                                : "border-white/[0.07] bg-white/[0.02] hover:border-emerald-400/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                              }`}
                >
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px]
                    ${pkg.popular
                      ? "bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                      : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    }`} />

                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                                       bg-emerald-400 text-black text-[10px] font-black uppercase tracking-widest">
                        <Star size={9} fill="black" /> Best Value
                      </span>
                    </div>
                  )}

                  {/* Package name */}
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
                    {pkg.name}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className={`text-4xl font-bold tracking-tight
                        ${pkg.popular ? "text-emerald-300" : "text-white"}`}>
                        ₹{displayPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-700">Incl. ₹49 platform fee</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05] mb-5" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                          ${pkg.popular
                            ? "bg-emerald-400/15 text-emerald-400"
                            : "bg-white/5 text-gray-500"}`}>
                          <Check size={10} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectPackage(pkg); }}
                    className={`choose-btn w-full py-2.5 rounded-xl text-sm font-semibold
                      ${pkg.popular
                        ? "choose-btn-primary text-black"
                        : "choose-btn-secondary border border-white/[0.1] text-gray-400"
                      }`}
                  >
                    {pkg.popular ? "Get Started →" : "Choose Plan →"}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-gray-700">
              All plans include a free consultation call · Secure checkout · No hidden fees
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}