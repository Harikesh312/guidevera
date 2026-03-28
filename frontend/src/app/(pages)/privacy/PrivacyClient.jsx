"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function PrivacyClient() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white pb-0">
      <Navbar />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#09090b]">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#0EB4A6]">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-h2:text-white">
          <p className="mb-6">At Guidevera, we take your privacy seriously. This policy describes what personal information we collect and how we use it.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information Collection</h2>
          <p className="mb-6">We collect information you provide directly to us when you create an account, complete our ability test, or fill out an application form.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Information</h2>
          <p className="mb-6">We use the information we collect primarily to provide, maintain, protect, and improve our services, including matching you with appropriate colleges based on your scores and preferences.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
