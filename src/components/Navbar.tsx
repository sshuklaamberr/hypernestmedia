import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `transition ${
      pathname === path ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50
                 backdrop-blur-xl bg-white/5 border border-white/10
                 rounded-2xl shadow-xl"
    >
      <div className="px-8 py-4 flex gap-10 items-center">
        <Link to="/" className="font-semibold text-white">
          HyperNestMedia
        </Link>
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/services" className={linkClass("/services")}>Services</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
        <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
      </div>
    </motion.nav>
  );
}