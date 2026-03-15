"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Star, ChevronDown, ArrowRight, Filter, Search as SearchIcon, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { requireAuth } from "../../../lib/authGuard";

export default function CollegesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchInput(query);
      setAppliedSearchQuery(query);
    }
  }, [searchParams]);

  const colleges = [
    { id: 1, slug: "dbuu", name: "DBUU", location: "Uttarakhand, Dehradun", description: "A premier university offering diverse programs in B.Tech, MBA, BHM, and BAMS.", feeLabel: "Annual Fees", fee: "₹1,50,000", image: "/images/dbuu.jpg", rating: "4.9", tag: "TOP RANKED" },
    { id: 2, slug: "uttranchal-university", name: "Uttranchal University", location: "Uttarakhand, Dehradun", description: "Known for academic excellence in B.Tech, MBA, and Law across the region.", feeLabel: "Semester Fees", fee: "₹85,000", image: "/images/Uttranchal-University.jpg", rating: "4.8", tag: "POPULAR" },
    { id: 3, slug: null, name: "Tulas Institute", location: "Uttarakhand, Dehradun", description: "A top engineering college with state-of-the-art infrastructure and placements.", feeLabel: "Annual Fees", fee: "₹1,20,000", image: "/images/Tulas-Institute.jpg", rating: "4.7", tag: "TOP RATED" },
    { id: 4, slug: null, name: "DBS", location: "Uttarakhand, Dehradun", description: "Leading business school focusing on holistic Commerce and MBA education.", feeLabel: "Annual Fees", fee: "₹2,10,000", image: "/images/DBS.jpg", rating: "4.8", tag: "TOP ROI" },
    { id: 5, slug: null, name: "UPES", location: "Uttarakhand, Dehradun", description: "A specialized university offering premium programs in B.Tech and Law.", feeLabel: "Semester Fees", fee: "₹1,80,000", image: "/images/UPES.jpg", rating: "4.9", tag: "TOP RANKED" },
    { id: 6, slug: null, name: "Shivalik College", location: "Uttarakhand, Dehradun", description: "A growing engineering institute with strong industry ties and modern facilities.", feeLabel: "Annual Fees", fee: "₹1,10,000", image: "/images/shivalik-college.jpg", rating: "4.6", tag: "AFFORDABLE" },
    { id: 7, slug: null, name: "Dolphin College", location: "Uttarakhand, Dehradun", description: "A specialized institution dedicated to advanced education in Allied Sciences.", feeLabel: "Annual Fees", fee: "₹95,000", image: "/images/Dolphin-college.jpg", rating: "4.7", tag: "TOP RATED" },
    { id: 8, slug: null, name: "Kukreja Institute", location: "Uttarakhand, Dehradun", description: "A prominent institution for aspiring professionals in Hotel Management.", feeLabel: "Annual Fees", fee: "₹1,05,000", image: "/images/DBS.jpg", rating: "4.5", tag: "POPULAR" },
  ];

  const handleSearch = () => {
    setAppliedSearchQuery(searchInput);
  };

  const handleBackToAll = () => {
    setSearchInput("");
    setAppliedSearchQuery("");
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()) ||
    college.description.toLowerCase().includes(appliedSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-[#0EB4A6] selection:text-white pb-0">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button - only shown when search is active */}
        {appliedSearchQuery && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBackToAll}
            className="mb-6 bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/20 rounded-full px-4 py-2 text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Colleges
          </motion.button>
        )}

        {/* Header Section - Hide on Search */}
        {!appliedSearchQuery && (
          <div className="text-center mb-10 mt-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0EB4A6]/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight relative z-10"
            >
              Explore Top Colleges
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-base max-w-2xl mx-auto relative z-10"
            >
              Discover the perfect institution that aligns with your ambitions. Compare fees, placements, and reviews across India.
            </motion.p>
          </div>
        )}

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`max-w-3xl mx-auto relative z-10 ${appliedSearchQuery ? 'mb-8 mt-0' : 'mb-8'}`}
        >
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 md:py-4 backdrop-blur-md shadow-2xl transition-all focus-within:border-[#0EB4A6]/50 focus-within:bg-white/10">
            <SearchIcon className="w-5 h-5 text-[#0EB4A6] flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search college by name, fees, city or course" 
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 focus:ring-0 text-sm md:text-base" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="bg-[#0EB4A6] hover:bg-[#0c9c90] text-white p-2 rounded-full transition-colors flex-shrink-0 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Filters - Hide on Search */}
        {!appliedSearchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {["City", "Course", "Fees Range (₹)", "Rating", "Public/Private"].map((filter) => (
              <button key={filter} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
                {filter} <ChevronDown className="w-4 h-4 text-white/40" />
              </button>
            ))}
            
            <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-md bg-[#0EB4A6]/10 text-[#0EB4A6] text-xs font-medium border border-[#0EB4A6]/20 flex items-center gap-1 cursor-pointer">
                Engineering ×
              </span>
              <button className="text-white/40 text-sm hover:text-white transition-colors ml-2">Clear All</button>
            </div>
          </motion.div>
        )}

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-white/5">
          <p className="font-semibold">{filteredColleges.length} Colleges Found</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="text-white/50 text-sm">Sort by:</span>
            <button className="text-[#0EB4A6] text-sm font-medium flex items-center gap-1 hover:text-[#0c9c90]">
              Popularity <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid - Show ALL filtered colleges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredColleges.map((college, index) => (
            <motion.div 
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-white/10 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(14,180,166,0.05)]"
            >
              <div className="relative h-[240px] w-full bg-[#1a1a1c] overflow-hidden group">
                <Image 
                  src={college.image} 
                  alt={college.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-3 left-3 bg-[#0EB4A6] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-widest z-10 shadow-lg">
                  {college.tag}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10 z-10">
                  <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                  <span className="text-xs font-bold text-white tracking-wide">{college.rating}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col bg-[#121214]">
                <h3 className="text-xl font-bold mb-1.5 tracking-tight">{college.name}</h3>
                <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{college.location}</span>
                </div>
                
                <p className="text-white/60 text-sm mb-6 leading-relaxed flex-1">
                  {college.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 pb-5 border-t border-white/5">
                  <span className="text-xs text-white/50 bg-[#1a1a1c] px-2 py-1 rounded">{college.feeLabel}</span>
                  <span className="font-bold text-[#0EB4A6] tracking-wide text-lg">{college.fee}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {college.slug ? (
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="py-2.5 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/5 transition-colors text-white text-center flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="py-2.5 rounded-lg border border-white/5 text-xs font-semibold text-white/20 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                  <button 
                    onClick={() => { if (requireAuth('/ability-test')) router.push('/ability-test'); }}
                    className="py-2.5 rounded-lg bg-[#0EB4A6] hover:bg-[#0c9c90] text-xs font-semibold text-white transition-colors shadow-[0_4px_14px_rgba(14,180,166,0.3)] cursor-pointer"
                  >
                    Start Ability Test
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-20">
            <SearchIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-white/50 text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
