import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/useAuth";

// Component Imports
import Profile from "./Profile";
import Settings from "./Settings";
import OrderHistory from "./OrderHistory";
import ProjectRequestModal from "../components/ProjectRequestModal";
import ServicePackageModal from "../components/ServicePackageModal";
import PackageDetailsModal from "../components/PackageDetailsModal";

import {
  LayoutDashboard,
  Folder,
  Clock,
  User,
  Settings as LuSettings,
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
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// FIX: proper types for service/package data
interface Package {
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
  originalPrice?: number;
  serviceName?: string;
}

interface Service {
  icon: React.ReactNode;
  name: string;
  desc: string;
  delivery: string;
  highlight: string;
  packages: Package[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [active, setActive] = useState("services");
  // FIX: typed useState instead of null
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [detailsPackage, setDetailsPackage] = useState<Package | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  if (loading) return null;

  const name = user?.displayName || user?.email?.split("@")[0] || "User";
  const initial = name.trim().charAt(0).toUpperCase();

  const DISCOUNT_RATE = 0.75;
  // FIX: typed parameter
  const calculatePrice = (price: number) => Math.round(price * (1 - DISCOUNT_RATE));

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const categories = [
    {
      title: "Web Development",
      services: [
        { icon: <Globe size={22} />, name: "Portfolio Website", desc: "Personal portfolio for students & creators", delivery: "2–4 Weeks", highlight: "Best for students", packages: [{ name: "Starter", price: 3000, features: ["1 Page", "Responsive"] }, { name: "Standard", price: 6000, popular: true, features: ["3 Pages", "Modern UI", "Contact Form"] }, { name: "Premium", price: 10000, features: ["5+ Pages", "SEO Ready", "Animations"] }] },
        { icon: <Briefcase size={22} />, name: "Business Website", desc: "Professional website for companies", delivery: "3–5 Weeks", highlight: "For startups", packages: [{ name: "Starter", price: 8000, features: ["3 Pages"] }, { name: "Standard", price: 15000, popular: true, features: ["5 Pages", "Forms"] }, { name: "Premium", price: 25000, features: ["Full Website", "SEO"] }] },
        { icon: <ShoppingCart size={22} />, name: "E-commerce Store", desc: "Online store with payment integration", delivery: "3–6 Weeks", highlight: "Sell online", packages: [{ name: "Starter", price: 15000, features: ["Basic Store"] }, { name: "Standard", price: 25000, popular: true, features: ["Payments + Admin"] }, { name: "Premium", price: 40000, features: ["Advanced Store"] }] },
        { icon: <Rocket size={22} />, name: "Startup Landing Page", desc: "High converting landing page", delivery: "1–2 Weeks", highlight: "Conversion focused", packages: [{ name: "Starter", price: 5000, features: ["Single Page"] }, { name: "Standard", price: 9000, popular: true, features: ["Animations"] }, { name: "Premium", price: 15000, features: ["SEO + Speed"] }] },
        { icon: <Code size={22} />, name: "Custom Web App", desc: "Advanced scalable web application", delivery: "4–8 Weeks", highlight: "High performance", packages: [{ name: "Starter", price: 20000, features: ["Basic App"] }, { name: "Standard", price: 40000, popular: true, features: ["Dashboard + API"] }, { name: "Premium", price: 80000, features: ["Full SaaS"] }] },
        { icon: <RefreshCw size={22} />, name: "Website Redesign", desc: "Upgrade your existing website", delivery: "2–3 Weeks", highlight: "Modern UI", packages: [{ name: "Starter", price: 6000, features: ["UI Refresh"] }, { name: "Standard", price: 12000, popular: true, features: ["Full Redesign"] }, { name: "Premium", price: 20000, features: ["Complete Revamp"] }] },
      ],
    },
    {
      title: "Marketing & Growth",
      services: [
        { icon: <Instagram size={22} />, name: "Social Media Management", desc: "Grow your brand on Instagram", delivery: "Monthly", highlight: "Brand growth", packages: [{ name: "Starter", price: 3000, features: ["10 Posts"] }, { name: "Standard", price: 7000, popular: true, features: ["Reels + Strategy"] }, { name: "Premium", price: 12000, features: ["Full Growth"] }] },
        { icon: <Megaphone size={22} />, name: "Ad Campaign Setup", desc: "Run high-converting ads", delivery: "1 Week", highlight: "ROI focused", packages: [{ name: "Starter", price: 4000, features: ["Basic Ads"] }, { name: "Standard", price: 8000, popular: true, features: ["Optimization"] }, { name: "Premium", price: 15000, features: ["Full Campaign"] }] },
        { icon: <Search size={22} />, name: "SEO Optimization", desc: "Rank higher on Google", delivery: "2–4 Weeks", highlight: "Organic growth", packages: [{ name: "Starter", price: 5000, features: ["Basic SEO"] }, { name: "Standard", price: 10000, popular: true, features: ["On-page SEO"] }, { name: "Premium", price: 18000, features: ["Full SEO"] }] },
      ],
    },
    {
      title: "Branding & Design",
      services: [
        { icon: <Palette size={22} />, name: "Logo & Brand Identity", desc: "Complete brand identity design", delivery: "1–2 Weeks", highlight: "Professional branding", packages: [{ name: "Starter", price: 2500, features: ["1 Logo"] }, { name: "Standard", price: 6000, popular: true, features: ["Brand Kit"] }, { name: "Premium", price: 10000, features: ["Full Identity"] }] },
        { icon: <Palette size={22} />, name: "UI/UX Design System", desc: "Modern UI for apps & websites", delivery: "2–3 Weeks", highlight: "Premium design", packages: [{ name: "Starter", price: 8000, features: ["Basic UI"] }, { name: "Standard", price: 15000, popular: true, features: ["Full Design"] }, { name: "Premium", price: 25000, features: ["UX Research"] }] },
      ],
    },
  ];

  const sidebarItems = [
    { id: "services", label: "Services", icon: <LayoutDashboard size={18} /> },
    { id: "projects", label: "Projects", icon: <Folder size={18} /> },
    { id: "history", label: "Order History", icon: <Clock size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "settings", label: "Settings", icon: <LuSettings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050807] text-white font-sans">
      <style>{`
        .sidebar-item-active {
          background: linear-gradient(135deg, rgba(52,211,153,0.12), rgba(52,211,153,0.04));
          border: 1px solid rgba(52,211,153,0.2);
          box-shadow: 0 0 20px rgba(52,211,153,0.06);
        }
        .sidebar-item {
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .sidebar-item:hover {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.05);
        }
        .service-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.25s ease,
                      box-shadow 0.35s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(52,211,153,0.25);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,211,153,0.1);
        }
        .service-card:hover .card-icon {
          background: rgba(52,211,153,0.15);
          color: #34d399;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #34d399, #5eead4, #34d399);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside className="w-64 fixed h-full z-20 flex flex-col
                        bg-[#060a08]/80 backdrop-blur-2xl
                        border-r border-white/[0.06]">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <div className="flex flex-col h-full p-5">
          <Link to="/" className="flex items-center gap-2.5 group mb-10 mt-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600
                            flex items-center justify-center
                            shadow-[0_0_16px_rgba(52,211,153,0.3)]
                            group-hover:shadow-[0_0_24px_rgba(52,211,153,0.5)] transition-shadow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white" fillOpacity="0.95"/>
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-white">HyperNestMedia</span>
          </Link>

          <p className="text-xs uppercase tracking-widest text-gray-700 font-semibold mb-3 ml-1">Navigation</p>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[15px] font-medium
                            ${active === item.id
                              ? "sidebar-item-active text-emerald-400"
                              : "text-gray-500 hover:text-gray-300"
                            }`}
              >
                <span className={active === item.id ? "text-emerald-400" : "text-gray-600"}>
                  {item.icon}
                </span>
                {item.label}
                {active === item.id && (
                  <ChevronRight size={14} className="ml-auto text-emerald-400/50" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-5 border-t border-white/[0.05] space-y-3">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600
                              flex items-center justify-center text-sm font-bold text-black shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{name}</p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                         text-sm text-gray-600 hover:text-red-400
                         hover:bg-red-500/5 border border-transparent
                         hover:border-red-500/10 transition-all duration-200"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto
                       bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.06)_0%,transparent_60%)]">

        <AnimatePresence mode="wait">

          {/* ── SERVICES ── */}
          {active === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="p-10"
            >
              {/* Launch Banner */}
              <div className="relative mb-10 p-7 rounded-2xl overflow-hidden
                              border border-emerald-500/15
                              bg-gradient-to-br from-emerald-500/8 via-transparent to-transparent">
                <div className="absolute top-0 left-0 right-0 h-[1px]
                                bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                <div className="absolute top-0 right-0 opacity-[0.07] pointer-events-none">
                  <Zap size={140} className="text-emerald-400 fill-emerald-400 translate-x-8 -translate-y-4" />
                </div>

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                     bg-emerald-400 text-black text-xs font-black uppercase tracking-widest">
                      <Sparkles size={11} /> Grand Launch
                    </span>
                    <h2 className="text-4xl font-bold mt-3 tracking-tight">
                      75% OFF{" "}
                      <span className="shimmer-text">Everything</span>
                    </h2>
                    <p className="text-gray-500 mt-2 text-base">
                      Be one of the first 1,000 clients to claim this massive discount.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] backdrop-blur p-5 rounded-2xl
                                  border border-white/[0.07] min-w-[240px] shrink-0">
                    <div className="flex justify-between mb-2.5">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Early Bird Slots</span>
                      <span className="text-xs font-bold text-emerald-400">642 / 1000 Left</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "35.8%" }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400
                                   shadow-[0_0_8px_rgba(52,211,153,0.6)] rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-700 mt-2">Filling fast — limited availability</p>
                  </div>
                </div>
              </div>

              {/* Welcome */}
              <div className="mb-10">
                <h1 className="text-4xl font-semibold tracking-tight">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>
                <p className="text-gray-600 mt-2 text-base">Choose a service below to start your project with HyperNest.</p>
              </div>

              {/* Categories */}
              {categories.map((category, i) => (
                <div key={i} className="mb-14">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-5 w-[3px] bg-emerald-400 rounded-full" />
                    <h2 className="text-lg font-semibold text-white tracking-tight">{category.title}</h2>
                    <span className="text-sm text-gray-700">({category.services.length})</span>
                  </div>

                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {category.services.map((service, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedService(service)}
                        className="service-card cursor-pointer relative p-6 rounded-2xl
                                   bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[1px]
                                        bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="card-icon w-12 h-12 rounded-xl bg-white/[0.04]
                                        flex items-center justify-center text-gray-500
                                        border border-white/[0.06] mb-5 transition-all duration-300">
                          {service.icon}
                        </div>

                        <h3 className="text-base font-semibold text-white">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed line-clamp-2">{service.desc}</p>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.04]">
                          <div>
                            <p className="text-xs text-gray-700 uppercase tracking-widest mb-1">Starting at</p>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-bold text-white">
                                ₹{calculatePrice(service.packages[0].price).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-700 line-through">
                                ₹{service.packages[0].price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block text-xs font-bold text-emerald-400
                                             bg-emerald-400/8 border border-emerald-500/15
                                             px-2.5 py-1 rounded-lg">75% OFF</span>
                            <p className="text-xs text-gray-700 mt-1">{service.delivery}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── ORDER HISTORY ── */}
          {active === "history" && (
            <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="p-10">
              <OrderHistory />
            </motion.div>
          )}

          {/* ── PROFILE ── */}
          {active === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="p-10">
              <Profile />
            </motion.div>
          )}

          {/* ── SETTINGS ── */}
          {active === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="p-10">
              <Settings />
            </motion.div>
          )}

          {/* ── PROJECTS EMPTY STATE ── */}
          {active === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
              className="p-10 flex flex-col items-center justify-center min-h-[70vh]">
              <div className="text-center max-w-sm">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                                  flex items-center justify-center">
                    <Folder size={32} className="text-gray-700" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No active projects yet</h3>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  Once your order is approved by our team, your project workspace will appear here.
                </p>
                <button
                  onClick={() => setActive("services")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                             bg-emerald-500/10 border border-emerald-500/20
                             text-emerald-400 text-base font-medium
                             hover:bg-emerald-500/15 transition-all"
                >
                  Browse Services <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── MODALS ── */}
        {selectedService && (
          <ServicePackageModal
            service={{
              ...selectedService,
              packages: selectedService.packages.map((pkg: Package) => ({
                ...pkg,
                originalPrice: pkg.price,
                price: calculatePrice(pkg.price),
              })),
            }}
            onClose={() => setSelectedService(null)}
            onSelectPackage={(pkg: Package) => {
              setDetailsPackage({ ...pkg, serviceName: selectedService.name });
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
            price={selectedPackage.price}
            userId={user.uid}
            onClose={() => setSelectedPackage(null)}
          />
        )}
      </main>
    </div>
  );
}