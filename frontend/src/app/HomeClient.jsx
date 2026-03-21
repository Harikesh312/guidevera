"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, animate } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Brain,
  FileText,
  UserCheck,
  ClipboardList,
  MessageCircle,
  BadgeCheck,
  GraduationCap,
  BookOpen,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { requireAuth } from "../lib/authGuard";

const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      if (numericValue === 0) {
        setDisplayValue(0);
        return;
      }
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (val) => {
          setDisplayValue(Math.round(val));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

export default function HomeClient() {
  const router = useRouter();
  const [homeSearch, setHomeSearch] = useState("");

  const handleHomeSearch = () => {
    const query = homeSearch.trim();
    if (query) {
      router.push(`/colleges?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/colleges');
    }
  };

  const colleges = [
    { id: 1, slug: "dbuu", name: "DBUU", courses: "B.Tech | MBA | BHM | BAMS", image: "/images/dbuu.jpg", rating: "4.9" },
    { id: 2, slug: "uttranchal-university", name: "Uttranchal University", courses: "B.Tech | MBA | Law", image: "/images/Uttranchal-University.jpg", rating: "4.8" },
    { id: 4, slug: null, name: "DBS", courses: "Commerce | MBA", image: "/images/DBS.jpg", rating: "4.8" },
    { id: 3, slug: null, name: "Tulas Institute", courses: "Engineering", image: "/images/Tulas-Institute.jpg", rating: "4.7" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] z-10" />
          <div className="absolute inset-0 bg-[#0EB4A6]/5 z-0" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#0EB4A6] mb-6"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>#1 Student-Centric Career Guidance Platform | Solving India's Career Confusion Crisis</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Choose the Right <span className="text-[#0EB4A6]">College</span> for the<br />
            Bright Future
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/60 max-w-2xl text-center mb-12"
          >
            Get expert guidance to select the college and course that matches your goals.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl flex flex-col sm:flex-row items-center bg-zinc-900 border border-white/10 rounded-3xl sm:rounded-full p-2 backdrop-blur-md shadow-2xl mb-12 gap-2"
          >
            <div className="flex-1 flex items-center px-4 py-2 sm:py-0 w-full gap-3">
              <Search className="text-white/40 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search colleges, courses, universities..." 
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 focus:ring-0 text-sm md:text-base" 
                value={homeSearch}
                onChange={(e) => setHomeSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleHomeSearch(); }}
                suppressHydrationWarning
              />
            </div>
            <button onClick={handleHomeSearch} suppressHydrationWarning className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(14,180,166,0.4)] w-full sm:w-auto cursor-pointer">
              Search
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
          >
            <div onClick={() => router.push('/colleges')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><GraduationCap size={18} /> B.Tech</div>
            <div onClick={() => router.push('/colleges')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Brain size={18} /> Science</div>
            <div onClick={() => router.push('/colleges')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Briefcase size={18} /> Law</div>
            <div onClick={() => router.push('/colleges')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><BookOpen size={18} /> MBA</div>
          </motion.div>
        </div>
      </section>

      {/* Top Rated Colleges */}
      <section className="py-24 bg-[#09090b] relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0EB4A6]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Top Rated Colleges</h2>
              <p className="text-white/60 text-lg">
                Browse through our curated list of premier colleges and universities across the region, recognized for academic excellence.
              </p>
            </div>
            <Link href="/colleges" className="flex items-center gap-2 text-[#0EB4A6] hover:text-[#0c9c90] font-medium transition-colors whitespace-nowrap">
              View All Colleges <ChevronRight size={18} />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {colleges.map((college) => (
              <motion.div 
                key={college.id}
                variants={fadeIn}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all hover:border-white/20 hover:shadow-[0_0_30px_rgba(14,180,166,0.1)]"
              >
                <div className="relative h-48 w-full overflow-hidden bg-white/5">
                  <Image 
                    src={college.image} 
                    alt={college.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xs font-bold text-white tracking-wide">{college.rating}</span>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-[#0EB4A6] transition-colors">{college.name}</h3>
                  <p className="text-[#0EB4A6] text-sm font-medium mb-3">{college.courses}</p>
                  
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-6 mt-auto">
                    <MapPin className="w-4 h-4" />
                    <span>Uttarakhand Dehradun</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {college.slug ? (
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
                      >
                        View Details
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl border border-white/5 text-sm font-medium text-white/20 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                    <button 
                      onClick={() => { if (requireAuth('/ability-test')) router.push('/ability-test'); }}
                      className="py-2.5 rounded-xl bg-[#0EB4A6] hover:bg-[#0c9c90] text-sm font-medium text-white transition-colors shadow-[0_4px_14px_rgba(14,180,166,0.3)] cursor-pointer"
                      suppressHydrationWarning
                    >
                      Ability Test
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div 
              variants={fadeIn}
              className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#121214] border border-dashed border-white/20 rounded-2xl p-8 text-center text-white/40 text-lg font-medium flex items-center justify-center"
            >
              More Colleges Coming Soon 🚀
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is Guidevera? */}
      <section className="py-24 relative overflow-hidden bg-[#09090b]">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-last lg:order-first relative h-[400px] md:h-[500px] w-full rounded-4xl overflow-hidden border border-white/10 bg-white/5 p-8 flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-4xl bg-[#e5e7eb] dark:bg-zinc-900 border border-white/5">
                <Image src="/images/students.png" alt="Students learning" fill className="object-cover pl-8 pt-8" />
              </div>
              <div className="relative z-10 bg-[#09090b]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl max-w-sm shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0EB4A6]/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#0EB4A6]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Live Counseling</h4>
                    <p className="text-xs text-white/60">Talk to our experts now</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-first lg:order-last"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                What is <span className="text-[#0EB4A6]">Guidevera</span>?
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                We are more than just a college search engine. Guidevera is a comprehensive platform built to provide students with end-to-end support throughout their academic journey, backed by data-driven insights and expert human counseling.
              </p>
              
              <div className="space-y-8 mb-10">
                {[
                  { icon: <UserCheck className="w-6 h-6 text-[#0EB4A6]" />, title: "Self Discovery", desc: "Understand your strengths, weaknesses, and true passions through our robust assessments." },
                  { icon: <ClipboardList className="w-6 h-6 text-[#0EB4A6]" />, title: "Expert Testing", desc: "Take our carefully crafted psychometric tests to pinpoint the best career options for you." },
                  { icon: <MessageCircle className="w-6 h-6 text-[#0EB4A6]" />, title: "Personal Counseling", desc: "Get one-on-one guidance from expert counselors who understand the academic landscape deeply." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center border border-[#0EB4A6]/20">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/counseling" className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)] inline-flex items-center gap-2">
                Book Counseling <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Guide You */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">How We Guide You</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Our proven process helps you navigate the confusing world of admissions with confidence and clarity.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-white/20" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
              {[
                { step: "1", title: "Apply Test", desc: "Take our advanced psychometric test to analyze your profile.", icon: <FileText className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "2", title: "Get Report", desc: "Receive detailed insights into your strengths and career fit.", icon: <ClipboardList className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "3", title: "Counseling", desc: "Discuss your report with our expert admission counselors.", icon: <MessageCircle className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "4", title: "Choose College", desc: "Select the best-fit college with absolute confidence and clarity.", icon: <BadgeCheck className="w-8 h-8 text-[#0EB4A6]" /> },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center mb-6 relative shadow-[0_0_30px_rgba(14,180,166,0.05)]">
                    <div className="absolute inset-0 rounded-full bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 m-2 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.step}. {item.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { stat: "500+", label: "Admission Sessions" },
              { stat: "20+", label: "College Options" },
              { stat: "250+", label: "Courses" },
              { stat: "90%", label: "Admission Satisfaction Rate" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center text-center pt-8 md:pt-0"
              >
                <h3 className="text-5xl md:text-6xl font-bold text-[#0EB4A6] mb-3"><AnimatedCounter value={item.stat} /></h3>
                <p className="text-lg font-medium text-white/80">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0EB4A6]/10 z-0" />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0EB4A6]/20 blur-[150px] rounded-[100%] z-0" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Ready to Find Your Destination?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Start shaping your future in advance with the standard college search and discovery framework created specifically for dedicated students.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => { if (requireAuth('/ability-test')) router.push('/ability-test'); }}
              className="w-full sm:w-auto px-10 py-4 bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)] border border-[#0EB4A6] cursor-pointer"
              suppressHydrationWarning
            >
              Start Ability Test
            </button>
            <Link href="/counseling" className="w-full sm:w-auto px-10 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-full font-bold transition-all">
              Book Counseling
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
