"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, Check } from "lucide-react";
import axios from "axios";

export default function SignupClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }
    if (!formData.agreed) { alert("Please agree to the Terms of Service"); return; }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name, email: formData.email, password: formData.password, role: "student"
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/role-selection";
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all";

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 selection:bg-[#0EB4A6] selection:text-white font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0EB4A6]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 md:p-10 w-full max-w-2xl relative z-10 shadow-2xl fade-up">
        <div className="flex flex-col items-center mb-7">
          <Image src="/guidevera-logo.png" alt="Guidevera" width={140} height={140} className="object-contain" />
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight fade-up delay-1">Create Your Account</h1>
          <p className="text-white/40 text-sm text-center fade-up delay-2">Join the leading platform for educational excellence.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5 fade-up delay-2">
              <label className="text-xs text-white/70 font-medium">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-white/40" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={inputClass} required />
              </div>
            </div>
            <div className="space-y-1.5 fade-up delay-2">
              <label className="text-xs text-white/70 font-medium">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-white/40" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@gmail.com" className={inputClass} required />
              </div>
            </div>
            <div className="space-y-1.5 fade-up delay-3">
              <label className="text-xs text-white/70 font-medium">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3.5 w-4 h-4 text-white/40" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX" className={inputClass} />
              </div>
            </div>
            <div className="space-y-1.5 fade-up delay-3">
              <label className="text-xs text-white/70 font-medium">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-white/40" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5 fade-up delay-3 md:col-span-2">
              <label className="text-xs text-white/70 font-medium">Confirm Password</label>
              <div className="relative flex items-center">
                <CheckCircle className="absolute left-3.5 w-4 h-4 text-white/40" />
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 text-white/30 hover:text-white/60 transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5 fade-up delay-3">
            <button type="button" onClick={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${formData.agreed ? "bg-[#0EB4A6] border-[#0EB4A6]" : "bg-transparent border-white/20 hover:border-white/40"}`}>
              {formData.agreed && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
            </button>
            <span className="text-xs text-white/40 leading-relaxed">
              I agree to the <Link href="#" className="text-[#0EB4A6] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#0EB4A6] hover:underline">Privacy Policy</Link>
            </span>
          </div>

          <button type="submit" disabled={isLoading}
            className="signup-btn w-full py-3.5 bg-gradient-to-r from-[#0EB4A6] to-[#0fdad3] text-black font-bold text-[15px] rounded-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating Account...
              </span>
            ) : (<>Create Account <span className="text-lg leading-none">→</span></>)}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0EB4A6] font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-white/20 text-[10px]">© 2024 Guidevera Inc. All rights reserved.</p>
      </div>
    </div>
  );
}
