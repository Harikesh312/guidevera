"use client";

import React, { useState } from "react";
import { GraduationCap, Users, Shield, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("counselor");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    {
      id: "counselor",
      title: "Counselor",
      description: "Manage student guidance, schedule sessions, and track performance.",
      icon: <Users className="w-5 h-5 text-black" />
    },

    {
      id: "student",
      title: "Student",
      description: "Access learning materials, track your progress, and connect with peers.",
      icon: <GraduationCap className="w-5 h-5 text-white/70" />
    },

    {
      id: "admin",
      title: "Admin",
      description: "Oversee platform settings, manage users, and configure integrations.",
      icon: <Shield className="w-5 h-5 text-white/70" />
    }
  ];

  const handleContinue = async () => {
    setIsSubmitting(true);
    try {
      // In a real app we'd trigger an API to update the role.
      // E.g., const token = localStorage.getItem("token");
      // await axios.post("http://localhost:5000/api/auth/role", { role: selectedRole }, { headers: { Authorization: `Bearer ${token}` } });
      
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.role = selectedRole;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Redirection mapping based on selected role
      if (selectedRole === 'admin') window.location.href = "/admin";
      else if (selectedRole === 'counselor') window.location.href = "/counselor";
      else window.location.href = "/";
      
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 selection:bg-[#0EB4A6] selection:text-white font-sans relative overflow-hidden">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0EB4A6]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Blue Top & Bottom Dotted Dividers from screenshot */}
      <div className="absolute top-1/4 left-0 w-full h-[60px] border-y border-dashed border-[#0EB4A6]/20 bg-[#0EB4A6]/[0.02] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-full h-[60px] border-y border-dashed border-[#0EB4A6]/20 bg-[#0EB4A6]/[0.02] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Select Your Role</h1>
          <p className="text-white/50 text-base md:text-lg">Choose the role that best describes you to get started with Guidevera.</p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            
            return (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative flex flex-col p-8 rounded-3xl cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "bg-[#161618] border-2 border-[#0EB4A6] shadow-[0_0_30px_rgba(14,180,166,0.15)] scale-[1.02]" 
                    : "bg-[#121214] border-2 border-transparent hover:bg-[#161618]"
                }`}
              >
                {/* Selection indicator */}
                <div className="absolute top-6 right-6">
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#0EB4A6] fill-[#0EB4A6]" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-white/20" />
                  )}
                </div>

                {/* Icon block */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  isSelected ? "bg-[#0EB4A6]" : "bg-white/5"
                }`}>
                  {role.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-white mb-3">{role.title}</h3>
                <p className={`text-sm leading-relaxed ${isSelected ? "text-white/70" : "text-white/50"}`}>
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          disabled={isSubmitting}
          className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-semibold text-lg py-4 px-12 rounded-full flex items-center gap-2 hover:shadow-[0_0_20px_rgba(14,180,166,0.4)] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Continue"} 
          <span className="font-bold">→</span>
        </button>

      </div>
    </div>
  );
}
