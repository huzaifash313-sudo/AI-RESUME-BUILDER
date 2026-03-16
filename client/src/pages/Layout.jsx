import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <Loader />;

  // User checking logic
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;