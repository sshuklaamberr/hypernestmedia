import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

/* Layout WITH navbar */
function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

/* Layout WITHOUT navbar */
function CleanLayout() {
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* ===== PUBLIC (NO NAVBAR) ===== */}
      <Route element={<CleanLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* ===== PUBLIC (WITH NAVBAR) ===== */}
      <Route element={<DefaultLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ===== PROTECTED (NO NAVBAR) ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
