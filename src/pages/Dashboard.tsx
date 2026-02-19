import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/useAuth";

import ProjectRequestModal from "../components/ProjectRequestModal";
import ServicePackageModal from "../components/ServicePackageModal";
import PackageDetailsModal from "../components/PackageDetailsModal";

import {
  LayoutDashboard,
  Folder,
  Clock,
  User,
  Settings,
  LogOut,
  Globe,
  ShoppingCart,
  Rocket,
  Code,
  RefreshCw,
  Briefcase,
  Instagram,
  Megaphone,
  Palette,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [active, setActive] = useState("services");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [detailsPackage, setDetailsPackage] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  if (loading) return null;

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // 🔥 FINAL SERVICES (ENHANCED)
  const categories = [
    {
      title: "Web Development",
      services: [
        {
          icon: <Globe size={20} />,
          name: "Portfolio Website",
          desc: "Personal portfolio for students & creators",
          delivery: "2–4 Weeks",
          highlight: "Best for students",
          packages: [
            { name: "Starter", price: 3000, features: ["1 Page", "Responsive"] },
            { name: "Standard", price: 6000, popular: true, features: ["3 Pages", "Modern UI", "Contact Form"] },
            { name: "Premium", price: 10000, features: ["5+ Pages", "SEO Ready", "Animations"] },
          ],
        },
        {
          icon: <Briefcase size={20} />,
          name: "Business Website",
          desc: "Professional website for companies",
          delivery: "3–5 Weeks",
          highlight: "For startups",
          packages: [
            { name: "Starter", price: 8000, features: ["3 Pages"] },
            { name: "Standard", price: 15000, popular: true, features: ["5 Pages", "Forms"] },
            { name: "Premium", price: 25000, features: ["Full Website", "SEO"] },
          ],
        },
        {
          icon: <ShoppingCart size={20} />,
          name: "E-commerce Store",
          desc: "Online store with payment integration",
          delivery: "3–6 Weeks",
          highlight: "Sell online",
          packages: [
            { name: "Starter", price: 15000, features: ["Basic Store"] },
            { name: "Standard", price: 25000, popular: true, features: ["Payments + Admin"] },
            { name: "Premium", price: 40000, features: ["Advanced Store"] },
          ],
        },
        {
          icon: <Rocket size={20} />,
          name: "Startup Landing Page",
          desc: "High converting landing page",
          delivery: "1–2 Weeks",
          highlight: "Conversion focused",
          packages: [
            { name: "Starter", price: 5000, features: ["Single Page"] },
            { name: "Standard", price: 9000, popular: true, features: ["Animations"] },
            { name: "Premium", price: 15000, features: ["SEO + Speed"] },
          ],
        },
        {
          icon: <Code size={20} />,
          name: "Custom Web App",
          desc: "Advanced scalable web application",
          delivery: "4–8 Weeks",
          highlight: "High performance",
          packages: [
            { name: "Starter", price: 20000, features: ["Basic App"] },
            { name: "Standard", price: 40000, popular: true, features: ["Dashboard + API"] },
            { name: "Premium", price: 80000, features: ["Full SaaS"] },
          ],
        },
        {
          icon: <RefreshCw size={20} />,
          name: "Website Redesign",
          desc: "Upgrade your existing website",
          delivery: "2–3 Weeks",
          highlight: "Modern UI",
          packages: [
            { name: "Starter", price: 6000, features: ["UI Refresh"] },
            { name: "Standard", price: 12000, popular: true, features: ["Full Redesign"] },
            { name: "Premium", price: 20000, features: ["Complete Revamp"] },
          ],
        },
      ],
    },

    {
      title: "Marketing & Growth",
      services: [
        {
          icon: <Instagram size={20} />,
          name: "Social Media Management",
          desc: "Grow your brand on Instagram",
          delivery: "Monthly",
          highlight: "Brand growth",
          packages: [
            { name: "Starter", price: 3000, features: ["10 Posts"] },
            { name: "Standard", price: 7000, popular: true, features: ["Reels + Strategy"] },
            { name: "Premium", price: 12000, features: ["Full Growth"] },
          ],
        },
        {
          icon: <Megaphone size={20} />,
          name: "Ad Campaign Setup",
          desc: "Run high-converting ads",
          delivery: "1 Week",
          highlight: "ROI focused",
          packages: [
            { name: "Starter", price: 4000, features: ["Basic Ads"] },
            { name: "Standard", price: 8000, popular: true, features: ["Optimization"] },
            { name: "Premium", price: 15000, features: ["Full Campaign"] },
          ],
        },
        {
          icon: <Search size={20} />,
          name: "SEO Optimization",
          desc: "Rank higher on Google",
          delivery: "2–4 Weeks",
          highlight: "Organic growth",
          packages: [
            { name: "Starter", price: 5000, features: ["Basic SEO"] },
            { name: "Standard", price: 10000, popular: true, features: ["On-page SEO"] },
            { name: "Premium", price: 18000, features: ["Full SEO"] },
          ],
        },
      ],
    },

    {
      title: "Branding & Design",
      services: [
        {
          icon: <Palette size={20} />,
          name: "Logo & Brand Identity",
          desc: "Complete brand identity design",
          delivery: "1–2 Weeks",
          highlight: "Professional branding",
          packages: [
            { name: "Starter", price: 2500, features: ["1 Logo"] },
            { name: "Standard", price: 6000, popular: true, features: ["Brand Kit"] },
            { name: "Premium", price: 10000, features: ["Full Identity"] },
          ],
        },
        {
          icon: <Palette size={20} />,
          name: "UI/UX Design System",
          desc: "Modern UI for apps & websites",
          delivery: "2–3 Weeks",
          highlight: "Premium design",
          packages: [
            { name: "Starter", price: 8000, features: ["Basic UI"] },
            { name: "Standard", price: 15000, popular: true, features: ["Full Design"] },
            { name: "Premium", price: 25000, features: ["UX Research"] },
          ],
        },
      ],
    },
  ];

  const sidebarItems = [
    { id: "services", label: "Services", icon: <LayoutDashboard size={18} /> },
    { id: "projects", label: "Projects", icon: <Folder size={18} /> },
    { id: "history", label: "Order History", icon: <Clock size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black/60 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold">
            HyperNestMedia
          </Link>

          <div className="mt-12 space-y-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                  active === item.id
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleLogout} className="flex gap-3 text-gray-400 hover:text-white">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-12">

        <h1 className="text-5xl mb-6">
          Welcome,{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        <p className="text-gray-400 mb-16">
          Choose a service to start your project
        </p>

        {active === "services" &&
          categories.map((category, i) => (
            <div key={i} className="mb-24">
              <h2 className="text-2xl mb-10">{category.title}</h2>

              <div className="grid md:grid-cols-3 gap-10">
                {category.services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setSelectedService(service)}
                    className="cursor-pointer group relative p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 transition"
                  >
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/10 to-transparent transition" />

                    <div className="mb-4">{service.icon}</div>

                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-400 mt-2">{service.desc}</p>

                    <p className="text-xs text-gray-500 mt-2">
                      {service.delivery}
                    </p>

                    <p className="text-xs text-emerald-400 mt-2">
                      {service.highlight}
                    </p>

                    <p className="mt-4 text-sm text-emerald-400">
                      Starting ₹{service.packages[0].price}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        {/* MODALS FLOW */}
        {selectedService && (
          <ServicePackageModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onSelectPackage={(pkg) => {
              setDetailsPackage({
                ...pkg,
                serviceName: selectedService.name,
              });
              setSelectedService(null);
            }}
          />
        )}

        {detailsPackage && (
          <PackageDetailsModal
            pkg={detailsPackage}
            serviceName={detailsPackage.serviceName}
            onClose={() => setDetailsPackage(null)}
            onContinue={() => {
              setSelectedPackage(detailsPackage);
              setDetailsPackage(null);
            }}
          />
        )}

        {selectedPackage && user && (
          <ProjectRequestModal
            service={`${selectedPackage.serviceName} - ${selectedPackage.name}`}
            userId={user.uid}
            onClose={() => setSelectedPackage(null)}
          />
        )}
      </main>
    </div>
  );
}
