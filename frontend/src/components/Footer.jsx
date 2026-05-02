import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaThreads, FaLinkedinIn, FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] pt-20 pb-12 border-t border-white/5 relative z-20 overflow-hidden">
      {/* Decorative Gradient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none -mt-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20 items-start">
          
          {/* Brand Column */}
          <div className="space-y-2">
            <Link href="/" className="block">
              <Image 
                src="/guidevera-logo.png" 
                alt="Guidevera Logo" 
                width={170} 
                height={60} 
                className="object-contain" 
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Empowering students with scientifically designed career guidance, 
              psychometric testing, and curated college discoveries to shape 
              the leaders of tomorrow.
            </p>
            <div className="flex flex-nowrap gap-2 md:gap-3">
              {[
                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/guidevera", color: "hover:bg-[#0077b5]" },
                { icon: <FaXTwitter />, href: "https://x.com/guidevera?s=21", color: "hover:bg-white/10" },
                { icon: <FaFacebookF />, href: "https://www.facebook.com/share/1A27KFCKv7/?mibextid=wwXIfr", color: "hover:bg-[#1877f2]" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/guidevera", color: "hover:bg-[#e4405f]" },
                { icon: <FaYoutube />, href: "https://youtube.com/@guidevera", color: "hover:bg-[#cd201f]" },
                { icon: <FaThreads />, href: "https://www.threads.com/@guidevera?igshid=NTc4MTIwNjQ2YQ==", color: "hover:bg-white/10" },
                { icon: <FaWhatsapp />, href: "https://wa.me/918979485801", color: "hover:bg-[#25d366]" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0`}
                >
                  <span className="scale-75 md:scale-100">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:pl-8">
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2 h-22">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EB4A6]" />
              Platform
            </h4>
            <ul className="space-y-4">
              {[
                { label: "College Search", href: "/colleges" },
                { label: "Ability Test", href: "/ability-test" },
                { label: "Expert Counseling", href: "/counseling" },
                { label: "Blog & Updates", href: "/blog" },
                { label: "About Guidevera", href: "/about" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href} 
                    className="text-white/40 hover:text-[#0EB4A6] text-sm transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2 h-22">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EB4A6]" />
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#0EB4A6]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider font-bold">Email</p>
                  <a href="mailto:contact@guidevera.com" className="text-sm text-white/80 hover:text-[#0EB4A6] transition-colors cursor-pointer">contact@guidevera.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#0EB4A6]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider font-bold">Phone</p>
                  <a href="tel:+918979485801" className="text-sm text-white/80 hover:text-[#0EB4A6] transition-colors cursor-pointer">+91 89794 85801</a>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] sm:text-xs">
            &copy; 2026 Guidevera Education. All rights reserved. Built for India's Future.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-white/30 hover:text-white text-[10px] sm:text-xs transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white text-[10px] sm:text-xs transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
