import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-black px-8 py-6 text-white">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-semibold">
          HyperNestMedia Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white"
        >
          Logout
        </button>
      </div>

      <section className="max-w-4xl">
        <h2 className="text-4xl font-semibold mb-4">
          Hello, {user?.displayName}
        </h2>

        <p className="text-gray-400 mb-10">
          This is your private workspace.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="font-medium mb-2">Projects</h3>
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="font-medium mb-2">Clients</h3>
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="font-medium mb-2">Invoices</h3>
            <p className="text-gray-400 text-sm">Coming soon</p>
          </div>
        </div>
      </section>
    </main>
  );
}