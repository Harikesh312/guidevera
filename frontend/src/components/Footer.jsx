import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] pt-20 pb-10 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info + Menus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 lg:col-span-2 pr-4">
            <div className="flex items-center gap-2 mb-8">
              <Image src="/guidevera-logo.png" alt="Guidevera Logo" width={160} height={160} className="object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[300px]">
              Empowering students to find the best colleges and careers in India through data-driven insights.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">in</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">X</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">IG</a>
            </div>
          </div>
          
          {/* Menu 1: Platform / General Links */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Platform</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">College Search</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Ability Test</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Career Library</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          {/* Menu 2: Resources */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Resources</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Student Stories</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">College Rankings</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Scholarships</a></li>
            </ul>
          </div>

          {/* Menu 3: Company */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Company</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs">© 2024 Guidevera EdTech Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Terms of Service</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Cookie Settings</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
