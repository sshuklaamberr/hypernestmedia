import { motion } from "framer-motion";

interface Package {
  name: string;
  price: number;
  features: string[];
}

interface Props {
  pkg: Package;
  serviceName: string;
  onClose: () => void;
  onContinue: () => void;
}

export default function PackageDetailsModal({
  pkg,
  serviceName,
  onClose,
  onContinue,
}: Props) {
  const discounted = Math.floor(pkg.price * 0.5);
  const finalPrice = discounted + 50;

  const phoneNumber = "916389709229";

  // 🔥 SMART BENEFITS BASED ON SERVICE
  const getBenefits = () => {
    if (serviceName.toLowerCase().includes("website"))
      return [
        "⚡ Fast loading website",
        "📱 Mobile responsive design",
        "🔍 SEO optimized structure",
        "🎯 Conversion-focused layout",
        "🛠 Easy future scalability",
      ];

    if (serviceName.toLowerCase().includes("seo"))
      return [
        "📈 Higher Google rankings",
        "🔍 Keyword optimization",
        "🚀 Organic traffic growth",
        "📊 Analytics tracking",
        "💡 Strategy guidance",
      ];

    if (serviceName.toLowerCase().includes("social"))
      return [
        "📲 Content strategy",
        "🔥 Reels & engagement growth",
        "📊 Insights tracking",
        "🎯 Target audience reach",
        "💡 Brand positioning",
      ];

    return [
      "⚡ Fast delivery",
      "📱 Fully responsive",
      "🚀 High performance",
      "🔒 Secure & scalable",
      "💬 Free support",
    ];
  };

  // ✅ PROFESSIONAL WHATSAPP MESSAGE
  const message = `
Hello HyperNestMedia 👋

I am interested in your service:

🔹 Service: ${serviceName}
🔹 Package: ${pkg.name}
💰 Final Price: ₹${finalPrice}

Please share complete details and next steps.

Thank you!
`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#0b0f19] border border-white/10 rounded-3xl p-10 w-full max-w-2xl shadow-2xl"
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-semibold mb-2">
          {serviceName}
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          {pkg.name} Package
        </p>

        {/* PRICE */}
        <div className="mb-8">
          <p className="text-gray-500 line-through text-sm">
            ₹{pkg.price}
          </p>

          <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ₹{finalPrice}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            (50% OFF + ₹50 platform fee)
          </p>

          {/* 🔥 URGENCY */}
          <p className="text-xs text-emerald-400 mt-2">
            🔥 Limited time offer
          </p>
        </div>

        {/* FEATURES */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">
            What you get
          </h3>

          <ul className="space-y-2 text-gray-300">
            {pkg.features.map((f, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400">✔</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* BENEFITS */}
        <div className="mb-10">
          <h3 className="text-lg font-medium mb-3">
            Why choose us
          </h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            {getBenefits().map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* WHATSAPP */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 rounded-full
                       bg-green-500 text-black font-medium
                       hover:bg-green-400 transition"
          >
            Chat on WhatsApp
          </a>

          {/* CONTINUE */}
          <button
            onClick={onContinue}
            className="flex-1 py-3 rounded-full
                       bg-gradient-to-r from-emerald-400 to-teal-400
                       text-black font-medium
                       hover:opacity-90 transition"
          >
            Continue →
          </button>
        </div>

      </motion.div>
    </div>
  );
}
