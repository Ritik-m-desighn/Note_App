"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { Toaster, toast } from "react-hot-toast";

// --- Custom Tailwind Styling for Consistency ---
const inputClasses = 
  "w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
  "transition duration-150 ease-in-out placeholder-gray-500";

const buttonClasses = 
  "w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md " +
  "hover:bg-green-700 transition duration-150 ease-in-out " +
  "disabled:bg-green-400 disabled:cursor-not-allowed";

// --- Signup Component ---

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully! Redirecting...");
      
      // Delay navigation to allow the toast to show
      setTimeout(() => {
        router.push("/"); // redirect to notes page
      }, 500); 

    } catch (err) {
      // Replace setError with toast.error
      console.error(err.response);
      toast.error(err.response?.data?.message || "Signup failed. Please try a different email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with full-screen background image and a subtle dark overlay
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-900 bg-cover bg-center"
      // Use a consistent, stylish background image
      style={{
        backgroundImage: "url('https://cdn.wallpapersafari.com/79/64/M5Fbuy.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Glassmorphism/Translucent Signup Card */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-white tracking-wide">Join Us</h1>
          <p className="text-sm text-gray-200 mt-1">Create your new account</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-white">Full Name</label>
            <input
              name="name"
              placeholder="Your name"
              onChange={handleChange}
              value={form.name}
              className={inputClasses}
              required
            />
          </div>

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
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Separator and Login Link */}
        <div className="mt-8 pt-4 border-t border-white/30">
          <p className="text-center text-sm text-gray-200">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-white hover:text-green-200 transition duration-150">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}