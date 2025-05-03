// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-teal-700">Welcome to FixMyHood!</h1>
        <p className="mt-4 text-lg">You have successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
