import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, X, Star, Menu, ArrowRight, Brain, GraduationCap, Shield, BadgeCheck, BookOpen, Calculator, Calendar, Target, MessageCircle, ChevronDown } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaWhatsapp, FaThreads } from 'react-icons/fa6';
import LeadForm from './components/LeadForm';

const API_URL = (() => {
  try {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  } catch {
    return 'http://localhost:5000';
  }
})();

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Other"
];

const colleges = [
  { id:1, name:"DBUU", slug:"dbuu", rating:"4.3", tag:"TOP RANKED", fee:"₹1.5L–2.0L/yr", courses:["B.Tech","MBA","BHM","BAMS","BCA","B.Pharm","LLB"], image: "/images/dbuu.jpg" },
  { id:2, name:"Uttaranchal University", slug:"uttaranchal-university", rating:"4.5", tag:"NAAC A+", fee:"₹1.8L–2.5L/yr", courses:["B.Tech","MBA","BA LLB","BCA","BHM","B.Sc Nursing"], image: "/images/Uttranchal-University.jpg" },
  { id:3, name:"Graphic Era", slug:"graphic-era", rating:"4.7", tag:"NIRF TOP 50", fee:"₹2.5L–3.5L/yr", courses:["B.Tech","MBA","BCA","BBA","B.Des","LLB"], image: "/images/graphic-era.jpg" },
  { id:4, name:"DBS Global", slug:"dbs-global", rating:"4.8", tag:"TOP B-SCHOOL", fee:"₹3.0L–4.0L/yr", courses:["MBA","BBA","B.Tech AI/ML","BCA","B.Com","LLB"], image: "/images/DBS.jpg" },
  { id:5, name:"Tulas Institute", slug:"tulas-institute", rating:"4.7", tag:"NAAC A+", fee:"₹1.5L–1.8L/yr", courses:["B.Tech","MBA","BBA","BCA","B.Sc Agriculture"], image: "/images/Tulas-Institute.jpg" },
  { id:7, name:"Shivalik College", slug:"shivalik-college", rating:"4.6", tag:"NAAC A+", fee:"₹1.2L–1.8L/yr", courses:["B.Tech","M.Tech","BCA","MBA","B.Pharm"], image: "/images/shivalik-college.jpg" },
  { id:8, name:"IMS Unision University", slug:"ims-unision", rating:"4.6", tag:"TOP B-SCHOOL", fee:"₹2.0L–3.0L/yr", courses:["MBA","BBA","BA LLB","BBA LLB","LLM","BHM","BCA","BAJMC","B.Com"], image: "/images/ims.jpg" },
  { id:9, name:"Dolphin Institute", slug:"dolphin-institute", rating:"4.7", tag:"NAAC A+", fee:"₹80K–1.5L/yr", courses:["BPT","B.Sc Biotechnology","B.Sc Agriculture","B.Sc Forestry","B.Sc MLT","B.Ed","MPT","M.Sc Microbiology"], image: "/images/Dolphin-college.jpg" },
  { id:10, name:"JBIT Dehradun", slug:"jbit-dehradun", rating:"4.5", tag:"AICTE APPROVED", fee:"₹1.0L–1.8L/yr", courses:["B.Tech","M.Tech","MBA","BBA","B.Pharm","D.Pharm","B.Sc Agriculture","Diploma"], image: "/images/jbit.jpg" },
  { id:6, name:"ITM Dehradun", slug:"itm-dehradun", rating:"4.5", tag:"AICTE APPROVED", fee:"₹90K–1.0L/yr", courses:["BCA","BBA","B.Sc IT","BHM","B.Sc Animation","B.Com","MCA","M.Sc IT"], image: "/images/itm.jpg" },
  { id:11, name:"Alpine College", slug:null, rating:"4.4", tag:"COMING SOON", fee:"Contact College", courses:[], image: "/images/alpine.jpg" }
];

