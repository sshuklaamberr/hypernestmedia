import { Home, Folder, PlusCircle, MessageCircle, Settings } from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (value: string) => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  const menuItems = [
    { name: "Overview", icon: <Home size={18} /> },
    { name: "My Projects", icon: <Folder size={18} /> },
    { name: "Start Project", icon: <PlusCircle size={18} /> },
    { name: "Messages", icon: <MessageCircle size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="h-screen w-64 bg-black border-r border-white/10 p-6 fixed left-0 top-0">
      <h2 className="text-lg font-semibold mb-10">Client Portal</h2>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition
              ${
                active === item.name
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
