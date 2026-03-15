"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, Settings, Map, Brain } from "lucide-react";
import API_URL from "@/lib/api";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasRoadmap, setHasRoadmap] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { console.error("Failed to parse user session"); }
    }
    // Check test completed flag from localStorage
    setTestCompleted(!!localStorage.getItem("testCompleted"));

    // Check if user has a roadmap in DB (auth-protected)
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/api/roadmap/has`, {
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(json => { if (json.success) setHasRoadmap(json.hasRoadmap); })
        .catch(() => {}); // fail silently — button just stays hidden
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("testCompleted");
    setUser(null);
    setIsProfileOpen(false);
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image src="/guidevera-logo.png" alt="Guidevera Logo" width={160} height={160} className="object-contain" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`}>Home</Link>
              <Link href="/colleges" className={`text-sm font-medium transition-colors ${pathname === "/colleges" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`}>Colleges</Link>
              <Link href="/counseling" className={`text-sm font-medium transition-colors ${pathname === "/counseling" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`}>Counseling</Link>
              <Link href="/ability-test" className={`text-sm font-medium transition-colors ${pathname === "/ability-test" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`}>Exams</Link>
              <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`}>About Us</Link>
            </div>

            {/* Actions / Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 px-3 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0EB4A6] flex items-center justify-center text-black font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#111113] border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden cursor-pointer">

                      {/* User Info */}
                      <div className="px-4 pt-4 pb-3 border-b border-white/8">
                        <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                        <p className="text-xs text-white/40 mt-0.5 truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1.5">
                        <Link
                          href="#"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <Settings className="w-4 h-4 shrink-0" />
                          Profile &amp; Settings
                        </Link>

                        {/* My Roadmap – only if roadmap exists */}
                        {hasRoadmap && (
                          <Link
                            href="/ability-test/roadmap"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#0EB4A6] hover:text-[#0c9c90] hover:bg-[#0EB4A6]/5 rounded-xl transition-colors"
                          >
                            <Map className="w-4 h-4 shrink-0" />
                            My Roadmap
                          </Link>
                        )}

                        {/* Ability Test – disabled if already completed */}
                        {testCompleted ? (
                          <div className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/20 rounded-xl cursor-not-allowed select-none">
                            <Brain className="w-4 h-4 shrink-0" />
                            Test Completed ✓
                          </div>
                        ) : (
                          <Link
                            href="/ability-test"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                          >
                            <Brain className="w-4 h-4 shrink-0" />
                            Start Ability Test
                          </Link>
                        )}

                        <div className="border-t border-white/5 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/8 rounded-xl transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 shrink-0" />
                          Logout
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Log in</Link>
                  <Link href="/signup" className="px-5 py-2.5 text-sm font-medium bg-[#0EB4A6] hover:bg-[#0c9c90] text-white rounded-full transition-all shadow-[0_0_20px_rgba(14,180,166,0.3)]">Sign Up</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white/80 hover:text-white transition-colors">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#09090b] border-b border-white/5 absolute w-full left-0 p-4 flex flex-col gap-4">
            <Link href="/" className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/colleges" className={`text-sm font-medium transition-colors ${pathname === "/colleges" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`} onClick={() => setIsMenuOpen(false)}>Colleges</Link>
            <Link href="/counseling" className={`text-sm font-medium transition-colors ${pathname === "/counseling" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`} onClick={() => setIsMenuOpen(false)}>Counseling</Link>
            <Link href="/ability-test" className={`text-sm font-medium transition-colors ${pathname === "/ability-test" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`} onClick={() => setIsMenuOpen(false)}>Exams</Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === "/about" ? "text-white" : "text-white/60 hover:text-[#0EB4A6]"}`} onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <hr className="border-white/10" />
            {user ? (
              <>
                <div className="flex items-center gap-3 px-1">
                  <div className="w-8 h-8 rounded-full bg-[#0EB4A6] flex items-center justify-center text-black font-bold text-sm uppercase shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                </div>
                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Settings className="w-4 h-4" /> Profile &amp; Settings
                </Link>
                {hasRoadmap && (
                  <Link href="/ability-test/roadmap" className="text-sm text-[#0EB4A6] flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Map className="w-4 h-4" /> My Roadmap
                  </Link>
                )}
                {testCompleted ? (
                  <span className="text-sm text-white/20 flex items-center gap-2 cursor-not-allowed">
                    <Brain className="w-4 h-4" /> Test Completed ✓
                  </span>
                ) : (
                  <Link href="/ability-test" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Brain className="w-4 h-4" /> Start Ability Test
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="text-sm text-red-400 transition-colors flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                <Link href="/signup" className="text-sm font-medium text-[#0EB4A6] transition-colors" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}