const testimonials = [
  { id: 1, name: "Riya Sharma", course: "B.Tech CSE, DBUU", rating: 5, text: "I was completely confused between engineering and design. Guidevera's ability test gave me absolute clarity." },
  { id: 2, name: "Arjun Mehta", course: "MBA, DBS Global", rating: 5, text: "The counseling session helped me choose between 3 MBA colleges. Got into an amazing corporate role." },
  { id: 3, name: "Priya Negi", course: "BHM, Graphic Era", rating: 4, text: "Coming from a small town, I had no idea which college to pick. Guidevera mapped it perfectly." },
  { id: 4, name: "Karan Bisht", course: "BCA, ITM Dehradun", rating: 5, text: "The AI roadmap showed me which certifications to get. Placed at ₹4 LPA directly from campus!" },
  { id: 5, name: "Sneha Rawat", course: "BAMS, Uttaranchal", rating: 4, text: "Guidevera helped me stand my ground against family pressure. I'm thriving in medicine now." }
];

export default function GuideveraLandingPage() {
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showAllColleges, setShowAllColleges] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroModal(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const [applyModal, setApplyModal] = useState(null);
  const [applyStatus, setApplyStatus] = useState('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToLeadForm = () => scrollToSection('lead-form');


  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden" suppressHydrationWarning>
      {/* HERO MODAL (Auto pop-up) */}
      {showHeroModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative w-full max-w-md animate-[pulse-ring_0.3s_ease-out] overflow-hidden">
            <button onClick={() => setShowHeroModal(false)} className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors z-10 bg-white/5 rounded-full p-1.5 hover:bg-white/10">
              <X size={20} />
            </button>
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">Get Free Counseling</h3>
              <p className="text-white/60">Fill in details — we'll call you within 24 hours</p>
            </div>

             <LeadForm compact buttonLabel="Get Free Callback" onSuccess={() => setShowHeroModal(false)} />

            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-[2rem] blur-xl -z-10"></div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />

      {/* SECTION 1: STICKY NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-2xl font-black bg-gradient-to-r from-teal-400 to-[#0EB4A6] bg-clip-text text-transparent">
                Guidevera
              </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-white/80 hover:text-white transition-colors duration-200">Home</button>
              <button onClick={() => scrollToSection('colleges')} className="text-white/80 hover:text-white transition-colors duration-200">Colleges</button>
              <button onClick={() => scrollToSection('lead-form')} className="text-white/80 hover:text-white transition-colors duration-200">Counseling</button>
              <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors duration-200">About Us</button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToSection('colleges')} className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold py-2.5 px-6 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,180,166,0.3)]">
                Apply Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-[#0EB4A6] p-2">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#121214]">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}); setMobileMenuOpen(false);}} className="block w-full text-left text-white/80 hover:text-white py-2">Home</button>
              <button onClick={() => scrollToSection('colleges')} className="block w-full text-left text-white/80 hover:text-white py-2">Colleges</button>
              <button onClick={() => scrollToSection('lead-form')} className="block w-full text-left text-white/80 hover:text-white py-2">Counseling</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white/80 hover:text-white py-2">About Us</button>
              <div className="pt-4 border-t border-white/5 space-y-3">
                <button onClick={scrollToLeadForm} className="block w-full bg-[#0EB4A6] text-black font-bold rounded-full py-3">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 2: HERO SECTION */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 px-4 overflow-hidden">
        {/* Glow Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0EB4A6]/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-left">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-teal-400 font-medium mb-8">
                <span>🎓</span>
                <span>India's #1 Career Guidance Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
                Get Admitted to Your Dream College — <span className="text-[#0EB4A6]">With Expert Guidance</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                Confused about which college or course to choose? Our experts guide 500+ students every year to find the perfect fit. Free counseling. Real results.
              </p>
            </div>
              
            <div className="flex flex-col space-y-4 text-white/80 pb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-[#0EB4A6] shrink-0" size={20} />
                <span className="text-base">Free Career Counseling</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-[#0EB4A6] shrink-0" size={20} />
                <span className="text-base">Personalized Profile</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-[#0EB4A6] shrink-0" size={20} />
                <span className="text-base">10+ Top Colleges</span>
              </div>
            </div>

            <p className="text-sm text-white/40 font-medium">500+ students guided · 90% satisfaction · Free for limited time</p>

            {/* Mobile-only CTA */}
            <div className="lg:hidden pt-4">
              <button onClick={() => setShowHeroModal(true)} className="w-full bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold py-4 rounded-xl text-lg flex items-center justify-center shadow-[0_0_20px_rgba(14,180,166,0.3)]">
                Apply for Free Counseling <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE FORM - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:block bg-[#1A1A1D] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Get Free Counseling</h3>
              <p className="text-white/60">Fill in details — we'll call you within 24 hours</p>
            </div>

                <LeadForm buttonLabel="Get Free Expert Guidance" />
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-[2rem] blur-xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATS BAR */}
      <section className="border-y border-white/10 bg-[#121214] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10 text-center">
          <div className="flex flex-col py-2">
            <span className="text-4xl md:text-5xl font-black text-[#0EB4A6] mb-2">500+</span>
            <span className="text-white/60 font-medium">Admission Sessions</span>
          </div>
          <div className="flex flex-col py-2">
            <span className="text-4xl md:text-5xl font-black text-[#0EB4A6] mb-2">10+</span>
            <span className="text-white/60 font-medium">Partner Colleges</span>
          </div>
          <div className="flex flex-col py-2">
            <span className="text-4xl md:text-5xl font-black text-[#0EB4A6] mb-2">90%</span>
            <span className="text-white/60 font-medium">Student Satisfaction</span>
          </div>
          <div className="flex flex-col py-2">
            <span className="text-4xl md:text-5xl font-black text-[#0EB4A6] mb-2">FREE</span>
            <span className="text-white/60 font-medium">Expert Counseling</span>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROBLEM SECTION */}
      <section className="py-24 px-4 bg-[#09090b]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Students Fail to Choose the Right College</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">Every year, thousands of students make costly mistakes that affect their entire career.</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-[#121214] border border-red-500/20 hover:border-red-500/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-4xl mb-6">😕</div>
            <h3 className="text-xl font-bold mb-4">Family Pressure</h3>
            <p className="text-white/60 line-clamp-4">Forced into engineering or medicine without knowing if it's the right fit. Parents decide based on society, not student capability.</p>
          </div>
          <div className="bg-[#121214] border border-red-500/20 hover:border-red-500/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-4xl mb-6">📋</div>
            <h3 className="text-xl font-bold mb-4">No Proper Guidance</h3>
            <p className="text-white/60 line-clamp-4">No one tells them about scholarships, hidden fees, real placement stats, or modern job prospects before they enroll.</p>
          </div>
          <div className="bg-[#121214] border border-red-500/20 hover:border-red-500/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-4xl mb-6">🎲</div>
            <h3 className="text-xl font-bold mb-4">Wrong College Choice</h3>
            <p className="text-white/60 line-clamp-4">End up in the wrong college, wasting 3-4 years and lakhs of rupees only to figure out they hate their course.</p>
          </div>
        </div>

        <div className="text-center mt-16 mt-8">
          <div className="inline-block p-1 rounded-full bg-gradient-to-b from-[#0EB4A6] to-transparent mb-4 h-12 w-1.5 opacity-50"></div>
          <h3 className="text-2xl font-medium text-[#0EB4A6]">That's exactly why Guidevera exists.</h3>
        </div>
      </section>

      {/* SECTION 7: COLLEGES SECTION */}
      <section id="colleges" className="py-24 px-4 bg-[#121214] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">10+ Top Colleges — All in One Place</h2>
            <p className="text-xl text-white/60">Browse Dehradun's best colleges with verified fees, ratings & placements</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {colleges.slice(0, showAllColleges ? colleges.length : 6).map((college) => (
              <div key={college.id} className="bg-[#1A1A1D] border border-white/10 rounded-2xl overflow-hidden hover:border-[#0EB4A6]/50 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-5px_rgba(14,180,166,0.2)] duration-300 flex flex-col h-full group">
                <div className="h-56 relative overflow-hidden">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0EB4A6] text-black text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      {college.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center text-[#fbbf24] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg border border-white/10">
                    <Star size={14} className="fill-[#fbbf24] mr-1.5" />
                    {college.rating}
                  </div>
                </div>
                <div className="p-6 flex-grow relative -mt-4 bg-[#1A1A1D] rounded-t-3xl border-t border-white/5">
                  <h3 className="text-2xl font-bold mb-1">{college.name}</h3>
                  <p className="text-[#0EB4A6] font-medium mb-4">{college.fee}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {college.courses.slice(0, 3).map((course, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 text-white/70 text-xs px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="bg-white/5 border border-white/10 text-white/70 text-xs px-2 py-1 rounded">
                        +{college.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => {
                      setApplyModal(college);
                      setApplyStatus('idle');

                    }}
                    className="w-full bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold py-3 rounded-xl transition-colors shadow-[0_4px_14px_rgba(14,180,166,0.2)] hover:shadow-[0_4px_20px_rgba(14,180,166,0.4)]"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!showAllColleges && colleges.length > 6 && (
            <div className="text-center mt-[-2rem] mb-16 relative z-10">
              <button 
                onClick={() => setShowAllColleges(true)} 
                className="bg-[#1A1A1D] border border-white/20 hover:border-[#0EB4A6] hover:bg-white/5 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(14,180,166,0.2)]"
              >
                View More Colleges
              </button>
            </div>
          )}

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0EB4A6]/20 to-transparent border border-[#0EB4A6]/30 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">🎉 FREE Expert Counseling — Limited Slots</h3>
              <p className="text-white/70 text-lg">Don't pay ₹1,499. Get your counseling session absolutely free. Only for the first 100 students.</p>
            </div>
            <button onClick={scrollToLeadForm} className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-black shrink-0 font-bold py-4 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(14,180,166,0.3)] transition-transform hover:scale-105">
              Book Free Session
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: SOLUTION SECTION */}
      <section id="about" className="py-24 px-4 bg-[#121214] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How Guidevera Solves This</h2>
            <p className="text-xl text-white/60">A simple, effective 4-step process to secure your future.</p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[44px] left-12 right-12 h-0.5 bg-gradient-to-r from-[#0EB4A6]/10 via-[#0EB4A6]/50 to-[#0EB4A6]/10 border-t border-dashed border-[#0EB4A6]/50"></div>
            
            <div className="grid lg:grid-cols-4 gap-12 lg:gap-6 relative">
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1D] border-2 border-[#0EB4A6] flex items-center justify-center text-3xl font-black text-[#0EB4A6] mb-6 shadow-[0_0_20px_rgba(14,180,166,0.2)] group-hover:scale-110 transition-transform relative z-10">
                  01
                </div>
                <h3 className="text-xl font-bold mb-3">Share Your Profile</h3>
                <p className="text-white/60 px-4">Share your background, interests, and academic strengths to find what you're naturally good at.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1D] border-2 border-[#0EB4A6] flex items-center justify-center text-3xl font-black text-[#0EB4A6] mb-6 shadow-[0_0_20px_rgba(14,180,166,0.2)] group-hover:scale-110 transition-transform relative z-10">
                  02
                </div>
                <h3 className="text-xl font-bold mb-3">Get Your Roadmap</h3>
                <p className="text-white/60 px-4">Receive a personalized career roadmap with top college and course matches for your profile.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1D] border-2 border-[#0EB4A6] flex items-center justify-center text-3xl font-black text-[#0EB4A6] mb-6 shadow-[0_0_20px_rgba(14,180,166,0.2)] group-hover:scale-110 transition-transform relative z-10">
                  03
                </div>
                <h3 className="text-xl font-bold mb-3">Talk to a Counselor</h3>
                <p className="text-white/60 px-4">Free 1-on-1 session with a certified expert to clear all doubts and finalize your choice.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#1A1A1D] border-2 border-[#0EB4A6] flex items-center justify-center text-3xl font-black text-[#0EB4A6] mb-6 shadow-[0_0_20px_rgba(14,180,166,0.2)] group-hover:scale-110 transition-transform relative z-10">
                  04
                </div>
                <h3 className="text-xl font-bold mb-3">Get Admitted</h3>
                <p className="text-white/60 px-4">We guide you to apply, claim scholarships, and successfully secure your seat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BENEFITS SECTION */}
      <section className="py-24 px-4 bg-[#09090b]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What You Get — Completely Free</h2>
          <p className="text-xl text-white/60">Premium guidance without the premium price tag.</p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <Brain size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Career Roadmap</h3>
            <p className="text-white/50 leading-relaxed">Personalized roadmap based on your unique profile and goals mapping exact career steps.</p>
          </div>
          
          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Free Counseling Session</h3>
            <p className="text-white/50 leading-relaxed">30-min 1-on-1 with a certified counselor to discuss your specific case. Zero cost.</p>
          </div>

          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <BadgeCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Scholarship Info</h3>
            <p className="text-white/50 leading-relaxed">We tell you exactly which colleges offer up to 75% fee waiver for your profile.</p>
          </div>

          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <Calculator size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">College Comparison</h3>
            <p className="text-white/50 leading-relaxed">Compare actual fees, real placements, and rankings side by side.</p>
          </div>

          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Admission Support</h3>
            <p className="text-white/50 leading-relaxed">We help you fill forms directly and track your application status till entry.</p>
          </div>

          <div className="bg-[#121214] border border-white/5 hover:border-teal-500/30 transition-all rounded-2xl p-6 group">
            <div className="w-14 h-14 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center text-[#0EB4A6] mb-6 group-hover:bg-[#0EB4A6] group-hover:text-black transition-colors">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Placement Insights</h3>
            <p className="text-white/50 leading-relaxed">Know the absolute truth about average salary and highest package before you pay fees.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: TRUST / TESTIMONIALS */}
      <section className="py-24 px-4 bg-[#09090b] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Students Say 💬</h2>
        </div>

        <div className="relative w-full flex overflow-hidden mask-image-gradient pb-4">
          <div className="flex animate-marquee whitespace-nowrap min-w-max hover:pause">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="w-[350px] sm:w-[400px] inline-flex flex-col bg-[#121214] border border-white/10 rounded-2xl p-8 mr-6 whitespace-normal flex-shrink-0">
                <div className="flex mb-4 text-[#fbbf24]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < t.rating ? "fill-[#fbbf24]" : "text-white/20"} />
                  ))}
                </div>
                <p className="text-white/80 text-lg italic mb-6 leading-relaxed flex-grow">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-[#0EB4A6] text-sm">{t.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .mask-image-gradient {
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
          .hover\\:pause:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>

      {/* SECTION 9: WHO IS THIS FOR */}
      <section className="py-24 px-4 bg-[#121214] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Is Guidevera Right for You?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8 md:p-10">
              <div className="flex items-center space-x-3 text-green-400 mb-8">
                <CheckCircle size={32} />
                <h3 className="text-2xl font-bold">This is FOR you if...</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You're a Class 10/12 student or graduate confused about your career</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">Your parents want you in engineering but you're not entirely sure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You want to find the best ROI college matching your family's budget</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You want to know about scholarships and inside info on fee waivers</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 md:p-10">
              <div className="flex items-center space-x-3 text-red-400 mb-8">
                <X size={32} />
                <h3 className="text-2xl font-bold">This is NOT for you if...</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <X size={20} className="text-red-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You already have a confirmed admission in a top tier college</span>
                </li>
                <li className="flex items-start">
                  <X size={20} className="text-red-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You want a pre-made generic list of colleges without personalization</span>
                </li>
                <li className="flex items-start">
                  <X size={20} className="text-red-400 mt-1 mr-3 shrink-0" />
                  <span className="text-white/80 text-lg">You're just browsing and not serious about planning your career journey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HOW IT WORKS */}
      <section className="py-24 px-4 bg-[#09090b]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How to Get Started — 3 Simple Steps</h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0EB4A6] text-black font-black text-xl rounded-full flex items-center justify-center border-4 border-[#09090b]">1</div>
            <h3 className="text-xl font-bold mb-3 mt-4">Fill the Form</h3>
            <p className="text-white/60">Enter your name, phone, and course interest. Takes exactly 30 seconds.</p>
          </div>
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0EB4A6] text-black font-black text-xl rounded-full flex items-center justify-center border-4 border-[#09090b]">2</div>
            <h3 className="text-xl font-bold mb-3 mt-4">Get a Call</h3>
            <p className="text-white/60">Our certified counselor calls you within 24 hours to understand your unique goals.</p>
          </div>
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0EB4A6] text-black font-black text-xl rounded-full flex items-center justify-center border-4 border-[#09090b]">3</div>
            <h3 className="text-xl font-bold mb-3 mt-4">Get Admitted</h3>
            <p className="text-white/60">We map you to the best college, help with forms, and secure your admission seat.</p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Start?</h3>
          <button onClick={scrollToLeadForm} className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold py-4 px-10 rounded-full text-xl shadow-[0_0_20px_rgba(14,180,166,0.3)] transition-transform hover:scale-105 inline-flex items-center">
            Fill Form Now <ArrowRight className="ml-3" size={24} />
          </button>
        </div>
      </section>

      {/* SECTION 11: SECOND LEAD FORM */}
      <section id="lead-form" className="py-24 px-4 bg-gradient-to-b from-[#121214] to-[#09090b] border-t border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0EB4A6]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Journey Today — It's Free</h2>
            <p className="text-xl text-white/60">Join 500+ students who found their perfect career path with Guidevera</p>
          </div>

          <div className="bg-[#1A1A1D] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <LeadForm buttonLabel="Get Free Expert Guidance" />
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 text-sm text-white/50 font-medium">
              <div className="flex items-center"><span className="mr-1.5 text-base">⚡</span> We respond within 24 hours</div>
              <div className="flex items-center"><span className="mr-1.5 text-base">🔒</span> Your data is safe</div>
              <div className="flex items-center"><span className="mr-1.5 text-base">🎓</span> 100% Free Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FOOTER */}
      <footer className="bg-[#09090b] border-t border-white/10 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-1">
            <a href="/" className="text-3xl font-black bg-gradient-to-r from-teal-400 to-[#0EB4A6] bg-clip-text text-transparent block mb-4">
              Guidevera
            </a>
            <p className="text-white/60 mb-6 font-medium">Your True Guide for Career Clarity.</p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <a href="https://www.linkedin.com/company/guidevera" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#0A66C2] transition-colors group">
                <svg className="w-4 h-4 text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/guidevera?s=21" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group">
                <svg className="w-4 h-4 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1A27KFCKv7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#1877F2] transition-colors group">
                <svg className="w-4 h-4 text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/guidevera?igsh=MXdpZTlyZnltMHMxOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group relative overflow-hidden">
                <svg className="w-4 h-4 text-[url(#ig)] transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                  <path style={{fill: 'currentColor'}} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@guidevera?si=g6Ih8nOTCwPna8jf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#FF0000] transition-colors group">
                <svg className="w-4 h-4 text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.threads.com/@guidevera?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group">
                <FaThreads className="w-4 h-4 text-white" />
              </a>
              <a href="https://wa.me/918979485801" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#25D366] transition-colors group">
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Platform</h4>
            <ul className="space-y-4 text-white/60">
              <li><button onClick={() => scrollToSection('colleges')} className="hover:text-[#0EB4A6] transition-colors">Browse Colleges</button></li>
              <li><button onClick={() => scrollToSection('lead-form')} className="hover:text-[#0EB4A6] transition-colors">Expert Counseling</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-[#0EB4A6] transition-colors">Why Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center"><Phone size={16} className="mr-3 text-[#0EB4A6]" /> <a href="tel:+918979485801" className="hover:text-[#0EB4A6]">+91 89794 85801</a></li>
              <li className="flex items-center"><MessageCircle size={16} className="mr-3 text-[#0EB4A6]" /> <a href="https://wa.me/918979485801" className="hover:text-[#0EB4A6]">WhatsApp Us</a></li>
              <li className="flex items-center"><BookOpen size={16} className="mr-3 text-[#0EB4A6]" /> contact@guidevera.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
          <p>© 2026 guidevera.com. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with precision for students.</p>
        </div>
      </footer>

      {/* FLOATING ELEMENTS */}
      
      {/* Phone Button */}
      <a 
        href="tel:+918979485801" 
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#0EB4A6] rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform group"
        title="Call Us Now"
      >
        <Phone size={24} className="fill-black" />
        <span className="absolute right-full mr-4 bg-[#121214] border border-white/10 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Call Us Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center group">
        <div className="absolute w-full h-full rounded-full bg-[#25D366] animate-pulse-ring"></div>
        <a 
          href="https://wa.me/918979485801" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-10"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="absolute right-full mr-4 bg-[#121214] border border-white/10 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* GLOBAL APPLY MODAL */}
      {applyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setApplyModal(null)}></div>
          <div className="bg-[#121214] border border-white/10 rounded-2xl w-full max-w-lg relative z-10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1A1A1D] rounded-t-2xl shrink-0">
              <div>
                <h3 className="text-xl font-bold">Apply to {applyModal.name}</h3>
                <p className="text-sm text-white/50">Fast-track your admission</p>
              </div>
              <button onClick={() => setApplyModal(null)} className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto no-scrollbar">
              {applyStatus === 'success' ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle size={64} className="mx-auto text-green-400" />
                  <h4 className="text-2xl font-bold text-green-400">Application Submitted!</h4>
                  <p className="text-white/70">We have received your application for {applyModal.name}. Our team will call you within 24 hours.</p>
                  <button onClick={() => setApplyModal(null)} className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <LeadForm
                  compact
                  preSelectedCollege={applyModal.name}
                  buttonLabel="Confirm Application"
                  onSuccess={() => setApplyStatus('success')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
