"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === 'admin') window.location.href = "/admin";
      else if (role === 'counselor') window.location.href = "/counselor";
      else window.location.href = "/";

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 selection:bg-[#0EB4A6] selection:text-white font-sans relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0EB4A6]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Animations - moved to globals.css */}

      {/* Main Card */}
      <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 md:p-12 w-full max-w-[420px] relative z-10 shadow-2xl fade-up">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/guidevera-logo.png"
            alt="Guidevera"
            width={140}
            height={140}
            className="object-contain"
          />
          <h1 className="text-3xl font-bold text-white mb-1.5 tracking-tight fade-up delay-1">Welcome Back</h1>
          <p className="text-white/40 text-sm text-center fade-up delay-2">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5 fade-up delay-2">
            <label className="text-xs text-white/70 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 fade-up delay-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/70 font-medium">Password</label>
              <Link href="#" className="text-xs text-[#0EB4A6] hover:underline font-medium">Forgot Password?</Link>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3.5 pl-4 pr-10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="fade-up delay-4">
            <button
              type="submit"
              disabled={isLoading}
              className="login-btn w-full py-3.5 bg-gradient-to-r from-[#0EB4A6] to-[#0fdad3] text-black font-bold text-[15px] rounded-xl mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : "Log In"}
            </button>
          </div>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6 fade-up delay-4">
          <div className="flex-1 border-t border-white/8"></div>
          <span className="px-4 text-white/25 text-xs">OR</span>
          <div className="flex-1 border-t border-white/8"></div>
        </div>

        {/* Google Login */}
        <button className="fade-up delay-4 w-full py-3.5 bg-transparent border border-white/10 text-white/70 text-sm font-medium rounded-xl hover:bg-white/5 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
          <Image src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" width={18} height={18} />
          Continue with Google
        </button>

        {/* Footer */}
        <div className="mt-7 text-center fade-up delay-4">
          <p className="text-white/40 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#0EB4A6] font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
}