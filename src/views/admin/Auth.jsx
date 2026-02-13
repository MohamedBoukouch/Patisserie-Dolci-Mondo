import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple example login
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="123456"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
