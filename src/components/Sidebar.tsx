import { 
  LayoutDashboard, 
  Folder, 
  Clock, 
  User, 
  Settings as LuSettings,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  active: string;
  setActive: (value: string) => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  const menuItems = [
    { id: "services", name: "Services", icon: <LayoutDashboard size={18} /> },
    { id: "projects", name: "My Projects", icon: <Folder size={18} /> },
    { id: "history", name: "Order History", icon: <Clock size={18} /> },
    { id: "profile", name: "Profile", icon: <User size={18} /> },
    { id: "settings", name: "Settings", icon: <LuSettings size={18} /> },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0
                      bg-black/60 backdrop-blur-2xl
                      border-r border-white/10
                      p-6 flex flex-col">

      {/* BRAND */}
      <Link
        to="/"
        className="text-xl font-semibold tracking-tight text-white px-2"
      >
        HyperNestMedia
      </Link>

      {/* MENU */}
      <div className="mt-12 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3
                        px-4 py-3 rounded-xl text-sm
                        transition-all duration-200
              ${
                active === item.id
                  ? "bg-white/10 text-white shadow-lg shadow-black/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      {/* FOOTER SPACER */}
      <div className="mt-auto pt-6 border-t border-white/10 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
        Client Portal v1.0
      </div>
    </aside>
  );
}