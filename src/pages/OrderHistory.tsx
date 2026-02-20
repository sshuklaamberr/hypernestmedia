import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../lib/firebase"; // Ensure 'db' is exported in your firebase.ts
import { useAuth } from "../lib/useAuth";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Clock, CheckCircle2, RefreshCcw, Loader2 } from "lucide-react";

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Safety check to ensure user is logged in
    if (!user) return;

    try {
      // 2. Query 'projects' collection filtered by current user
      const q = query(
        collection(db, "projects"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      // 3. Listen for real-time updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(data);
        setLoading(false);
      }, (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setLoading(false);
    }
  }, [user]);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-400 w-8 h-8" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h2 className="text-3xl font-semibold mb-8">Order History</h2>
      
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.03] text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
            <tr>
              <th className="p-6">Project Details</th>
              <th className="p-6">Order Date</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-white/[0.02] transition-all">
                <td className="p-6">
                  <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {order.projectName || "Unnamed Project"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{order.service}</p>
                </td>
                <td className="p-6 text-sm text-gray-400">
                  {/* Safety check: serverTimestamp can be null for a split second after creation */}
                  {order.createdAt?.toDate 
                    ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) 
                    : "Just now"}
                </td>
                <td className="p-6 font-semibold text-white">
                  ₹{Number(order.amount).toLocaleString('en-IN')}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 w-fit transition-all ${
                    order.status === "Completed" 
                      ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" 
                      : "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                  }`}>
                    {order.status === "Completed" ? (
                      <CheckCircle2 size={12}/>
                    ) : (
                      <RefreshCcw size={12} className="animate-spin-slow"/>
                    )}
                    {order.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="p-24 text-center">
            <Clock size={40} className="mx-auto text-gray-700 mb-4 opacity-50" />
            <p className="text-gray-500 font-medium">No projects in your history yet.</p>
            <p className="text-xs text-gray-600 mt-2 italic">Start a project from the Services tab to see it here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}