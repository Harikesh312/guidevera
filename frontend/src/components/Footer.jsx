import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] pt-20 pb-10 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info + Menus */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 pr-4">
            <div className="flex items-center gap-2 mb-8">
              <Image src="/guidevera-logo.png" alt="Guidevera Logo" width={160} height={160} className="object-contain" style={{ width: "auto", height: "auto" }} />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[300px]">
              Empowering students to find the best colleges and careers in India through data-driven insights.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <a href="https://www.linkedin.com/company/guidevera" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">in</a>
              <a href="https://x.com/guidevera?s=21" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">X</a>
              <a href="https://www.facebook.com/share/1A27KFCKv7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">FB</a>
              <a href="https://www.instagram.com/guidevera?igsh=MXdpZTlyZnltMHMxOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">IG</a>
              <a href="https://youtube.com/@guidevera?si=g6Ih8nOTCwPna8jf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">YT</a>
              <a href="https://www.threads.com/@guidevera?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">TH</a>
              <a href="https://wa.me/918979485801" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0EB4A6] hover:border-[#0EB4A6] transition-colors text-white/60 hover:text-white text-xs tracking-wider">WA</a>
            </div>
          </div>
          
          {/* Menu 1: Platform / General Links */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Platform</h4>
            <ul className="space-y-5">
              <li><Link href="/colleges" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">College Search</Link></li>
              <li><Link href="/ability-test" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Ability Test</Link></li>
              <li><Link href="/ability-test" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Career Library</Link></li>
              <li><Link href="/counseling" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Menu 2: Resources */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Resources</h4>
            <ul className="space-y-5">
              <li><Link href="/about" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Student Stories</Link></li>
              <li><Link href="/colleges" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">College Rankings</Link></li>
              <li><Link href="/colleges" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          {/* Menu 3: Company */}
          <div className="lg:col-span-1 pt-2">
            <h4 className="font-semibold text-[15px] mb-6 text-white tracking-wide">Company</h4>
            <ul className="space-y-5">
              <li><Link href="/about" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Careers</Link></li>
              <li><Link href="/counseling" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Contact</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-[#0EB4A6] text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs text-center md:text-left">© 2026 guidevera.com. All rights reserved.</p>
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
