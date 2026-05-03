"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, User, ArrowRight, Star } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import API_URL from "@/lib/api";

const BlogCardSkeleton = () => (
  <div className="bg-[#121214] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-white/5 w-full"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-white/5 rounded w-1/4"></div>
      <div className="h-6 bg-white/10 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-2/3"></div>
      </div>
      <div className="pt-4 border-t border-white/5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/5"></div>
        <div className="h-4 bg-white/5 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

export default function BlogClient() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0EB4A6]/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight relative z-10"
          >
            Guidevera <span className="text-[#0EB4A6]">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto relative z-10"
          >
            Career insights, college guides & student success stories
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : blogs.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-white/20" />
              </div>
              <h3 className="text-xl font-bold mb-2">No posts yet</h3>
              <p className="text-white/40">Check back soon for new career guides and insights.</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <motion.div 
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={blog.featuredPost ? "col-span-full" : ""}
              >
                <Link 
                  href={`/blog/${blog.slug}`}
                  className={`group block bg-[#121214] border border-white/5 rounded-3xl overflow-hidden hover:border-[#0EB4A6]/30 hover:scale-[1.01] transition-all duration-300 shadow-xl flex flex-col ${blog.featuredPost ? 'lg:flex-row lg:items-stretch' : 'h-full'}`}
                >
                  {/* Image Container */}
                  <div className={`relative bg-[#1a1a1c] overflow-hidden shrink-0 ${blog.featuredPost ? 'h-64 lg:h-auto lg:w-1/2' : 'h-52 w-full'}`}>
                    <Image 
                      src={blog.coverImage || '/images/dbuu.jpg'} 
                      alt={blog.coverAlt || blog.title}
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-[#0EB4A6] text-white text-[10px] font-black px-3 py-1.5 rounded-lg tracking-wider uppercase shadow-lg">
                        {blog.category || 'Guide'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {blog.featuredPost && (
                      <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 shadow-2xl">
                        <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Featured Post</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-10 flex flex-col flex-1 justify-center ${blog.featuredPost ? 'lg:max-w-xl' : ''}`}>
                    <h3 className={`font-bold mb-4 line-clamp-2 group-hover:text-[#0EB4A6] transition-colors duration-300 leading-tight ${blog.featuredPost ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {blog.title}
                    </h3>
                    <p className={`text-white/50 mb-8 line-clamp-3 flex-1 leading-relaxed ${blog.featuredPost ? 'text-base' : 'text-sm'}`}>
                      {blog.metaDescription}
                    </p>

                    {/* Footer Info */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EB4A6] to-[#0fdad3] flex items-center justify-center text-black font-bold text-sm shadow-lg">
                          {blog.authorName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{blog.authorName}</p>
                          <p className="text-[10px] text-white/30 mt-0.5 font-medium uppercase tracking-wider">
                            {formatDate(blog.publishDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold tracking-tight">{blog.readingTime} MIN READ</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
