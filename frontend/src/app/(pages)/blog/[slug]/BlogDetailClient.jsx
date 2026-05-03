"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, Calendar, User, Star, Tag, Share2, 
  MessageCircle, ChevronRight, GraduationCap, MapPin, ExternalLink, Check
} from "lucide-react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import API_URL from "@/lib/api";

export default function BlogDetailClient({ slug }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shareStatus, setShareStatus] = useState("idle"); // idle, copied
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug || slug === 'undefined') return;
      try {
        const res = await fetch(`${API_URL}/api/blog/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);
          document.title = `${data.blog.title} | Guidevera Blog`;
          
          // Fetch recommendations
          const recRes = await fetch(`${API_URL}/api/blog`);
          const recData = await recRes.json();
          if (recData.success) {
            setRecommendations(recData.blogs.filter(b => b.slug !== slug).slice(0, 3));
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0EB4A6]/20 border-t-[#0EB4A6] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <div className="bg-[#121214] border border-white/5 rounded-3xl p-12 max-w-lg mx-auto shadow-2xl">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-white/60 mb-8">The blog post you are looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-3 bg-[#0EB4A6] text-black font-bold rounded-xl hover:bg-[#0c9c90] transition-all">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (!blog) return;
    
    const shareData = {
      title: blog.title,
      text: blog.metaDescription,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("copied");
        setTimeout(() => setShareStatus("idle"), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#0EB4A6] selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-[#0EB4A6] transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-medium">Back to Blog</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Content (2/3) */}
          <div className="flex-1 w-full min-w-0">
            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-2xl">
              <Image 
                src={blog.coverImage || '/images/dbuu.jpg'} 
                alt={blog.coverAlt || blog.title}
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <span className="bg-[#0EB4A6] text-white text-xs font-bold px-3 py-1.5 rounded-lg tracking-widest uppercase shadow-lg">
                  {blog.category || 'Guide'}
                </span>
                {blog.featuredPost && (
                  <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 text-xs font-bold shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                    FEATURED
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-[1.1]">
              {blog.title}
            </h1>

            {/* Author Row */}
            <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EB4A6] to-[#0fdad3] flex items-center justify-center text-black font-bold text-xl shadow-lg">
                  {blog.authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white leading-tight">{blog.authorName}</p>
                  <p className="text-xs text-white/40 mt-1">Verified Publisher</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(blog.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="bg-white/5 px-2 py-1 rounded-md text-[10px] font-bold text-[#0EB4A6] tracking-wider uppercase border border-[#0EB4A6]/10">
                    {blog.readingTime} MIN READ
                  </span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            {blog.tableOfContents && blog.tableOfContents.length > 0 && (
              <div className="mb-12 p-8 bg-[#121214] rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EB4A6]/5 blur-[60px] rounded-full pointer-events-none" />
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                   <Star size={20} className="text-[#0EB4A6]" /> Table of Contents
                </h3>
                <nav className="space-y-4">
                  {blog.tableOfContents.map((item, i) => (
                    <a 
                      key={i} 
                      href={`#${item.id}`}
                      className="block text-white/60 hover:text-[#0EB4A6] transition-colors text-sm md:text-base font-medium flex items-center gap-3"
                      style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0EB4A6]/30" />
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Rendered HTML Content */}
            <div className="blog-content-wrapper relative">
              <style dangerouslySetInnerHTML={{ __html: `
                .blog-content-wrapper .prose {
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 1.125rem;
                  line-height: 1.8;
                }
                .blog-content-wrapper .prose h1,
                .blog-content-wrapper .prose h2,
                .blog-content-wrapper .prose h3,
                .blog-content-wrapper .prose h4 {
                  color: white;
                  font-weight: 700;
                  margin-top: 2.5rem;
                  margin-bottom: 1.25rem;
                  scroll-margin-top: 100px;
                }
                .blog-content-wrapper .prose h1 { font-size: 2.25rem; }
                .blog-content-wrapper .prose h2 { font-size: 1.875rem; }
                .blog-content-wrapper .prose h3 { font-size: 1.5rem; }
                .blog-content-wrapper .prose p {
                  margin-bottom: 1.5rem;
                }
                .blog-content-wrapper .prose a {
                  color: #0EB4A6;
                  text-decoration: underline;
                  text-underline-offset: 4px;
                  transition: color 0.2s;
                }
                .blog-content-wrapper .prose a:hover {
                  color: #0fdad3;
                }
                .blog-content-wrapper .prose img {
                  border-radius: 1.5rem;
                  margin: 2.5rem 0;
                  border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .blog-content-wrapper .prose blockquote {
                  border-left: 4px solid #0EB4A6;
                  padding: 1rem 0 1rem 1.5rem;
                  margin: 2rem 0;
                  background: rgba(14, 180, 166, 0.05);
                  border-radius: 0 1rem 1rem 0;
                  color: rgba(255, 255, 255, 0.9);
                  font-style: italic;
                }
                .blog-content-wrapper .prose pre {
                  background: #111113;
                  padding: 1.5rem;
                  border-radius: 1rem;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  overflow-x: auto;
                  margin: 2rem 0;
                }
                .blog-content-wrapper .prose code {
                  background: rgba(14, 180, 166, 0.1);
                  color: #0EB4A6;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                  font-size: 0.9em;
                }
                .blog-content-wrapper .prose ul, 
                .blog-content-wrapper .prose ol {
                  margin-bottom: 1.5rem;
                  padding-left: 1.5rem;
                }
                .blog-content-wrapper .prose li {
                  margin-bottom: 0.5rem;
                }
                .blog-content-wrapper .prose table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 2rem 0;
                  font-size: 0.9375rem;
                }
                .blog-content-wrapper .prose th,
                .blog-content-wrapper .prose td {
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  padding: 0.75rem 1rem;
                  text-align: left;
                }
                .blog-content-wrapper .prose th {
                  background: rgba(255, 255, 255, 0.03);
                  color: white;
                  font-weight: 600;
                }
              `}} />
              <div 
                className="prose prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </div>
          </div>

          {/* Sticky Sidebar (1/3) */}
          <aside className="w-full lg:w-[350px] shrink-0 space-y-8 lg:sticky lg:top-32">
            {/* Author Bio Card */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EB4A6]/5 blur-[60px] rounded-full pointer-events-none" />
              <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-6">About Guidevera</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0EB4A6] to-[#0fdad3] flex items-center justify-center text-black font-bold text-2xl shadow-lg">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg leading-tight">Guidevera</h4>
                  <p className="text-xs text-[#0EB4A6] mt-1 font-medium">Career Excellence Platform</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Guidevera provides scientifically validated ability assessments, expert career counseling, and data-driven college recommendations — replacing guesswork with clarity for your future.
              </p>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
                <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                  <Star size={14} className="text-[#fbbf24]" /> More for You
                </h3>
                <div className="space-y-6">
                  {recommendations.map((rec) => (
                    <Link key={rec.slug} href={`/blog/${rec.slug}`} className="block group">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative border border-white/5">
                          <Image 
                            src={rec.coverImage || '/images/dbuu.jpg'} 
                            alt={rec.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#0EB4A6] transition-colors line-clamp-2 leading-snug mb-1">
                            {rec.title}
                          </h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                            {rec.category || 'General'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="block w-full py-3 text-center border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all text-[#0EB4A6]">
                  View All Blogs
                </Link>
              </div>
            )}

            {/* Tags Card */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Tag size={14} /> Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Counseling CTA (Consistent with College Detail Sidebar) */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[#0EB4A6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EB4A6]/10 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="w-12 h-12 bg-[#0EB4A6]/10 border border-[#0EB4A6]/20 rounded-2xl flex items-center justify-center mb-4 text-[#0EB4A6]">
                <GraduationCap size={24} />
              </div>
              
              <h3 className="font-bold text-xl mb-2 relative z-10">Want expert career guidance?</h3>
              <p className="text-sm text-white/60 mb-6 relative z-10 leading-relaxed">
                Our counselors help you choose the right college and course based on your personality and goals.
              </p>
              
              <div className="flex flex-col gap-3 relative z-10">
                <Link 
                  href="/counseling"
                  className="w-full py-3.5 bg-[#0EB4A6] hover:bg-[#0c9c90] text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_-10px_rgba(14,180,166,0.5)]"
                >
                  Book Free Session
                </Link>
                <Link 
                  href="/ability-test" 
                  className="w-full py-3.5 bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  Start Ability Test
                </Link>
              </div>
            </div>

            {/* Share Post */}
            <div 
              onClick={handleShare}
              className="bg-[#121214] border border-white/5 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center ${
                  shareStatus === 'copied' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-white/5 border-white/10 text-white/60 group-hover:text-[#0EB4A6]'
                }`}>
                  {shareStatus === 'copied' ? <Check size={18} /> : <Share2 size={18} />}
                </div>
                <span className={`text-sm font-bold transition-colors ${
                  shareStatus === 'copied' ? 'text-green-400' : 'text-white/80'
                }`}>
                  {shareStatus === 'copied' ? 'Link Copied!' : 'Share this post'}
                </span>
              </div>
              <ChevronRight size={18} className={`transition-colors ${
                shareStatus === 'copied' ? 'text-green-400' : 'text-white/20 group-hover:text-white'
              }`} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
