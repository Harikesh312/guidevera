"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Users, BarChart2, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { requireAuth } from "../../../lib/authGuard";

export default function AbilityTestClient() {
  const router = useRouter();

  const handleStartTest = () => {
    if (requireAuth('/ability-test/questions')) {
      router.push('/ability-test/questions');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white">
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0EB4A6]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 text-xs font-bold text-[#0EB4A6] tracking-widest mb-6">
                SCIENTIFIC CAREER GUIDANCE
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Discover Your <span className="text-[#0EB4A6]">True Potential</span>
              </h1>
              <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
                Our scientifically designed ability test analyses your cognitive strengths to map out the perfect career path and college majors for your future.
              </p>

              <div className="flex flex-col sm:flex-row w-full gap-4 mb-10">
                <button
                  onClick={handleStartTest}
                  className="w-full sm:w-auto px-6 py-4 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,180,166,0.4)] flex items-center gap-2 justify-center cursor-pointer"
                >
                  Start Ability Test <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto px-6 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-bold transition-all flex items-center gap-2 justify-center cursor-pointer"
                >
                  How It Works
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0EB4A6] to-[#0c9c90] border-2 border-[#09090b] flex items-center justify-center text-xs font-bold text-black">
                      {l}
                    </div>
                  ))}
                </div>
                <span className="text-white/50 text-sm">100+ students clarified this week</span>
              </div>
            </motion.div>

            {/* Right – AI Analysis Mockup */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="border border-white/10 bg-white/5 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-auto text-xs text-white/30 font-mono">AI Analysis</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Analysing responses...", done: true },
                    { label: "Matching career profiles...", done: true },
                    { label: "Generating roadmap...", done: false },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? 'bg-[#0EB4A6]/10 border border-[#0EB4A6]/20' : 'bg-white/5 border border-white/5'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-[#0EB4A6]' : 'border border-white/20'}`}>
                        {item.done && <CheckCircle className="w-3 h-3 text-black" />}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-[#0EB4A6]' : 'text-white/40'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 rounded-xl">
                  <p className="text-xs text-white/50 mb-1">Top Match</p>
                  <p className="font-bold text-[#0EB4A6]">Software Engineering</p>
                  <p className="text-xs text-white/40 mt-1">95% match based on your profile</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[95%] rounded-full bg-[#0EB4A6]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight">How It Works</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Three simple steps to unlock a detailed report of your cognitive abilities and suitable career paths.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Questioning", desc: "Answer a series of 20 interactive questions designed to gauge your natural inclinations and problem-solving style." },
              { num: "02", title: "AI Analysis", desc: "Our advanced AI analyses your responses against thousands of successful career profiles and psychological models." },
              { num: "03", title: "Recommendations", desc: "Receive a comprehensive report with personalised career guides, college majors, and actionable next steps." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#121214] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
              >
                <span className="absolute top-4 right-6 text-6xl font-black text-white/[0.03]">{step.num}</span>
                <div className="w-10 h-10 rounded-full bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 flex items-center justify-center mb-4">
                  <span className="text-[#0EB4A6] font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SAMPLE QUESTION ── */}
      <section className="py-24 bg-[#09090b] relative">
        <div className="absolute inset-0 bg-[#0EB4A6]/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs text-[#0EB4A6] font-bold tracking-widest mb-3 block">TRY A SAMPLE QUESTION</span>
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight">Experience the Assessment</h2>
          </div>
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-white/40 mb-3">
              <span>Question 3/20</span>
              <span>15% (demo only)</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 mb-6">
              <div className="h-full w-[15%] rounded-full bg-[#0EB4A6]" />
            </div>
            <h3 className="text-lg font-semibold mb-6 text-center">Which of these environments do you thrive in the most?</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Structured & Organised", selected: false },
                { label: "Creative & Fluid", selected: true },
                { label: "Collaborative & Social", selected: false },
                { label: "Analytical & Data Driven", selected: false },
              ].map((opt, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-4 text-sm font-medium text-center transition-all cursor-default ${
                    opt.selected
                      ? 'border-[#0EB4A6] bg-[#0EB4A6]/10 text-[#0EB4A6]'
                      : 'border-white/10 bg-white/5 text-white/60'
                  }`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button className="px-5 py-2 text-sm text-white/40 border border-white/10 rounded-full hover:bg-white/5 transition-colors">← Previous</button>
              <button className="px-5 py-2 text-sm bg-[#0EB4A6] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#0c9c90] transition-colors">
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY TAKE OUR TEST ── */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left – Benefits */}
            <div>
              <h2 className="text-2xl md:text-5xl font-bold tracking-tight mb-10">Why Take Our Ability Test?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Brain className="w-5 h-5 text-[#0EB4A6]" />, title: "Scientifically Validated", desc: "Built on proven psychological frameworks and validated models." },
                  { icon: <Users className="w-5 h-5 text-[#0EB4A6]" />, title: "Expert Designed", desc: "Crafted by experienced career counselors and industry experts." },
                  { icon: <BarChart2 className="w-5 h-5 text-[#0EB4A6]" />, title: "Deep Insights", desc: "Detailed personality and cognitive analysis unique to your profile." },
                  { icon: <CheckCircle className="w-5 h-5 text-[#0EB4A6]" />, title: "Actionable Results", desc: "Get real, step-by-step guidance you can act on immediately." },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#121214] border border-white/5 rounded-2xl p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0EB4A6]/10 flex items-center justify-center mb-3">
                      {b.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{b.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right – Result Preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <div className="bg-[#121214] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold">Your Result Preview</h3>
                  <span className="text-xs text-[#0EB4A6] bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 px-2 py-1 rounded-full font-medium">High Confidence</span>
                </div>
                <div className="space-y-5 mb-6">
                  {[
                    { label: "Creativity", pct: 92 },
                    { label: "Analytical", pct: 88 },
                    { label: "Leadership", pct: 65 },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-white/70">{s.label}</span>
                        <span className="text-sm font-bold text-[#0EB4A6]">{s.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.pct}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-[#0EB4A6]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-5">
                  <p className="text-xs text-white/40 mb-3">Top Career Matches</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 text-[#0EB4A6] text-xs px-3 py-1.5 rounded-full">Artificial Intelligence (Engineering)</span>
                    <span className="bg-white/5 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">Product Design</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/counseling" className="py-2.5 text-center rounded-xl border border-white/10 text-xs font-semibold hover:bg-white/5 transition-colors">Book Counseling</Link>
                    <Link href="/colleges" className="py-2.5 text-center rounded-xl bg-[#0EB4A6] hover:bg-[#0c9c90] text-xs font-semibold text-white transition-colors">Explore Colleges</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ── */}
      <section className="py-32 relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0EB4A6]/10 z-0" />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0EB4A6]/20 blur-[150px] rounded-[100%] z-0" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Ready to Discover Your Strengths?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
          >
            Don't leave your future to chance. Take the first step toward a career that fits your unique abilities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto px-6 py-4 md:px-12 md:py-5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(14,180,166,0.4)] flex sm:inline-flex justify-center items-center gap-2 cursor-pointer"
            >
              Start Your Free Test Now 🚀
            </button>
            <p className="mt-4 text-white/30 text-sm">No credit card required · Instant results</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
