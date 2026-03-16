"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, Target, Heart, Users, Star, ChevronRight, Lightbulb, Globe, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function AboutClient() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white pb-0">
      <Navbar />

      <main>
        {/* SECTION 1: HERO */}
        <section className="relative pt-32 pb-24 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0EB4A6]/10 blur-[150px] rounded-full pointer-events-none z-0" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1.5 rounded-full bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 text-xs font-bold text-[#0EB4A6] tracking-wider mb-6">
              OUR STORY
            </span>
            <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              We Believe Every Student Deserves <br />
              <span className="text-[#0EB4A6]">Honest Guidance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Guidevera was born from a personal struggle and a mission to fix what's broken in India's career guidance system.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="bg-[#121214] border border-white/5 rounded-full px-5 py-2 text-sm text-white/80 font-medium">
                <Users className="w-4 h-4 inline-block mr-2 text-[#0EB4A6]" /> 500+ Students Guided Personally
              </span>
              <span className="bg-[#121214] border border-white/5 rounded-full px-5 py-2 text-sm text-white/80 font-medium">
                <Target className="w-4 h-4 inline-block mr-2 text-[#0EB4A6]" /> Founded with Purpose
              </span>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: THE PROBLEM WE SOLVE */}
        <section className="py-24 bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#121214] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 font-bold text-xl">✕</span>
                  </div>
                  <h2 className="text-2xl font-bold">The Problem</h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  Millions of Indian students make life-altering career decisions based on family pressure, social expectations, and limited awareness. Most never get honest, unbiased guidance that aligns with their unique strengths and passions.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#121214] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#0EB4A6]/50 group-hover:bg-[#0EB4A6] transition-colors" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center">
                    <span className="text-[#0EB4A6] font-bold text-xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-bold">Our Solution</h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  Guidevera provides every student with scientifically validated ability assessments, expert career counseling, and data-driven college recommendations — all in one platform. We replace guesswork with clarity.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FOUNDER SECTION */}
        <section className="py-24 bg-[#121214]/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Side: Founder Image */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm mx-auto md:max-w-md aspect-[4/5] rounded-2xl shadow-[0_0_60px_rgba(14,180,166,0.2)] overflow-hidden border border-white/10 group">
                  <Image 
                    src="/guidevera.png" 
                    alt="Digamber Singh Rana, Founder & CEO" 
                    fill 
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max text-center">
                    <span className="bg-[#0EB4A6] text-black text-xs font-bold px-4 py-2 rounded-full tracking-wider shadow-xl">
                      Founder & CEO
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side: Founder Story */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-xl">
                <span className="text-[#0EB4A6] text-xs font-bold tracking-widest mb-2 block uppercase">Meet the Founder</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">Digamber Singh Rana</h2>
                <h3 className="text-xl text-[#0EB4A6] font-medium mb-8">Founder, Guidevera</h3>

                <Quote className="w-12 h-12 text-[#0EB4A6] opacity-40 mb-6" />

                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>
                    Digamber Singh Rana is the Founder of Guidevera, a student-centric career guidance platform dedicated to empowering India's youth to make informed, confident career decisions.
                  </p>
                  <p>
                    Digamber's vision stems from his own struggle. Like countless students across India, he faced relentless societal and family pressure to pursue government exams — a path that didn't align with his true passion for entrepreneurship. It took nearly a year of conviction and difficult conversations to gain his family's support. During this time, he also grappled with finding the right university and course, realizing firsthand how scarce honest, unbiased guidance truly is.
                  </p>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 pt-2 overflow-hidden">
                      <p>
                        This experience ignited a deeper calling. During his college years, through a career counselling internship, Digamber personally guided over 1,000 students and discovered a stark reality: thousands were making career choices based on social expectations, limited awareness, or biased advice — rather than their authentic interests and strengths.
                      </p>
                      <p>
                        Recognizing this critical gap in India's education ecosystem, Digamber founded Guidevera with an unwavering mission — to help every student discover their true potential and pursue careers aligned with their aspirations. He believes that when students are empowered with honest guidance and self-awareness, they don't just build successful careers; they contribute meaningfully to the nation's progress.
                      </p>
                      
                      <div className="border-l-4 border-[#0EB4A6] bg-[#0EB4A6]/5 rounded-r-xl p-6 mt-6">
                        <p className="text-white/90 text-lg italic">
                          "Today, through Guidevera, Digamber continues his passion of liberating students from societal constraints and helping them craft futures of purpose and impact — to build the <strong className="text-[#0EB4A6]">INDIAN DREAM</strong>."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0EB4A6]/30 text-[#0EB4A6] text-sm font-semibold hover:bg-[#0EB4A6]/10 transition-colors shadow-sm"
                >
                  {isExpanded ? (
                    <>Read Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read More <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 4: OUR MISSION & VALUES */}
        <section className="py-24 bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Drives Us</h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">The core principles that guide every feature we build and every student we help.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Target className="w-6 h-6 text-white" />, title: "Clear Mission", desc: "To be the most trusted career guidance platform for every Indian student, regardless of background or location." },
                { icon: <Heart className="w-6 h-6 text-white" />, title: "Student First", desc: "Every decision we make is centered around what is best for the student — not what is convenient or profitable." },
                { icon: <Lightbulb className="w-6 h-6 text-white" />, title: "Honest Guidance", desc: "We believe in transparent, unbiased advice that truly reflects each student's unique strengths and aspirations." },
                { icon: <Globe className="w-6 h-6 text-white" />, title: "National Impact", desc: "Our vision extends beyond individuals — we want to transform how an entire generation of Indians approaches career decisions." }
              ].map((value, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#121214] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0EB4A6] flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: BY THE NUMBERS */}
        <section className="py-24 bg-[#121214] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { number: "500+", label: "Students Personally Guided by Founder" },
                { number: "500+", label: "Students Helped Through Platform" },
                { number: "90%", label: "Student Satisfaction Rate" }
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#09090b] border border-white/5 rounded-2xl p-8 md:p-12 text-center group hover:border-[#0EB4A6]/30 transition-all">
                  <p className="text-5xl md:text-6xl font-black text-[#0EB4A6] mb-4 group-hover:scale-110 transition-transform duration-300">{stat.number}</p>
                  <p className="text-white/80 font-medium text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA */}
        <section className="py-24 bg-[#09090b] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0EB4A6]/10 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl text-white/60 mb-10">Be part of a generation that chooses careers with clarity, purpose, and confidence.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/ability-test" className="px-8 py-4 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,180,166,0.3)] w-full sm:w-auto">
                Start Ability Test <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/counseling" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-all flex items-center justify-center w-full sm:w-auto">
                Book Counseling
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
