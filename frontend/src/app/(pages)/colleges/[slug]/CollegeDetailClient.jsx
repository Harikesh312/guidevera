"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Star, ExternalLink, ChevronLeft, ChevronDown, GraduationCap, Clock, IndianRupee, Users, Building2, Wifi, Utensils, Dumbbell, HeartPulse, BedDouble, Bus, Shield, BadgeCheck, TrendingUp, BookOpen, Phone, CheckCircle, X, Award, FileText, HelpCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { requireAuth } from "../../../../lib/authGuard";
import API_URL from "@/lib/api";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Other"
];

export default function CollegeDetailClient({ college }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("College Info");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", course: "", customCourse: "", email: "", state: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [openFaq, setOpenFaq] = useState(null);

  const tabs = ["College Info", "Placements", "Infrastructure", "Reviews"];

  // Mapping string amenities to icons (approximate)
  const getAmenityIcon = (text) => {
    const t = text.toLowerCase();
    if (t.includes("wi-fi") || t.includes("wifi")) return <Wifi className="w-5 h-5 text-white/60" />;
    if (t.includes("mess") || t.includes("cafeteria")) return <Utensils className="w-5 h-5 text-white/60" />;
    if (t.includes("gym")) return <Dumbbell className="w-5 h-5 text-white/60" />;
    if (t.includes("health") || t.includes("medical")) return <HeartPulse className="w-5 h-5 text-white/60" />;
    if (t.includes("hostel")) return <BedDouble className="w-5 h-5 text-white/60" />;
    if (t.includes("transport")) return <Bus className="w-5 h-5 text-white/60" />;
    if (t.includes("security")) return <Shield className="w-5 h-5 text-white/60" />;
    return <Building2 className="w-5 h-5 text-white/60" />;
  };

  const reviews = college.reviews || [];

  const openApplyModal = () => {
    setApplyModalOpen(true);
    setForm({ name: "", phone: "", course: college.courses?.[0]?.name || "Other (Please Specify)", customCourse: "", email: "", state: "" });
    setFormStatus("idle");
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setFormStatus("idle");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const finalCourse = form.course === "Other (Please Specify)" ? form.customCourse : form.course;
      const res = await fetch(`${API_URL}/api/college-apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, course: finalCourse, collegeName: college.name }),
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
        {applyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && closeApplyModal()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
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
                  <p className="text-white/50 text-sm mb-6">{college.name}</p>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50" placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                    <input required type="tel" pattern="[0-9]{10}" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0EB4A6]/50" placeholder="Phone Number (10 digits)" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                    <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0EB4A6]/50 min-touch" value={form.course} onChange={e => setForm(f => ({...f, course: e.target.value}))}>
                      {college.courses?.map(c => <option key={c.name} value={c.name} className="bg-[#121214]">{c.name}</option>)}
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
                    <button type="submit" disabled={formStatus === "loading"} className="w-full py-3.5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)] disabled:opacity-50 cursor-pointer">
                      {formStatus === "loading" ? "Submitting..." : "Request Callback"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        {/* Full-width hero image */}
        <div className="relative w-full h-auto min-h-[450px] md:min-h-[500px] md:h-[60vh] flex flex-col justify-end">
          <div className="absolute inset-0 z-0">
            <Image src={college.heroImage} alt={college.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/30" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-16">
            <Link href="/colleges" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md w-max mb-8">
              <ChevronLeft className="w-4 h-4" /> Back to Colleges
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="bg-[#0EB4A6] text-black text-xs font-bold px-3 py-1.5 rounded tracking-widest">{college.tag}</span>
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                    <span className="text-xs font-bold">{college.rating} Rating</span>
                  </div>
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs text-white/80 font-medium">Est. {college.established}</span>
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs text-white/80 font-medium">{college.ranking}</span>
                </div>
                
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight leading-tight">{college.h1 || college.name}</h1>
                {college.subtext && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-3 max-w-2xl">{college.subtext}</p>
                )}
                
                <div className="flex items-center gap-4 text-white/60 text-sm md:text-base">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {college.location}</div>
                  <div className="hidden sm:flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-[#0EB4A6]" /> {college.guarantee}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => { if (requireAuth('/ability-test')) router.push('/ability-test'); }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)]"
                >
                  Start Ability Test
                </button>
                <button onClick={openApplyModal} className="w-full sm:w-auto justify-center px-6 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-[#121214] border-y border-white/5 py-5 md:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              {(college.stats || []).map((stat, i) => (
                <div key={i} className={`flex flex-col border-white/10 ${i % 2 !== 0 ? 'border-l pl-4 md:pl-6' : ''} ${i > 0 && i % 2 === 0 ? 'md:border-l md:pl-6' : ''}`}>
                  <span className="text-white/40 text-xs sm:text-sm mb-1">{stat.label}</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COLLEGE HIGHLIGHTS SECTION ── */}
        {college.highlights && college.highlights.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><Award className="w-5 h-5 text-[#0EB4A6]" /> College Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.highlights.map((item, i) => (
                <div key={i} className="bg-[#121214] border border-white/5 rounded-xl p-4 flex flex-col gap-1 hover:border-[#0EB4A6]/30 transition-colors">
                  <span className="text-xs text-white/40 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-semibold text-white/90">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs & Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-6 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar pb-1 sticky top-20 bg-[#09090b]/80 backdrop-blur-md z-30 pt-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAllCourses(false);
                }}
                className={`pb-4 font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#0EB4A6] text-[#0EB4A6]' : 'border-transparent text-white/50 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Content (2/3) */}
            <div className="flex-1 w-full min-w-0">
              
              {activeTab === "College Info" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-4">About {college.shortName}</h2>
                    <p className="text-white/70 leading-relaxed">{college.about}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(college.badges || []).map((badge, i) => (
                      <div key={i} className="bg-[#121214] border border-white/5 rounded-2xl p-5 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0EB4A6] shrink-0 mt-0.5" />
                        <span className="font-medium text-white/90">{badge}</span>
                      </div>
                    ))}
                  </div>
                  
                  {college.amenities && college.amenities.length > 0 && (
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-6">Campus Amenities</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {college.amenities.map((amenity, i) => (
                          <div key={i} className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-white/5 border border-white/5 gap-3">
                            {getAmenityIcon(amenity)}
                            <span className="text-xs text-white/70">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── COURSES SECTION inside College Info tab ── */}
                  <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                    
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Top Courses & Fees</h2>
                      <span className="text-xs text-white/40 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                        All Fees are Approximate
                      </span>
                    </div>

                    {/* Show first 3 courses, or all if expanded */}
                    <div className="space-y-4">
                      {(showAllCourses 
                        ? (college.courses || []) 
                        : (college.courses || []).slice(0, 3)
                      ).map((course, i) => (
                        <div key={i} className="bg-[#09090b] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="w-5 h-5 text-[#0EB4A6]" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white mb-1">
                                {course.name}
                              </h3>
                              <p className="text-xs text-white/50 mb-2">
                                {course.description}
                              </p>
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xs bg-white/5 border border-white/5 px-2 py-1 rounded text-white/50">
                                  {course.type}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-white/50">
                                  <Clock className="w-3.5 h-3.5" /> 
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end shrink-0 pl-14 md:pl-0 border-t border-white/5 pt-3 md:border-none md:pt-0 w-full md:w-auto mt-3 md:mt-0">
                            <span className="text-xs text-white/40 mb-1">
                              Estimated Fee
                            </span>
                            <span className="text-lg font-bold text-[#0EB4A6]">
                              {course.fee}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Show More / Show Less button */}
                    {(college.courses || []).length > 3 && (
                      <div className="mt-5 text-center">
                        <button
                          onClick={() => setShowAllCourses(!showAllCourses)}
                          className="px-6 py-2.5 border border-white/10 rounded-full text-sm font-medium text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 mx-auto"
                        >
                          {showAllCourses ? (
                            <>Show Less ↑</>
                          ) : (
                            <>Show All {(college.courses || []).length} Courses ↓</>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── COURSES & FEES TABLE ── */}
                  {college.coursesFees && (
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-6">{college.coursesFees.heading}</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="pb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">Course</th>
                              <th className="pb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">Duration</th>
                              <th className="pb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">Total Fees</th>
                            </tr>
                          </thead>
                          <tbody>
                            {college.coursesFees.rows.map((row, i) => (
                              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 text-sm font-medium text-white/90">{row.course}</td>
                                <td className="py-3 text-sm text-white/60">{row.duration}</td>
                                <td className="py-3 text-sm font-semibold text-[#0EB4A6]">{row.totalFees}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ── ADMISSION DETAILS SECTION ── */}
                  {college.admission && (
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#0EB4A6]" /> {college.admission.heading}</h2>
                      <p className="text-white/70 text-sm leading-relaxed mb-6">{college.admission.intro}</p>
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="pb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">Course</th>
                              <th className="pb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">Entrance Exam Accepted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {college.admission.table.map((row, i) => (
                              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 text-sm font-medium text-white/90">{row.course}</td>
                                <td className="py-3 text-sm text-white/60">{row.exam}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {college.admission.eligibility && (
                        <div className="bg-[#0EB4A6]/5 border border-[#0EB4A6]/20 rounded-xl p-4 mb-4">
                          <p className="text-sm text-white/80"><span className="font-semibold text-[#0EB4A6]">Eligibility:</span> {college.admission.eligibility}</p>
                        </div>
                      )}
                      {college.admission.scholarships && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <p className="text-sm text-white/80"><span className="font-semibold text-[#fbbf24]">Scholarships:</span> {college.admission.scholarships}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── PLACEMENT RECORD SECTION ── */}
                  {college.placementRecord && (
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#0EB4A6]" /> {college.placementRecord.heading}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {college.placementRecord.stats.map((stat, i) => (
                          <div key={i} className="bg-[#09090b] border border-white/5 rounded-xl p-4 text-center">
                            <p className="text-lg md:text-xl font-bold text-[#0EB4A6] mb-1">{stat.value}</p>
                            <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      {college.placementRecord.topRecruiters && (
                        <div>
                          <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Top Recruiters</h4>
                          <div className="flex flex-wrap gap-2">
                            {college.placementRecord.topRecruiters.map((r, i) => (
                              <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">{r}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "Placements" && college.placements && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg flex flex-col justify-center items-center overflow-hidden min-w-0">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#0EB4A6]/10 flex items-center justify-center mb-3 shrink-0">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#0EB4A6]" />
                      </div>
                      <p className="text-lg sm:text-2xl font-bold text-white mb-1 truncate w-full">{college.placements.highest}</p>
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate w-full">Highest Pkg</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg flex flex-col justify-center items-center overflow-hidden min-w-0">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 shrink-0">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                      </div>
                      <p className="text-lg sm:text-2xl font-bold text-white mb-1 truncate w-full">{college.placements.average}</p>
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate w-full">Average Pkg</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg flex flex-col justify-center items-center overflow-hidden min-w-0">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 shrink-0">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                      </div>
                      <p className="text-lg sm:text-2xl font-bold text-white mb-1 truncate w-full">{college.placements.offers}</p>
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate w-full">Offers</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg flex flex-col justify-center items-center overflow-hidden min-w-0">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3 shrink-0">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                      </div>
                      <p className="text-lg sm:text-2xl font-bold text-white mb-1 truncate w-full">{college.placements.companies}</p>
                      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider truncate w-full">Companies</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-3">Placement Overview</h3>
                    <p className="text-white/70 leading-relaxed mb-6">{college.placements.description}</p>
                    
                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Top Recruiters</h4>
                    <div className="flex flex-wrap gap-3">
                      {(college.placements.topRecruiters || []).map((recruiter, i) => (
                        <span key={i} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                          {recruiter}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Infrastructure" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {(college.infrastructure || []).map((item, i) => (
                    <div key={i} className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row group">
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                        <Image src={item.image} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-2">{item.label}</h3>
                        <p className="text-white/60">{item.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8 mt-4">
                    <h2 className="text-xl font-bold mb-6">All Facilities</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                      {(college.amenities || []).map((amenity, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="w-4 h-4 text-[#0EB4A6]" /> {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "Reviews" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {reviews.length > 0 ? reviews.map((review, i) => (
                    <div key={i} className="bg-[#121214] border border-white/5 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EB4A6] to-[#0fdad3] flex items-center justify-center text-black font-bold text-sm">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{review.name}</h4>
                            <p className="text-xs text-white/50">{review.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-white/10'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    </div>
                  )) : (
                    <div className="text-white/50 text-center py-10">No reviews available yet.</div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="w-full lg:w-1/3 shrink-0 space-y-6 lg:sticky lg:top-36">
              
              {/* Sidebar Card 1 */}
              <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EB4A6]/10 blur-[50px] rounded-full pointer-events-none" />
                <h3 className="font-bold text-xl mb-2 relative z-10">Confused if this is the right fit?</h3>
                <p className="text-sm text-white/60 mb-6 relative z-10">Take our AI-driven ability test or talk to a counselor to make an informed decision.</p>
                <div className="flex flex-col gap-3 relative z-10">
                  <button 
                    onClick={() => { if (requireAuth('/ability-test')) router.push('/ability-test'); }}
                    className="w-full py-3 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Start Ability Test
                  </button>
                  <Link href="/counseling" className="w-full py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                    Book Counseling
                  </Link>
                </div>
              </div>

              {/* Sidebar Card 2 - Admission Updates */}
              {college.admissionUpdates && college.admissionUpdates.length > 0 && (
                <div className="bg-[#121214] border border-white/5 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-[#0EB4A6]" /> Admission Updates</h3>
                  <div className="space-y-4">
                    {college.admissionUpdates.map((update, i) => (
                      <div key={i} className="flex flex-col pt-3 border-t border-white/5 first:border-0 first:pt-0">
                        <span className="text-sm font-medium text-white/90">{update.label}</span>
                        <span className="text-xs text-[#0EB4A6] mt-1">{update.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sidebar Card 3 & 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="bg-[#121214] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Admissions Helpline</p>
                    <a href="tel:+918979485801" className="text-sm font-bold text-white hover:text-[#0EB4A6]">+91 89794 85801</a>
                  </div>
                </div>

                <a href={college.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-[#121214] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-white" />
                    <span className="text-sm font-medium">Visit Official Website</span>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
        {/* ── FAQ SECTION ── */}
        {college.faq && college.faq.items && college.faq.items.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-[#0EB4A6]" /> {college.faq.heading}</h2>
            <div className="space-y-3">
              {college.faq.items.map((item, i) => (
                <div key={i} className="bg-[#121214] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="font-medium text-sm md:text-base text-white/90 pr-4">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-white/60 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
