"use client";

import React, { useState } from "react";
import { Mail, X } from "lucide-react";
import axios from "axios";
import API_URL from "@/lib/api";

export default function LeadWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/leads`, formData);
      alert("Enquiry sent successfully! We will get back to you soon.");
      setIsOpen(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white p-4 rounded-full shadow-[0_0_20px_rgba(14,180,166,0.4)] transition-all transform hover:scale-110 items-center justify-center min-touch ${isOpen ? "hidden" : "flex"}`}
        aria-label="Quick Enquiry"
      >
        <Mail className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="bg-[#121214] border border-white/10 w-full max-w-md rounded-2xl p-6 relative z-10 transform transition-all shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors min-touch flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0EB4A6]" />
                Quick Enquiry
              </h3>
              <p className="text-white/50 text-sm mt-1">Leave us a message and our counselors will reach out.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Name</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 px-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all min-touch"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Phone Number</label>
                <input
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  placeholder="Your active phone number"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 px-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all min-touch"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Email (Optional)</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Your email address"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 px-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all min-touch"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Message</label>
                <textarea
                  name="message" required value={formData.message} onChange={handleChange}
                  placeholder="How can we help you?" rows="3"
                  className="w-full bg-[#1A1A1D] border border-white/5 rounded-xl py-3 px-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all resize-none min-touch"
                />
              </div>
              
              <button
                type="submit" disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold text-sm rounded-xl mt-2 cursor-pointer disabled:opacity-60 transition-all shadow-[0_0_15px_rgba(14,180,166,0.3)] min-touch"
              >
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
