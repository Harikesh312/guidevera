"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  X,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { requireAuth } from "../lib/authGuard";
import API_URL from "../lib/api";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Other"
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-lg text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#0EB4A6] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-white/60 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

  const [applyModal, setApplyModal] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", course: "", customCourse: "", email: "", state: "" });
  const [formStatus, setFormStatus] = useState("idle");

  const openApplyModal = (college) => {
    setApplyModal(college);
    setForm({ name: "", phone: "", course: (college.coursesList && college.coursesList.length > 0) ? college.coursesList[0] : "Other (Please Specify)", customCourse: "", email: "", state: "" });
    setFormStatus("idle");
  };

  const closeApplyModal = () => { setApplyModal(null); setFormStatus("idle"); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const finalCourse = form.course === "Other (Please Specify)" ? form.customCourse : form.course;
      const res = await fetch(`${API_URL}/api/college-apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, course: finalCourse, collegeName: applyModal.name }),
      });
      const data = await res.json();
      if (data.success) setFormStatus("success");
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  const row1 = [
    { id: 1, name: "DBUU", slug: "dbuu", img: "/images/dbuu.jpg", alt: "DBUU campus - Dev Bhoomi Uttarakhand University Dehradun", rating: "4.3", tag: "TOP RANKED", courses: "B.Tech | MBA | BHM | BAMS", coursesList: ["B.Tech","MBA","BHM","BAMS","BCA","B.Pharm","LLB","B.Sc Agriculture"] },
    { id: 2, name: "Uttranchal University", slug: "uttranchal-university", img: "/images/Uttranchal-University.jpg", alt: "Uttranchal University campus - NAAC A+ college Dehradun", rating: "4.5", tag: "NAAC A+", courses: "B.Tech | MBA | Law", coursesList: ["B.Tech","MBA","BA LLB","B.Pharm","B.Sc Agriculture","BCA","BHM","B.Sc Nursing"] },
    { id: 3, name: "Graphic Era", slug: "graphic-era", img: "/images/graphic-era.jpg", alt: "Graphic Era University campus - NIRF Top 50 college Dehradun", rating: "4.7", tag: "NIRF TOP 50", courses: "B.Tech | BCA | BHM", coursesList: ["B.Tech","MBA","BHM","BCA","BBA","B.Des","LLB","M.Tech"] },
    { id: 4, name: "DBS Global", slug: "dbs-global", img: "/images/DBS.jpg", alt: "DBS Global University campus - Top B-School Dehradun", rating: "4.8", tag: "TOP B-SCHOOL", courses: "MBA | BBA | B.Tech", coursesList: ["MBA","BBA","B.Tech AI/ML","BCA","B.Com","B.Sc Agriculture","LLB","B.Pharm"] },
    { id: 5, name: "Tulas Institute", slug: "tulas-institute", img: "/images/Tulas-Institute.jpg", alt: "Tulas Institute campus - NAAC A+ engineering college Dehradun", rating: "4.7", tag: "NAAC A+", courses: "B.Tech | BCA | MBA", coursesList: ["B.Tech","MBA","BBA","BCA","MCA","B.Sc Agriculture","B.Pharm"] },
    { id: 6, name: "ITM Dehradun", slug: "itm-dehradun", img: "/images/itm.jpg", alt: "ITM Dehradun campus - AICTE approved IT college", rating: "4.5", tag: "AICTE APPROVED", courses: "BCA | B.Sc IT | MBA", coursesList: ["BCA","BBA","B.Sc IT","BHM","B.Sc Animation","B.Com","MCA","M.Sc IT"] }
  ];

  const row2 = [
    { id: 7, name: "Shivalik College", slug: "shivalik-college", img: "/images/shivalik-college.jpg", alt: "Shivalik College of Engineering campus - Dehradun", rating: "4.6", tag: "NAAC A+", courses: "B.Tech | M.Tech | BCA", coursesList: ["B.Tech","M.Tech","BCA","MBA","BBA","B.Pharm","B.Sc Agriculture","B.Ed"] },
    { id: 8, name: "IMS Unision", slug: "ims-unision", img: "/images/DBS.jpg", alt: "IMS Unision University campus - Top B-School Dehradun", rating: "4.6", tag: "TOP B-SCHOOL", courses: "MBA | BBA | BA LLB", coursesList: ["MBA","BBA","BA LLB","BBA LLB","LLM","BHM","BCA","BAJMC","B.Com"] },
    { id: 9, name: "Dolphin Institute", slug: "dolphin-institute", img: "/images/Dolphin-college.jpg", alt: "Dolphin Institute campus - NAAC A+ Dehradun", rating: "4.7", tag: "NAAC A+", courses: "BPT | B.Sc Agriculture", coursesList: ["BPT","B.Sc Biotechnology","B.Sc Agriculture","B.Sc Forestry","B.Sc MLT","B.Ed","MPT","M.Sc Microbiology"] },
    { id: 10, name: "JBIT Dehradun", slug: "jbit-dehradun", img: "/images/Tulas-Institute.jpg", alt: "JBIT Dehradun campus - engineering college Uttarakhand", rating: "4.5", tag: "AICTE APPROVED", courses: "B.Tech | BCA | Pharmacy", coursesList: ["B.Tech","M.Tech","MBA","BBA","B.Pharm","D.Pharm","B.Sc Agriculture","Diploma"] },
    { id: 11, name: "Alpine College", slug: null, img: "/images/DBS.jpg", alt: "Alpine College campus - Dehradun", rating: "4.4", tag: "COMING SOON", courses: "Diploma | Engineering", coursesList: [] },
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
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 35s linear infinite; }
        .marquee-group { display: flex; min-width: max-content; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <Navbar />

      {/* Apply Now Modal */}
      <AnimatePresence>
        {applyModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && closeApplyModal()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md relative"
            >
              <button onClick={closeApplyModal} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>

              {formStatus === "success" ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-[#0EB4A6] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-white/60">We'll call you within 24 hours!</p>
                  <button onClick={closeApplyModal} className="mt-6 px-6 py-2.5 bg-[#0EB4A6] text-black font-semibold rounded-full">Done</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-1">Apply Now</h3>
                  <p className="text-white/50 text-sm mb-6">{applyModal.name}</p>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50" placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                    <input required type="tel" pattern="[0-9]{10}" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50" placeholder="Phone Number (10 digits)" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                    <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0EB4A6]/50 min-touch" value={form.course} onChange={e => setForm(f => ({...f, course: e.target.value}))}>
                      {(applyModal.coursesList || []).map(c => <option key={c} value={c} className="bg-[#121214]">{c}</option>)}
                      <option value="Other (Please Specify)" className="bg-[#121214]">Other (Please Specify)</option>
                    </select>
                    {form.course === "Other (Please Specify)" && (
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50 min-touch" placeholder="Please specify your course" value={form.customCourse} onChange={e => setForm(f => ({...f, customCourse: e.target.value}))} />
                    )}
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50" placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                    <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0EB4A6]/50" value={form.state} onChange={e => setForm(f => ({...f, state: e.target.value}))}>
                      <option value="" className="bg-[#121214]">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s} className="bg-[#121214]">{s}</option>)}
                    </select>
                    {formStatus === "error" && <p className="text-red-400 text-xs">Failed to submit. Please try again.</p>}
                    <button type="submit" disabled={formStatus === "loading"} className="w-full py-3.5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)] disabled:opacity-50">
                      {formStatus === "loading" ? "Submitting..." : "Request Callback"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-14 lg:pt-48 lg:pb-20 overflow-hidden">
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
            India's #1 <span className="text-[#0EB4A6]">Career Guidance</span> Platform — Find the Right College & Course
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-xl text-white/60 max-w-2xl text-center mb-12"
          >
            Get expert career counseling, take a psychometric ability test, and discover the best colleges in Uttarakhand & across India — all in one place.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl flex flex-col sm:flex-row items-center bg-zinc-900 border border-white/10 rounded-3xl sm:rounded-full p-2 backdrop-blur-md shadow-2xl mb-12 gap-2"
          >
            <div className="flex-1 flex items-center px-4 py-3 sm:py-0 w-full gap-3">
              <Search className="text-white/40 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search colleges, courses, universities..." 
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 focus:ring-0 text-base" 
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
      <section className="pt-12 pb-22 md:py-24 bg-[#09090b] relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0EB4A6]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Top Rated Colleges in Uttarakhand & India</h2>
              <p className="text-white/60 text-lg">
                Explore our handpicked list of NAAC A+, NIRF-ranked, and AICTE-approved colleges across Uttarakhand offering B.Tech, MBA, BCA, Law, and more.
              </p>
            </div>
            <Link href="/colleges" className="hidden md:flex items-center gap-2 text-[#0EB4A6] hover:text-[#0c9c90] font-medium transition-colors whitespace-nowrap">
              View All Colleges <ChevronRight size={18} />
            </Link>
          </div>

          {/* Desktop Static Grid (4 Colleges) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[row1[0], row1[1], row1[2], row2[1]].map((col, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:bg-white/[0.07] transition-all hover:border-white/20"
              >
                <div className="relative w-full h-40 bg-[#121214] overflow-hidden">
                  <Image src={col.img} alt={col.alt || col.name} fill sizes="288px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent opacity-90" />
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#0EB4A6] text-black px-2 py-0.5 rounded tracking-wide z-10">{col.tag}</span>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-[10px] text-white/90 font-bold">{col.rating}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-white text-lg font-bold leading-tight line-clamp-1 mb-1">{col.name}</h3>
                  <p className="text-[#0EB4A6] text-xs font-medium mb-4">{col.courses}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {col.slug ? (
                      <Link href={`/colleges/${col.slug}`} className="w-full py-2 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors text-center cursor-pointer min-touch flex items-center justify-center">
                        View Details
                      </Link>
                    ) : (
                      <button disabled className="w-full py-2 rounded-lg border border-white/5 text-xs font-medium text-white/20 cursor-not-allowed">
                        Coming Soon
                      </button>
                    )}
                    
                    {col.slug ? (
                      <button onClick={() => openApplyModal(col)} className="w-full py-2 rounded-lg bg-[#0EB4A6] hover:bg-[#0c9c90] text-black text-xs font-bold transition-colors shadow-[0_2px_10px_rgba(14,180,166,0.3)] min-touch flex items-center justify-center cursor-pointer">
                        Apply Now
                      </button>
                    ) : (
                      <button disabled className="w-full py-2 rounded-lg bg-white/5 text-black text-xs font-bold cursor-not-allowed text-white/20">
                        Waitlist
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden mt-4 overflow-hidden w-full relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

            {/* Row 1 — scrolls LEFT */}
            <div className="flex marquee-group animate-marquee hover:[animation-play-state:paused] pb-4">
              {[...row1, ...row1].map((col, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-64 md:w-72 mx-3 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:bg-white/[0.07] transition-all hover:border-white/20"
                >
                  <div className="relative w-full h-36 md:h-40 bg-[#121214] overflow-hidden">
                    <Image src={col.img} alt={col.alt || col.name} fill sizes="288px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent opacity-90" />
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#0EB4A6] text-black px-2 py-0.5 rounded tracking-wide z-10">{col.tag}</span>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1 z-10">
                      <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                      <span className="text-[10px] text-white/90 font-bold">{col.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-white text-base md:text-lg font-bold leading-tight line-clamp-1 mb-1">{col.name}</h3>
                    <p className="text-[#0EB4A6] text-xs font-medium mb-4">{col.courses}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      {col.slug ? (
                        <Link href={`/colleges/${col.slug}`} className="w-full py-2 rounded-lg border border-white/10 text-[11px] md:text-xs font-medium hover:bg-white/10 transition-colors text-center cursor-pointer min-touch flex items-center justify-center">
                          View Details
                        </Link>
                      ) : (
                        <button disabled className="w-full py-2 rounded-lg border border-white/5 text-[11px] md:text-xs font-medium text-white/20 cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                      
                      {col.slug ? (
                        <button onClick={() => router.push(`/colleges/${col.slug}`)} className="w-full py-2 rounded-lg bg-[#0EB4A6] hover:bg-[#0c9c90] text-black text-[11px] md:text-xs font-bold transition-colors shadow-[0_2px_10px_rgba(14,180,166,0.3)] min-touch flex items-center justify-center cursor-pointer">
                          Apply Now
                        </button>
                      ) : (
                        <button disabled className="w-full py-2 rounded-lg bg-white/5 text-black text-[11px] md:text-xs font-bold cursor-not-allowed text-white/20">
                          Waitlist
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 — scrolls RIGHT */}
            <div className="flex marquee-group animate-marquee-reverse hover:[animation-play-state:paused] pb-2">
              {[...row2, ...row2].map((col, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-64 md:w-72 mx-3 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:bg-white/[0.07] transition-all hover:border-white/20"
                >
                  <div className="relative w-full h-36 md:h-40 bg-[#121214] overflow-hidden">
                    <Image src={col.img} alt={col.alt || col.name} fill sizes="288px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent opacity-90" />
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-[#0EB4A6] text-black px-2 py-0.5 rounded tracking-wide z-10">{col.tag}</span>
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1 z-10">
                      <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                      <span className="text-[10px] text-white/90 font-bold">{col.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-white text-base md:text-lg font-bold leading-tight line-clamp-1 mb-1">{col.name}</h3>
                    <p className="text-[#0EB4A6] text-xs font-medium mb-4">{col.courses}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      {col.slug ? (
                        <Link href={`/colleges/${col.slug}`} className="w-full py-2 rounded-lg border border-white/10 text-[11px] md:text-xs font-medium hover:bg-white/10 transition-colors text-center cursor-pointer min-touch flex items-center justify-center">
                          View Details
                        </Link>
                      ) : (
                        <button disabled className="w-full py-2 rounded-lg border border-white/5 text-[11px] md:text-xs font-medium text-white/20 cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                      
                      {col.slug ? (
                        <button onClick={() => router.push(`/colleges/${col.slug}`)} className="w-full py-2 rounded-lg bg-[#0EB4A6] hover:bg-[#0c9c90] text-black text-[11px] md:text-xs font-bold transition-colors shadow-[0_2px_10px_rgba(14,180,166,0.3)] min-touch flex items-center justify-center cursor-pointer">
                          Apply Now
                        </button>
                      ) : (
                        <button disabled className="w-full py-2 rounded-lg bg-white/5 text-black text-[11px] md:text-xs font-bold cursor-not-allowed text-white/20">
                          Waitlist
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden flex justify-center mt-6 pb-2 relative z-20">
              <Link href="/colleges" className="flex items-center gap-2 text-sm font-medium text-[#0EB4A6] hover:text-[#0c9c90] bg-[#0EB4A6]/5 border border-[#0EB4A6]/20 hover:bg-[#0EB4A6]/10 px-8 py-3 rounded-full transition-all active:scale-95 cursor-pointer">
                View All Colleges <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Guidevera? */}
      <section className="pt-2 pb-24 md:py-24 relative overflow-hidden bg-[#09090b]">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="block lg:hidden text-4xl sm:text-5xl font-bold mb-8 tracking-tight"
          >
            What is <span className="text-[#0EB4A6]">Guidevera</span>?
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-[350px] md:h-[500px] w-full rounded-4xl overflow-hidden border border-white/10 bg-white/5 p-5 sm:p-8 flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-4xl bg-[#e5e7eb] dark:bg-zinc-900 border border-white/5">
                <Image src="/images/students.png" alt="Students getting career guidance at Guidevera" fill className="object-cover object-top sm:object-center sm:pl-8 sm:pt-8" />
              </div>
              <div className="relative z-10 bg-[#09090b]/80 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl max-w-[240px] sm:max-w-sm shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EB4A6]/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#0EB4A6]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm">Live Counseling</h4>
                    <p className="text-[10px] sm:text-xs text-white/60">Talk to our experts now</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="hidden lg:block text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                What is <span className="text-[#0EB4A6]">Guidevera</span>?
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Guidevera is India's most student-focused career guidance platform. We help Class 12 pass-outs, graduates, and confused students identify the right career path using scientifically designed psychometric tests, expert one-on-one counseling, and a curated database of top colleges across Uttarakhand and India. Whether you're choosing between B.Tech, MBA, BCA, Law, or Medicine — Guidevera gives you the data and guidance to decide with confidence.
              </p>
              
              <div className="space-y-8 mb-10">
                {[
                  { icon: <UserCheck className="w-6 h-6 text-[#0EB4A6]" />, title: "Career Self Discovery Test", desc: "Understand your strengths, weaknesses, and true passions through our robust assessments." },
                  { icon: <ClipboardList className="w-6 h-6 text-[#0EB4A6]" />, title: "Psychometric Ability Test for Students", desc: "Take our carefully crafted psychometric tests to pinpoint the best career options for you." },
                  { icon: <MessageCircle className="w-6 h-6 text-[#0EB4A6]" />, title: "One-on-One Career Counseling by Experts", desc: "Get one-on-one guidance from expert counselors who understand the academic landscape deeply." },
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
                { step: "1", title: "Take the Ability Test", desc: "Take Guidevera's scientifically designed psychometric test to analyze your skills, interests, and personality traits.", icon: <FileText className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "2", title: "Get Your Career Report", desc: "Receive a detailed, personalized report highlighting your strongest career options and best-fit college streams.", icon: <ClipboardList className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "3", title: "Talk to a Counselor", desc: "Book a one-on-one session with our expert admission counselors who understand colleges across India deeply.", icon: <MessageCircle className="w-8 h-8 text-[#0EB4A6]" /> },
                { step: "4", title: "Choose Your College", desc: "Select the right college and course with full confidence — backed by data, expert advice, and real student outcomes.", icon: <BadgeCheck className="w-8 h-8 text-[#0EB4A6]" /> },
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
              { stat: "90%", label: "Admission Satisfaction Rate", link: "#student-stories" },
            ].map((item, i) => {
              const content = (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col items-center justify-center text-center pt-8 md:pt-0 ${item.link ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                >
                  <h3 className="text-5xl md:text-6xl font-bold text-[#0EB4A6] mb-3"><AnimatedCounter value={item.stat} /></h3>
                  <p className="text-lg font-medium text-white/80">{item.label}</p>
                </motion.div>
              );

              return item.link ? (
                <Link key={i} href={item.link}>{content}</Link>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Stories Section */}
      <section id="student-stories" className="py-24 bg-[#121214] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0EB4A6]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">What Our Students Say 💬</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Real stories from students who found their true calling with Guidevera.
            </p>
          </div>

          <div className="overflow-hidden w-full relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#121214] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#121214] to-transparent z-10" />
            
            <div className="flex marquee-group animate-marquee hover:[animation-play-state:paused] pb-4">
              {[...[
                { name: "Riya Sharma", detail: "B.Tech CSE, DBUU", stars: 5, quote: "I was completely confused between engineering and design. Guidevera's ability test gave me clarity about where my true skills lie." },
                { name: "Arjun Mehta", detail: "MBA, DBS Global University", stars: 5, quote: "The counseling session helped me choose between 3 MBA colleges. Best decision of my life, got into an amazing corporate role." },
                { name: "Priya Negi", detail: "BHM, Graphic Era", stars: 4, quote: "Coming from a small town, I had no idea which hospitality college to pick. Guidevera mapped it perfectly according to my budget and goals." },
                { name: "Karan Bisht", detail: "BCA, ITM Dehradun", stars: 5, quote: "The AI roadmap showed me which certifications to do alongside my BCA. Got placed at ₹4 LPA directly from campus!" },
                { name: "Sneha Rawat", detail: "BAMS, Uttranchal University", stars: 4, quote: "I was being pushed toward engineering by family. Guidevera helped me stand my ground with data. I'm thriving in medicine now." }
              ], ...[
                { name: "Riya Sharma", detail: "B.Tech CSE, DBUU", stars: 5, quote: "I was completely confused between engineering and design. Guidevera's ability test gave me clarity about where my true skills lie." },
                { name: "Arjun Mehta", detail: "MBA, DBS Global University", stars: 5, quote: "The counseling session helped me choose between 3 MBA colleges. Best decision of my life, got into an amazing corporate role." },
                { name: "Priya Negi", detail: "BHM, Graphic Era", stars: 4, quote: "Coming from a small town, I had no idea which hospitality college to pick. Guidevera mapped it perfectly according to my budget and goals." },
                { name: "Karan Bisht", detail: "BCA, ITM Dehradun", stars: 5, quote: "The AI roadmap showed me which certifications to do alongside my BCA. Got placed at ₹4 LPA directly from campus!" },
                { name: "Sneha Rawat", detail: "BAMS, Uttranchal University", stars: 4, quote: "I was being pushed toward engineering by family. Guidevera helped me stand my ground with data. I'm thriving in medicine now." }
              ]].map((story, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-[85vw] sm:w-[400px] mx-3 bg-[#09090b] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#0EB4A6]/30 transition-colors shadow-lg"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(story.stars)].map((_, starId) => (
                        <Star key={starId} className="w-4 h-4 fill-[#0EB4A6] text-[#0EB4A6]" />
                      ))}
                      {[...Array(5 - story.stars)].map((_, starId) => (
                        <Star key={starId} className="w-4 h-4 text-white/20" />
                      ))}
                    </div>
                    <p className="text-white/80 leading-relaxed mb-6 italic">&ldquo;{story.quote}&rdquo;</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{story.name}</h4>
                    <p className="text-sm text-[#0EB4A6]">{story.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-white/60 text-lg">
              Everything you need to know about Guidevera.
            </p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="What is Guidevera?" 
              answer="Guidevera is India's #1 student-centric career guidance platform that helps students find the right college and career path through psychometric tests, data-driven insights, and expert one-on-one counseling." 
            />
            <FAQItem 
              question="How does the ability test work?" 
              answer="You take a carefully crafted psychometric test that analyzes your strengths, interests, and personality. You then receive a detailed report and can discuss it one-on-one with an expert counselor." 
            />
            <FAQItem 
              question="Which colleges are listed on Guidevera?" 
              answer="We list top-rated colleges across Uttarakhand and India — including Graphic Era (NIRF Top 50), Uttranchal University (NAAC A+), DBS Global, Tulas Institute, and more." 
            />
            <FAQItem 
              question="Is Guidevera free to use?" 
              answer="College browsing and platform exploration are completely free. Premium one-on-one counseling sessions are also available — visit our Counseling page for details." 
            />
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
            Start Your Career Journey Today — Free Ability Test & Expert Counseling
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of students across India who found their perfect college and career path with Guidevera. Take the free ability test now or book a counseling session today.
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
