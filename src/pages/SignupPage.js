import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle, ChevronLeft } from 'lucide-react';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Test server connection on component mount
    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then(res => res.json())
            .then(data => console.log("Server test successful:", data))
            .catch(err => console.error("Server test failed:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        console.log("Attempting signup with data:", formData);

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status);
            
            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data?.message || data?.error || `HTTP error! status: ${response.status}`);
            }

            setSuccess(true);
            console.log("Signup successful:", data);
            
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error("Signup error details:", error);
            setError(error.message || "An unexpected error occurred");
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
                            to="/login" 
                            className="flex items-center text-[#E0C097] hover:text-white"
                        >
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            Back to Login
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
                    <h2 className="text-3xl font-serif font-bold text-center mb-8">Create Account</h2>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            Error: {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            Signup successful! Redirecting to login page...
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741] transition-colors"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741] transition-colors"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
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
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5331] disabled:bg-[#7B9171] transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link 
                                to="/login" 
                                className="text-[#4A6741] hover:text-[#3A5331] font-medium"
                            >
                                Log in here
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

export default SignupPage;