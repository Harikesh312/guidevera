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
              >
                <Link 
                  href={`/blog/${blog.slug}`}
                  className="group block bg-[#121214] border border-white/5 rounded-2xl overflow-hidden hover:border-[#0EB4A6]/30 hover:scale-[1.01] transition-all duration-300 shadow-lg flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full bg-[#1a1a1c] overflow-hidden">
                    <Image 
                      src={blog.coverImage || '/images/dbuu.jpg'} 
                      alt={blog.coverAlt || blog.title}
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0EB4A6] text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-[0_2px_10px_rgba(14,180,166,0.3)]">
                        {blog.category || 'Guide'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {blog.featuredPost && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                        <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#0EB4A6] transition-colors duration-300 leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-2 flex-1">
                      {blog.metaDescription}
                    </p>

                    {/* Footer Info */}
                    <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0EB4A6] flex items-center justify-center text-black font-bold text-xs uppercase">
                          {blog.authorName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{blog.authorName}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">
                            {formatDate(blog.publishDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/40">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium">{blog.readingTime} min read</span>
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
