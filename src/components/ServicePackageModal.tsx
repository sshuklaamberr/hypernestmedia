import { motion } from "framer-motion";

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

export default function ServicePackageModal({
  service,
  onClose,
  onSelectPackage,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-10 w-full max-w-6xl shadow-2xl"
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold tracking-tight">
            {service.name}
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Flexible pricing built for startups & growing businesses
          </p>
        </div>

        {/* PACKAGES */}
        <div className="grid md:grid-cols-3 gap-10">

          {service.packages.map((pkg, index) => {
            const discounted = Math.floor(pkg.price * 0.5);
            const finalPrice = discounted + 50;
            const savings = pkg.price - discounted;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => onSelectPackage(pkg)}
                className={`relative group rounded-3xl p-8 transition-all duration-500
                  backdrop-blur-xl border cursor-pointer
                  ${
                    pkg.popular
                      ? "border-emerald-400/70 bg-white/[0.06] scale-[1.05] shadow-lg shadow-emerald-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-emerald-400/30"
                  }`}
              >

                {/* GLOW */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                                bg-gradient-to-br from-emerald-500/10 to-transparent
                                transition duration-500" />

                {/* POPULAR */}
                {pkg.popular && (
                  <span className="absolute top-5 left-5 text-xs bg-emerald-400 text-black px-3 py-1 rounded-full font-medium shadow">
                    ⭐ Best Value
                  </span>
                )}

                {/* DISCOUNT */}
                <span className="absolute top-5 right-5 text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                  50% OFF
                </span>

                {/* NAME */}
                <h3 className="text-xl font-semibold mb-6">
                  {pkg.name}
                </h3>

                {/* PRICE */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 line-through">
                    ₹{pkg.price}
                  </p>

                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">
                      ₹{finalPrice}
                    </span>
                    <span className="text-sm text-gray-500 mb-1">
                      /one-time
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 mt-1">
                    You save ₹{savings}
                  </p>

                  <p className="text-xs text-gray-500">
                    (₹{discounted} + ₹50 platform fee)
                  </p>
                </div>

                {/* FEATURES */}
                <ul className="text-sm text-gray-400 space-y-3 mb-8">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-emerald-400 text-xs">●</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(pkg);
                  }}
                  className={`w-full py-3 rounded-full font-medium transition-all duration-300
                    ${
                      pkg.popular
                        ? "bg-emerald-400 text-black hover:bg-emerald-300 shadow-lg shadow-emerald-500/20"
                        : "border border-white/20 hover:bg-white hover:text-black"
                    }`}
                >
                  Choose Plan →
                </button>

                {/* UX HINT */}
                <p className="text-[11px] text-gray-500 mt-3 text-center opacity-0 group-hover:opacity-100 transition">
                  Click anywhere to select this plan
                </p>

              </motion.div>
            );
          })}

        </div>
      </motion.div>
    </div>
  );
}
