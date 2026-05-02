"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, Users, GraduationCap, LayoutDashboard, 
  ChevronRight, ArrowUpRight, Clock, Star, PenTool, ExternalLink,
  MessageSquare, Briefcase, Settings, LogOut, Loader2, Check
} from "lucide-react";
import API_URL from "@/lib/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/blog/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setStats(data.stats);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0EB4A6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Navigation (Simplified for this view) */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#1a1a2e] border-r border-[#2a2a4a] p-6 z-50 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EB4A6] to-[#0b8f84] flex items-center justify-center shadow-[0_0_15px_rgba(14,180,166,0.3)]">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Admin Hub</span>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0EB4A6]/10 text-[#0EB4A6] font-bold transition-all cursor-pointer">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => router.push('/admin/blog')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a0a0c0] hover:text-white hover:bg-[#2a2a4a] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} /> Blog Manager
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a0a0c0] hover:text-white hover:bg-[#2a2a4a] transition-all group cursor-not-allowed">
            <div className="flex items-center gap-3">
              <GraduationCap size={18} /> Colleges
            </div>
            <span className="text-[10px] bg-[#2a2a4a] px-2 py-0.5 rounded text-white/40">Soon</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a0a0c0] hover:text-white hover:bg-[#2a2a4a] transition-all group cursor-not-allowed">
            <div className="flex items-center gap-3">
              <Users size={18} /> Counselors
            </div>
            <span className="text-[10px] bg-[#2a2a4a] px-2 py-0.5 rounded text-white/40">Soon</span>
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 lg:p-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Welcome Back, Admin</h1>
            <p className="text-[#a0a0c0]">Here's what's happening across your platform today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.open('/', '_blank')}
              className="px-5 py-2.5 rounded-xl border border-[#2a2a4a] hover:bg-[#2a2a4a] transition-all flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <ExternalLink size={16} /> View Site
            </button>
            <button 
              onClick={() => router.push('/admin/blog/new')}
              className="px-5 py-2.5 rounded-xl bg-[#0EB4A6] text-white font-bold hover:bg-[#0b8f84] transition-all flex items-center gap-2 text-sm shadow-[0_10px_20px_-10px_rgba(14,180,166,0.4)] cursor-pointer"
            >
              <PenTool size={16} /> New Blog Post
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Blogs', value: stats?.total || 0, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Published', value: stats?.published || 0, icon: Check, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: 'Drafts', value: stats?.drafts || 0, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { label: 'Featured', value: stats?.featured || 0, icon: Star, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1a1a2e] border border-[#2a2a4a] p-6 rounded-3xl shadow-sm hover:border-[#2a2a4a]/80 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                  <stat.icon size={24} />
                </div>
                <ArrowUpRight size={20} className="text-[#a0a0c0] opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
              </div>
              <h3 className="text-[#a0a0c0] text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity (Placeholders) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-[#2a2a4a] flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <Clock size={18} className="text-[#0EB4A6]" /> Recent Blog Activity
                </h3>
                <button 
                  onClick={() => router.push('/admin/blog')}
                  className="text-xs text-[#0EB4A6] font-bold hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
              <div className="p-2">
                <div className="px-4 py-12 text-center text-[#a0a0c0]">
                  <p className="text-sm italic">Detailed activity log coming soon.</p>
                  <button 
                    onClick={() => router.push('/admin/blog')}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#2a2a4a] text-white text-sm font-bold hover:bg-[#32325a] transition-all cursor-pointer"
                  >
                    Manage Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-[#0EB4A6] to-[#0b8f84] p-6 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-white text-lg font-bold mb-2 relative z-10">Quick Tip</h3>
              <p className="text-white/80 text-sm leading-relaxed relative z-10 mb-6">
                Keep your blog active! Featured posts get 2x more engagement from students.
              </p>
              <button 
                onClick={() => router.push('/admin/blog/new')}
                className="w-full py-3 bg-white text-[#0EB4A6] font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 cursor-pointer"
              >
                Create Featured Post
              </button>
            </div>

            <div className="bg-[#1a1a2e] border border-[#2a2a4a] p-6 rounded-3xl shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-[#a0a0c0]">
                <Settings size={14} /> System Health
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Server Status</span>
                  <span className="flex items-center gap-1.5 text-green-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">DB Connection</span>
                  <span className="text-[#a0a0c0]">Optimized</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Image Storage</span>
                  <span className="text-[#0EB4A6] font-bold">Cloudinary</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
