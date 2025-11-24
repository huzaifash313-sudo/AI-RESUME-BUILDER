import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader"; // Your custom loader
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // Show loader while checking auth state
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        // User is authenticated, show dashboard layout
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-4">
            <Outlet />
          </main>
        </div>
      ) : (
        // User is not authenticated, show login/signup form
        <Login />
      )}
    </div>
  );
};

export default Layout;
