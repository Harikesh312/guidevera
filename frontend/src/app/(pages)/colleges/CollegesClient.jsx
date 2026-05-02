"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Star, ChevronDown, ArrowRight, Filter, Search as SearchIcon, ChevronLeft, X, CheckCircle, GraduationCap, Briefcase, BookOpen, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import API_URL from "@/lib/api";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Other"
];

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-base text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#0EB4A6] transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
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

export default function CollegesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [applyModal, setApplyModal] = useState(null); // college object
  const [form, setForm] = useState({ name: "", phone: "", course: "", customCourse: "", email: "", state: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchInput(query);
      setAppliedSearchQuery(query);
    }
  }, [searchParams]);

  const colleges = [
    {
      id: 1, slug: "dev-bhoomi-uttarakhand-university-dehradun", name: "DBUU", location: "Uttarakhand, Dehradun",
      alt: "Dev Bhoomi Uttarakhand University Dehradun - Top College for B.Tech MBA BAMS",
      description: "A premier university offering diverse programs in B.Tech, MBA, BHM, and BAMS.",
      feeLabel: "Average Fees", fee: "₹1.5L – 2.0L/yr", image: "/images/dbuu.jpg", rating: "4.3", tag: "TOP RANKED",
      courses: ["B.Tech","MBA","BHM","BAMS","BCA","B.Pharm","LLB","B.Sc Agriculture"]
    },
    {
      id: 2, slug: "uttaranchal-university-dehradun", name: "Uttaranchal University", location: "Uttarakhand, Dehradun",
      alt: "Uttaranchal University Dehradun - NAAC A+ College for B.Tech MBA Law",
      description: "NAAC A+ accredited. Known for B.Tech, MBA, Law, and Agriculture across the region.",
      feeLabel: "Average Fees", fee: "₹1.8L – 2.5L/yr", image: "/images/Uttranchal-University.jpg", rating: "4.5", tag: "NAAC A+",
      courses: ["B.Tech","MBA","BA LLB","B.Pharm","B.Sc Agriculture","BCA","BHM","B.Sc Nursing"]
    },
    {
      id: 3, slug: "graphic-era-university-dehradun", name: "Graphic Era University", location: "Uttarakhand, Dehradun",
      alt: "Graphic Era University Dehradun - Top NAAC A+ College for B.Tech BCA BHM",
      description: "NIRF Top 50 University. NAAC A+ accredited. Famous for B.Tech, MBA, and outstanding placement records.",
      feeLabel: "Average Fees", fee: "₹2.5L – 3.5L/yr", image: "/images/graphic-era.jpg", rating: "4.7", tag: "NIRF TOP 50",
      courses: ["B.Tech","MBA","BHM","BCA","BBA","B.Des","LLB","M.Tech"]
    },
    {
      id: 4, slug: "dbs-global-university-dehradun", name: "DBS Global University", location: "Uttarakhand, Dehradun",
      alt: "DBS Global University Dehradun - Top B-School for MBA BBA B.Tech",
      description: "Formerly Doon Business School, now a full university (2024). #6 Best Pvt B-School Value for Money – Business Today.",
      feeLabel: "Average Fees", fee: "₹3.0L – 4.0L/yr", image: "/images/DBS.jpg", rating: "4.8", tag: "TOP B-SCHOOL",
      courses: ["MBA","BBA","B.Tech AI/ML","BCA","B.Com","B.Sc Agriculture","LLB","B.Pharm"]
    },
    {
      id: 5, slug: "tulas-institute-dehradun", name: "Tulas Institute", location: "Uttarakhand, Dehradun",
      alt: "Tulas Institute Dehradun - NAAC A+ College for B.Tech BCA MBA",
      description: "NAAC A+, NBA Accredited. Top 50 Private Engineering Colleges India. Microsoft Innovation Centre + Remote Robotics Lab Germany.",
      feeLabel: "Average Fees", fee: "₹1.5L – 1.8L/yr", image: "/images/Tulas-Institute.jpg", rating: "4.7", tag: "NAAC A+",
      courses: ["B.Tech","MBA","BBA","BCA","MCA","B.Sc Agriculture","B.Pharm"]
    },
    {
      id: 7, slug: "shivalik-college-of-engineering-dehradun", name: "Shivalik College of Engineering", location: "Uttarakhand, Dehradun",
      alt: "Shivalik College of Engineering Dehradun - NAAC A+ for B.Tech M.Tech BCA",
      description: "IIT Roorkee, IIT Bombay, IIT Ropar partnerships. 92% placement, Highest ₹42 LPA.",
      feeLabel: "Average Fees", fee: "₹1.2L – 1.8L/yr", image: "/images/shivalik-college.jpg", rating: "4.6", tag: "NAAC A+",
      courses: ["B.Tech","M.Tech","BCA","MBA","BBA","B.Pharm","B.Sc Agriculture","B.Ed"]
    },
    {
      id: 8, slug: "ims-unision-university-dehradun", name: "IMS Unision University", location: "Uttarakhand, Dehradun",
      alt: "IMS Unision University Dehradun - Top B-School for MBA BBA BA LLB",
      description: "28 years of legacy. Times B-School #8 Private, #5 Placements. 95% placement, Highest ₹16.65 LPA.",
      feeLabel: "Average Fees", fee: "₹2.0L – 3.0L/yr", image: "/images/ims.jpg", rating: "4.6", tag: "TOP B-SCHOOL",
      courses: ["MBA","BBA","BA LLB","BBA LLB","LLM","BHM","BCA","BAJMC","B.Com"]
    },
    {
      id: 9, slug: "dolphin-institute-dehradun", name: "Dolphin Institute", location: "Uttarakhand, Dehradun",
      alt: "Dolphin Institute Dehradun - NAAC A+ College for BPT BSc Agriculture",
      description: "NAAC A+ 2nd cycle. First self-financed autonomous institute of Uttarakhand. Paramedical, Physiotherapy, Biotechnology, Agriculture.",
      feeLabel: "Average Fees", fee: "₹80K – 1.5L/yr", image: "/images/Dolphin-college.jpg", rating: "4.7", tag: "NAAC A+",
      courses: ["BPT","B.Sc Biotechnology","B.Sc Agriculture","B.Sc Forestry","B.Sc MLT","B.Ed","MPT","M.Sc Microbiology"]
    },
    {
      id: 10, slug: "jbit-dehradun", name: "JBIT Dehradun", location: "Uttarakhand, Dehradun",
      alt: "JBIT Dehradun - AICTE Approved College for B.Tech BCA Pharmacy",
      description: "25-acre campus. B.Tech, BCA, B.Pharma, Agriculture, MBA. 83%+ placement. Highest ₹30 LPA, 150+ MNC recruiters.",
      feeLabel: "Average Fees", fee: "₹1.0L – 1.8L/yr", image: "/images/jbit.jpg", rating: "4.5", tag: "AICTE APPROVED",
      courses: ["B.Tech","M.Tech","MBA","BBA","B.Pharm","D.Pharm","B.Sc Agriculture","Diploma"]
    },
    {
      id: 6, slug: "itm-university-dehradun", name: "ITM Dehradun", location: "Uttarakhand, Dehradun",
      alt: "ITM Dehradun - AICTE Approved College for BCA BSc IT MBA",
      description: "Uttarakhand's pioneering IT institution since 2002. AICTE approved, Microsoft Lead Institute of Academic Excellence.",
      feeLabel: "Average Fees", fee: "₹90K – 1.0L/yr", image: "/images/itm.jpg", rating: "4.5", tag: "AICTE APPROVED",
      courses: ["BCA","BBA","B.Sc IT","BHM","B.Sc Animation","B.Com","MCA","M.Sc IT"]
    },
    {
      id: 11, slug: null, name: "Alpine College", location: "Uttarakhand, Dehradun",
      description: "Coming soon on Guidevera. Contact the college directly for admission details.",
      feeLabel: "Average Fees", fee: "Contact College", image: "/images/alpine.jpg", rating: "4.4", tag: "COMING SOON",
      courses: []
    },
  ];

  const handleSearch = () => setAppliedSearchQuery(searchInput);
  const handleBackToAll = () => { setSearchInput(""); setAppliedSearchQuery(""); };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()) ||
    college.description.toLowerCase().includes(appliedSearchQuery.toLowerCase())
  );

  const openApplyModal = (college) => {
    setApplyModal(college);
    setForm({ name: "", phone: "", course: college.courses[0] || "Other (Please Specify)", customCourse: "", email: "", state: "" });
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

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white pb-0">
      <Navbar />

      {/* Apply Now Modal */}
      <AnimatePresence>
        {applyModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
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
                      {applyModal.courses.map(c => <option key={c} value={c} className="bg-[#121214]">{c}</option>)}
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

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {appliedSearchQuery && (
          <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={handleBackToAll}
            className="mb-6 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/20 rounded-full px-4 py-2 text-sm flex items-center gap-2 transition-all cursor-pointer">
            <ChevronLeft className="w-4 h-4" /> Back to All Colleges
          </motion.button>
        )}

        {!appliedSearchQuery && (
          <div className="text-center mb-10 mt-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0EB4A6]/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4 tracking-tight relative z-10">
              Top Colleges in Dehradun &amp; Uttarakhand<br /><span className="text-[#0EB4A6]">Compare &amp; Find Your Best Fit</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-base max-w-3xl mx-auto relative z-10">
              Browse our curated list of NAAC A+, NIRF-ranked, and AICTE-approved colleges across Uttarakhand. Compare courses, fees, placements, and find the college that matches your goals — all in one place.
            </motion.p>
          </div>
        )}

        {/* Intro Paragraph */}
        {!appliedSearchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="max-w-4xl mx-auto mb-10 relative z-10">
            <p className="text-white/50 text-sm md:text-base leading-relaxed text-center">
              Finding the right college in Uttarakhand can be overwhelming — hundreds of options, different courses, varying fees, and confusing rankings. Guidevera simplifies this for you. We have carefully curated the best NAAC A+, NIRF-ranked, and AICTE-approved colleges across Dehradun, Haridwar, and Uttarakhand — covering B.Tech, MBA, BCA, Law, Hotel Management, Medical, and more. Use our filters to shortlist by course, city, or ranking — or take our free psychometric ability test to get a personalized college recommendation.
            </p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className={`max-w-3xl mx-auto relative z-10 ${appliedSearchQuery ? 'mb-8 mt-0' : 'mb-8'}`}>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 md:py-4 backdrop-blur-md shadow-2xl transition-all focus-within:border-[#0EB4A6]/50 focus-within:bg-white/10">
            <SearchIcon className="w-5 h-5 text-[#0EB4A6] flex-shrink-0" />
            <input type="text" placeholder="Search college by name, fees, city or course"
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 focus:ring-0 text-sm md:text-base"
              value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            <button onClick={handleSearch} className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-white p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {!appliedSearchQuery && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-white/40"
            >
              <button onClick={() => { setSearchInput('B.Tech'); setAppliedSearchQuery('B.Tech'); }} className="flex items-center gap-2 hover:text-[#0EB4A6] transition-colors group">
                <GraduationCap size={16} className="group-hover:scale-110 transition-transform" /> B.Tech
              </button>
              <button onClick={() => { setSearchInput('Medical'); setAppliedSearchQuery('Medical'); }} className="flex items-center gap-2 hover:text-[#0EB4A6] transition-colors group">
                <Stethoscope size={16} className="group-hover:scale-110 transition-transform" /> Medical
              </button>
              <button onClick={() => { setSearchInput('Law'); setAppliedSearchQuery('Law'); }} className="flex items-center gap-2 hover:text-[#0EB4A6] transition-colors group">
                <Briefcase size={16} className="group-hover:scale-110 transition-transform" /> Law
              </button>
              <button onClick={() => { setSearchInput('MBA'); setAppliedSearchQuery('MBA'); }} className="flex items-center gap-2 hover:text-[#0EB4A6] transition-colors group">
                <BookOpen size={16} className="group-hover:scale-110 transition-transform" /> MBA
              </button>
            </motion.div>
          )}
        </motion.div>


        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-white/5">
          <p className="font-semibold">Top Dehradun &amp; Uttarakhand Colleges</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="text-white/50 text-sm">Sort by:</span>
            <button className="text-[#0EB4A6] text-sm font-medium flex items-center gap-1 hover:text-[#0c9c90]">
              Popularity <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredColleges.map((college, index) => (
            <motion.div key={college.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}
              className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-white/10 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(14,180,166,0.05)]">
              <div className="relative h-[180px] md:h-[240px] w-full bg-[#1a1a1c] overflow-hidden group">
                <Image src={college.image} alt={college.alt || college.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3 bg-[#0EB4A6] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-widest z-10 shadow-lg">{college.tag}</div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10 z-10">
                  <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                  <span className="text-xs font-bold text-white tracking-wide">{college.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col bg-[#121214]">
                <h3 className="text-xl font-bold mb-1.5 tracking-tight">{college.name}</h3>
                <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5" /><span>{college.location}</span>
                </div>
                <p className="text-white/60 text-sm mb-6 leading-relaxed flex-1">{college.description}</p>

                <div className="flex items-center justify-between pt-4 pb-5 border-t border-white/5">
                  <span className="text-xs text-white/50 bg-[#1a1a1c] px-2 py-1 rounded">{college.feeLabel}</span>
                  <span className="font-bold text-[#0EB4A6] tracking-wide text-lg">{college.fee}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {college.slug ? (
                    <Link href={`/colleges/${college.slug}`}
                      className="py-2.5 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/5 transition-colors text-white text-center flex items-center justify-center">
                      View Details
                    </Link>
                  ) : (
                    <button disabled className="py-2.5 rounded-lg border border-white/5 text-xs font-semibold text-white/20 cursor-not-allowed">Coming Soon</button>
                  )}
                  {college.slug ? (
                    <button onClick={() => openApplyModal(college)}
                      className="py-2.5 rounded-lg bg-[#0EB4A6] hover:bg-[#0c9c90] text-xs font-semibold text-white transition-colors shadow-[0_4px_14px_rgba(14,180,166,0.3)] cursor-pointer">
                      Apply Now
                    </button>
                  ) : (
                    <button disabled className="py-2.5 rounded-lg bg-white/5 text-xs font-semibold text-white/20 cursor-not-allowed">Apply Now</button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-20">
            <SearchIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-white/50 text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>

      {/* FAQ Section */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Frequently Asked Questions — <span className="text-[#0EB4A6]">Colleges in Dehradun &amp; Uttarakhand</span></h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Which are the top colleges in Dehradun?", a: "The top colleges in Dehradun include Graphic Era University (NIRF Top 50), Uttaranchal University (NAAC A+), Dev Bhoomi Uttarakhand University, DBS Global University, Tulas Institute, IMS Unision University, ITM Dehradun, and Shivalik College of Engineering." },
              { q: "Which colleges in Uttarakhand have NAAC A+ rating?", a: "NAAC A+ rated colleges in Uttarakhand include Uttaranchal University, Tulas Institute, Shivalik College of Engineering, and Dolphin Institute." },
              { q: "Which are the best MBA colleges in Dehradun?", a: "The best MBA colleges in Dehradun include DBS Global University, IMS Unision University, Uttaranchal University, DBUU, and Tulas Institute — all listed on Guidevera with complete details." },
              { q: "How do I choose the right college in Uttarakhand?", a: "Guidevera helps you choose the right college through a psychometric ability test, personalized career report, and one-on-one expert counseling — so your college choice is backed by data and not just guesswork." },
              { q: "Which are the best B.Tech colleges in Dehradun?", a: "The best B.Tech colleges in Dehradun include Graphic Era University, Uttaranchal University, DBUU, Tulas Institute, Shivalik College, and ITM Dehradun — all AICTE approved with strong placement records." },
            ].map((faq, i) => (
              <FAQAccordion key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Schema: ItemList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top Colleges in Dehradun & Uttarakhand",
        "description": "Curated list of top NAAC A+, NIRF-ranked and AICTE-approved colleges in Uttarakhand",
        "url": "https://guidevera.com/colleges",
        "numberOfItems": 10,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Graphic Era University", "url": "https://guidevera.com/colleges/graphic-era-university-dehradun" },
          { "@type": "ListItem", "position": 2, "name": "Uttaranchal University", "url": "https://guidevera.com/colleges/uttaranchal-university-dehradun" },
          { "@type": "ListItem", "position": 3, "name": "Dev Bhoomi Uttarakhand University", "url": "https://guidevera.com/colleges/dev-bhoomi-uttarakhand-university-dehradun" },
          { "@type": "ListItem", "position": 4, "name": "DBS Global University", "url": "https://guidevera.com/colleges/dbs-global-university-dehradun" },
          { "@type": "ListItem", "position": 5, "name": "Tulas Institute", "url": "https://guidevera.com/colleges/tulas-institute-dehradun" },
          { "@type": "ListItem", "position": 6, "name": "IMS Unision University", "url": "https://guidevera.com/colleges/ims-unision-university-dehradun" },
          { "@type": "ListItem", "position": 7, "name": "ITM University Dehradun", "url": "https://guidevera.com/colleges/itm-university-dehradun" },
          { "@type": "ListItem", "position": 8, "name": "Shivalik College of Engineering", "url": "https://guidevera.com/colleges/shivalik-college-of-engineering-dehradun" },
          { "@type": "ListItem", "position": 9, "name": "Dolphin Institute", "url": "https://guidevera.com/colleges/dolphin-institute-dehradun" },
          { "@type": "ListItem", "position": 10, "name": "JBIT Dehradun", "url": "https://guidevera.com/colleges/jbit-dehradun" },
        ]
      })}} />

      {/* Schema: FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Which are the top colleges in Dehradun?", "acceptedAnswer": { "@type": "Answer", "text": "Top colleges in Dehradun include Graphic Era University (NIRF Top 50), Uttaranchal University (NAAC A+), DBUU, DBS Global University, Tulas Institute, IMS Unision, ITM Dehradun, and Shivalik College." } },
          { "@type": "Question", "name": "Which colleges in Uttarakhand have NAAC A+ rating?", "acceptedAnswer": { "@type": "Answer", "text": "NAAC A+ rated colleges include Uttaranchal University, Tulas Institute, Shivalik College of Engineering, and Dolphin Institute." } },
          { "@type": "Question", "name": "Which are the best MBA colleges in Dehradun?", "acceptedAnswer": { "@type": "Answer", "text": "Best MBA colleges in Dehradun include DBS Global University, IMS Unision University, Uttaranchal University, DBUU, and Tulas Institute." } },
          { "@type": "Question", "name": "Which are the best B.Tech colleges in Dehradun?", "acceptedAnswer": { "@type": "Answer", "text": "Best B.Tech colleges include Graphic Era University, Uttaranchal University, DBUU, Tulas Institute, Shivalik College, and ITM Dehradun — all AICTE approved." } },
        ]
      })}} />

      <Footer />
    </div>
  );
}
