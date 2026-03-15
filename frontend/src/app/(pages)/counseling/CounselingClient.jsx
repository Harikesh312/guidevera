"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Route, GraduationCap, BookOpen, Target, Check, Shield } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const inputClass = "bg-[#1A1A1D] border border-white/5 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 w-full transition-all";

const features = [
  { icon: <Route className="w-4 h-4 text-[#0EB4A6]" />, title: "Clear Roadmap", desc: "Step-by-step career path planning tailored to your skills" },
  { icon: <GraduationCap className="w-4 h-4 text-[#0EB4A6]" />, title: "College Choice", desc: "Data-driven selection of the best-fit colleges for you" },
  { icon: <BookOpen className="w-4 h-4 text-[#0EB4A6]" />, title: "Course Clarity", desc: "Deep dive into what a course entails to match your interests" },
  { icon: <Target className="w-4 h-4 text-[#0EB4A6]" />, title: "Admission Strategy", desc: "Expert tips and tactics for successful admissions" },
];

export default function CounselingClient() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", city: "",
    qualification: "", stream: "", preferredDate: "", preferredTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/counseling/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || "Booking failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP SECTION: Full-width header + feature cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          {/* Badge + Heading + Subtext + CTA */}
          <div className="mb-8">
          
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight max-w-2xl">
              Book a Personalized <span className="text-[#0EB4A6]">Career Counseling Session</span>
            </h1>
            <p className="text-white/60 text-base mb-6 leading-relaxed max-w-xl">
              Unlock your true potential with expert guidance. Get a clear roadmap for your future from India&apos;s top career counselors.
            </p>
            <button
              onClick={() => document.getElementById("counseling-form").scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)] cursor-pointer"
            >
              Schedule Your Session
            </button>
          </div>

          {/* Feature Mini Cards – 4-column row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-[#121214] border border-white/5 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-[#0EB4A6]/10 flex items-center justify-center mb-3">{f.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM SECTION: Two-column — Form LEFT, What You'll Get RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT – Student Details Form */}
          <div id="counseling-form" className="bg-[#121214] border border-white/5 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-1">Student Details</h2>
            <p className="text-white/40 text-sm mb-6">Fill in the details to book your session.</p>

            {isSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-bold text-xl mb-2">Booking Confirmed! 🎉</h3>
                <p className="text-white/50 text-sm">Check your email for details. We&apos;ll contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Full Name</label>
                  <input name="name" type="text" required placeholder="John Doe" onChange={handleChange} value={formData.name} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Email Address</label>
                  <input name="email" type="email" required placeholder="john@example.com" onChange={handleChange} value={formData.email} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Phone Number</label>
                    <input name="phone" type="tel" required placeholder="+91 98765 43210" onChange={handleChange} value={formData.phone} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">City</label>
                    <input name="city" type="text" required placeholder="Mumbai" onChange={handleChange} value={formData.city} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Qualification</label>
                    <select name="qualification" required onChange={handleChange} value={formData.qualification} className={inputClass}>
                      <option value="">Select...</option>
                      {["Class 10", "Class 12", "Undergraduate", "Graduate", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Stream / Interest</label>
                    <select name="stream" required onChange={handleChange} value={formData.stream} className={inputClass}>
                      <option value="">Select...</option>
                      {["Science (PCM)", "Science (PCB)", "Commerce", "Arts", "Engineering", "MBA", "Law", "Medicine"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Preferred Date</label>
                    <input name="preferredDate" type="date" required onChange={handleChange} value={formData.preferredDate} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Preferred Time Slot</label>
                    <select name="preferredTime" required onChange={handleChange} value={formData.preferredTime} className={inputClass}>
                      <option value="">Select...</option>
                      {["10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM", "4:00 PM – 5:00 PM"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <><div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" /> Confirming...</>
                  ) : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT – What You'll Get + Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:sticky lg:top-32 space-y-4"
          >
            {/* What You'll Get */}
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6">
              <h2 className="font-bold text-xl mb-6">What You&apos;ll Get</h2>
              <div className="space-y-4 mb-8">
                {[
                  "60-minute 1-on-1 session with a certified career counselor",
                  "Detailed Psychometric Assessment report",
                  "Personalised college & course recommendations list",
                  "Post-session recording and action plan document",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0EB4A6]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-[#0EB4A6]" />
                    </div>
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-white/5 pt-6">
                <p className="text-xs text-white/40 mb-3">Total Session Fee</p>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white/40 line-through text-lg">₹1,499</span>
                  <span className="text-3xl font-black text-[#0EB4A6]">₹0</span>
                  <span className="text-xs bg-green-600 text-white font-bold px-2 py-1 rounded-md">FREE</span>
                </div>
                <p className="text-xs text-white/30">* Limited time offer · No credit card required</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 p-4 bg-[#121214] border border-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#0EB4A6]" />
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">100% Satisfaction Guarantee.</span> Trusted by 10,000+ students
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
