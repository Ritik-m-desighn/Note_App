"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";

// --- Custom Tailwind Styling for Focus State ---
// While you can't use NextUI, we use a simple utility to match its clean focus/hover state.
const inputClasses = 
  "w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
  "transition duration-150 ease-in-out placeholder-gray-500";

const buttonClasses = 
  "w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md " +
  "hover:bg-blue-700 transition duration-150 ease-in-out " +
  "disabled:bg-blue-400 disabled:cursor-not-allowed";

// --- Login Component ---

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! Redirecting...");
      
      // Delay navigation to allow the toast to show
      setTimeout(() => {
        router.push("/"); // redirect to notes page
      }, 500); 

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with full-screen background image and a subtle dark overlay
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-900 bg-cover bg-center"
      // Use a local or external image. This example uses a stylish abstract background.
      style={{
        backgroundImage: "url('https://cdn.wallpapersafari.com/79/64/M5Fbuy.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Glassmorphism/Translucent Login Card */}
      <div className="w-full max-w-sm p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-2xl border border-white/30">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <svg 
            className="w-10 h-10 text-white mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-3m3-10V4a3 3 0 013-3h7a3 3 0 013 3v3"></path>
          </svg>
          <h1 className="text-3xl font-bold text-white tracking-wide">Sign In</h1>
          <p className="text-sm text-gray-200 mt-1">Access your account securely</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={form.email}
              className={inputClasses}
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={form.password}
              className={inputClasses}
              required
            />
          </div>
          
          <button
            type="submit"
            className={buttonClasses}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Log In"}
          </button>
        </form>

        {/* Separator and Signup Link */}
        <div className="mt-8 pt-4 border-t border-white/30">
          <p className="text-center text-sm text-gray-200">
            Don’t have an account?{" "}
            <a href="/signup" className="font-semibold text-white hover:text-blue-200 transition duration-150">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}