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
              <a href="https://www.linkedin.com/company/guidevera" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#0A66C2] transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/guidevera?s=21" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1A27KFCKv7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#1877F2] transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/guidevera?igsh=MXdpZTlyZnltMHMxOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group relative overflow-hidden">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[url(#ig)] transition-colors absolute z-10" fill="currentColor" viewBox="0 0 24 24">
                  <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                  <path style={{fill: 'currentColor'}} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@guidevera?si=g6Ih8nOTCwPna8jf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#FF0000] transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.threads.com/@guidevera?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24c-3.197 0-4.992-1.332-6.529-2.932-1.558-1.597-2.656-3.882-3.167-5.954-.429-1.748-.686-3.525-.792-5.32-.196-3.21.61-6.104 2.502-8.31C5.694-.282 8.528-.432 11.838-.432h.163v1.86h-.163c-2.484 0-4.66.19-6.095 1.776-1.501 1.666-2.176 3.987-2.028 6.702.106 1.944.381 3.863.856 5.738C5.01 17.5 6.096 19.5 7.427 20.803 8.7 22.052 10.232 23 12.518 23c2.404 0 5.485-.295 6.885-3.08l.06-.118c1.37-2.753.818-6.147-1.1-6.606-.983-.242-1.892-.128-2.657.34-.145-.7-.442-1.391-.864-2.02-.916-1.378-2.5-2.261-4.225-2.261h-.08c-1.704.015-3.275.814-4.279 2.115-1.125 1.48-1.488 3.57-1.47 5.86v.29c.018 2.298.536 4.385 1.576 5.64.935 1.139 2.378 1.838 3.924 1.836h.05c1.474.004 2.894-.539 3.916-1.638.648-.642 1.055-1.41 1.258-2.316.326.012.637-.024.966-.098.397 1.054.607 2.13.606 3.235v1.82zM4.685 13.97v3.085h6.632v1.314c-1.365 0-2.485-.568-3.213-1.442-.81-1.026-.826-2.585-.826-4.502v-1.83c0-2.046.257-4.14 1.155-5.323.774-.997 2.01-1.597 3.344-1.603h.082c1.39-.001 2.656.666 3.42 1.815.748 1.127.873 2.802.94 4.542l.006.144H4.685zm12.338-7.38z"/></svg>
              </a>
              <a href="https://wa.me/918979485801" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#25D366] transition-colors group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.405 0 .021 5.37.018 11.996c0 2.118.553 4.186 1.604 6.007L0 24l6.155-1.613a11.954 11.954 0 005.876 1.53h.005c6.623 0 12.006-5.372 12.01-11.998.002-3.21-1.246-6.223-3.515-8.495C18.261 1.154 15.243.001 12.031 0zm.005 19.932c-1.789 0-3.541-.479-5.078-1.39l-.364-.216-3.77.989.999-3.676-.237-.378a10.012 10.012 0 01-1.528-5.263c.004-5.526 4.503-10.024 10.034-10.024 2.678.001 5.193 1.045 7.087 2.941 1.892 1.895 2.937 4.412 2.935 7.086-.004 5.526-4.504 10.025-10.038 10.025h-.04zm5.505-7.519c-.302-.151-1.785-.882-2.062-.983-.277-.1-.478-.151-.68.151-.202.302-.782.983-.956 1.185-.175.201-.35.226-.653.076-.301-.151-1.275-.47-2.428-1.5-8.973-8.024-11.501-8.58-11.501-8.58-.2 0-.399-.098-.534-.249C-.615 1.554-.615 1.096-.282.723c.319-.356.782-.416 1.178-.168a.987.987 0 01.374.341c.216.353.642.428.98.243.336-.184.453-.45.4-.8-.016-.109-.071-.24-.165-.363-.122-.16-.328-.291-.568-.31-.383-.029-.714.238-.89.673zM15.222 17.5l-3.329-3.33zm1.144.152c-.613.565-1.503.957-2.61.986-1.545.04-2.73-1.04-3.131-1.493l4.604-5.462-2.455.517 3.592 5.452zM6.92 6.784a5.96 5.96 0 00-.655-.17 1.889 1.889 0 00-.77.017c-.378.106-.704.382-.871.745-.16.347-.19.789-.09 1.161.095.353.33.682.682.91.564.364 1.258.461 1.821.2.531-.244.773-.615.823-.889.049-.271.018-.696-.135-1.054a1.886 1.886 0 00-.805-.92z"/></svg>
              </a>
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
          <div className="flex flex-wrap justify-center md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
            <Link href="/terms" className="text-white/40 hover:text-white transition-colors text-xs">Terms of Service</Link>
            <Link href="/privacy" className="text-white/40 hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <Link href="/cookies" className="text-white/40 hover:text-white transition-colors text-xs">Cookie Settings</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
