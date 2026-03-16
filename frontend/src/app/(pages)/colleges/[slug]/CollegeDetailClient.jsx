"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Star, ExternalLink, ChevronLeft, GraduationCap, Clock, IndianRupee, Users, Building2, Wifi, Utensils, Dumbbell, HeartPulse, BedDouble, Bus, Shield, BadgeCheck, TrendingUp, BookOpen, Phone, CheckCircle } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { requireAuth } from "../../../../lib/authGuard";

export default function CollegeDetailClient({ college }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("College Info");
  const [showAllCourses, setShowAllCourses] = useState(false);

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

  const reviews = [
    { name: "Aarav Sharma", course: "B.Tech CSE", rating: 5, text: "Excellent faculty and great placement support. The campus life is amazing." },
    { name: "Priya Singh", course: "MBA", rating: 4, text: "Good infrastructure and industry exposure. The curriculum is very well updated." },
    { name: "Rohan Verma", course: "BHM", rating: 5, text: "Best decision of my life! The labs and practical training sessions are top notch." },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white pb-0">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Full-width hero image */}
        <div className="relative w-full h-[40vh] md:h-[60vh] min-h-[400px]">
          <Image src={college.heroImage} alt={college.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/30" />
          
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <Link href="/colleges" className="absolute top-8 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
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
                
                <h1 className="text-2xl md:text-5xl font-bold mb-3 tracking-tight">{college.name}</h1>
                
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
                <a href={college.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center px-6 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-[#121214] border-y border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
              {college.stats.map((stat, i) => (
                <div key={i} className={`flex flex-col ${i !== 0 ? 'pl-6' : ''}`}>
                  <span className="text-white/40 text-sm mb-1">{stat.label}</span>
                  <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                className={`pb-4 font-medium whitespace-nowrap whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-[#0EB4A6] text-[#0EB4A6]' : 'border-transparent text-white/50 hover:text-white'}`}
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
                    {college.badges.map((badge, i) => (
                      <div key={i} className="bg-[#121214] border border-white/5 rounded-2xl p-5 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0EB4A6] shrink-0 mt-0.5" />
                        <span className="font-medium text-white/90">{badge}</span>
                      </div>
                    ))}
                  </div>
                  
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
                        ? college.courses 
                        : college.courses.slice(0, 3)
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
                          <div className="flex flex-col items-start md:items-end shrink-0 pl-14 md:pl-0 border-t border-white/5 pt-3 md:border-none md:pt-0">
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
                    {college.courses.length > 3 && (
                      <div className="mt-5 text-center">
                        <button
                          onClick={() => setShowAllCourses(!showAllCourses)}
                          className="px-6 py-2.5 border border-white/10 rounded-full text-sm font-medium text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 mx-auto"
                        >
                          {showAllCourses ? (
                            <>Show Less ↑</>
                          ) : (
                            <>Show All {college.courses.length} Courses ↓</>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "Placements" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-center shadow-lg">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#0EB4A6]/10 flex items-center justify-center mb-3">
                        <TrendingUp className="w-5 h-5 text-[#0EB4A6]" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">{college.placements.highest}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Highest Package</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-center shadow-lg">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <IndianRupee className="w-5 h-5 text-white/70" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">{college.placements.average}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Average Package</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-center shadow-lg">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <BadgeCheck className="w-5 h-5 text-white/70" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">{college.placements.offers}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Total Offers</p>
                    </div>
                    <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 text-center shadow-lg">
                      <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <Building2 className="w-5 h-5 text-white/70" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">{college.placements.companies}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">Companies</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-3">Placement Overview</h3>
                    <p className="text-white/70 leading-relaxed mb-6">{college.placements.description}</p>
                    
                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Top Recruiters</h4>
                    <div className="flex flex-wrap gap-3">
                      {college.placements.topRecruiters.map((recruiter, i) => (
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
                  {college.infrastructure.map((item, i) => (
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
                      {college.amenities.map((amenity, i) => (
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
                  {reviews.map((review, i) => (
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
                  ))}
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
      </main>

      <Footer />
    </div>
  );
}
