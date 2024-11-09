// src/pages/LoginPage.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle, ChevronLeft } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", formData);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server response:", errorData);
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Server connection failed. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#2C3E50] font-sans">
      {/* Header */}
      <header className="bg-[#4A6741] text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Hearty Bites</h1>
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-[#E0C097] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <UserCircle className="h-16 w-16 text-[#4A6741]" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Welcome Back</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741] transition-colors"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741] transition-colors"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5331] disabled:bg-[#7B9171] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-[#4A6741] hover:text-[#3A5331] font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
          <div className="flex items-center text-[#4A6741]">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#4A6741] border-t-transparent mr-2"></div>
            Processing...
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
