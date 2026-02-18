import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import ProjectRequestModal from "../components/ProjectRequestModal";

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
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [active, setActive] = useState("services");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const categories = [
    {
      title: "Web Development",
      services: [
        { icon: <Globe size={20} />, name: "Portfolio Website", price: "Starting ₹9,999", timeline: "1–2 Weeks" },
        { icon: <Briefcase size={20} />, name: "Business Website", price: "Starting ₹19,999", timeline: "2–3 Weeks" },
        { icon: <ShoppingCart size={20} />, name: "E-commerce Store", price: "Starting ₹29,999", timeline: "3–4 Weeks" },
        { icon: <Rocket size={20} />, name: "Startup Landing Page", price: "Starting ₹14,999", timeline: "1–2 Weeks" },
        { icon: <Code size={20} />, name: "Custom Web Application", price: "Starting ₹39,999", timeline: "4–6 Weeks" },
        { icon: <RefreshCw size={20} />, name: "Website Redesign", price: "Starting ₹12,999", timeline: "1–2 Weeks" },
      ],
    },
    {
      title: "Social Media & Marketing",
      services: [
        { icon: <Instagram size={20} />, name: "Social Media Management", price: "Starting ₹7,999 / month", timeline: "Monthly" },
        { icon: <Megaphone size={20} />, name: "Ad Campaign Setup", price: "Starting ₹8,999", timeline: "1 Week" },
        { icon: <Search size={20} />, name: "SEO Optimization", price: "Starting ₹9,999", timeline: "2 Weeks" },
      ],
    },
    {
      title: "Branding & Design",
      services: [
        { icon: <Palette size={20} />, name: "Logo & Brand Identity", price: "Starting ₹6,999", timeline: "1–2 Weeks" },
        { icon: <Palette size={20} />, name: "UI/UX Design System", price: "Starting ₹14,999", timeline: "2–3 Weeks" },
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
      <aside className="w-64 bg-black/60 backdrop-blur-2xl border-r border-white/10 shadow-2xl shadow-black/40 p-6 flex flex-col justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold tracking-tight">
            HyperNestMedia
          </Link>

          <div className="mt-12 space-y-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-hidden p-12">

        {/* CONTENT */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {active === "services" && (
            <>
              <h1 className="text-5xl font-semibold tracking-tight mb-6">
                Welcome,{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>

              <p className="text-gray-400 mb-20">
                Explore our services and start your next digital project.
              </p>

              {categories.map((category, catIndex) => (
                <div key={catIndex} className="mb-28">
                  <h2 className="text-2xl font-semibold mb-10">
                    {category.title}
                  </h2>

                  <div className="grid md:grid-cols-3 gap-10">
                    {category.services.map((service, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -8 }}
                        className="group relative rounded-3xl p-8
                                   bg-white/[0.04]
                                   backdrop-blur-xl
                                   border border-white/10
                                   hover:border-emerald-400/40
                                   hover:bg-white/[0.06]
                                   transition-all duration-500"
                      >
                        <div className="mb-6 w-12 h-12 flex items-center justify-center
                                        rounded-2xl bg-white/10 group-hover:bg-white/20 transition">
                          {service.icon}
                        </div>

                        <h3 className="text-lg font-semibold">
                          {service.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400">
                          {service.price}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {service.timeline}
                        </p>

                        <button
                          onClick={() => setSelectedService(service.name)}
                          className="mt-6 flex items-center gap-2 text-sm font-medium
                                     text-white group-hover:text-emerald-400 transition"
                        >
                          Start This Project
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {active !== "services" && (
            <h2 className="text-2xl text-gray-400">
              {active.charAt(0).toUpperCase() + active.slice(1)} section coming soon.
            </h2>
          )}
        </motion.div>

        {/* PROJECT REQUEST MODAL */}
        {selectedService && user && (
          <ProjectRequestModal
            service={selectedService}
            userId={user.uid}
            onClose={() => setSelectedService(null)}
          />
        )}

      </main>
    </div>
  );
}
