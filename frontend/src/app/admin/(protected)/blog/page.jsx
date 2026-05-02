"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, Edit, Trash2, Eye, PenTool, Search, Filter, 
  ArrowLeft, ImageIcon, Star, Clock, User, AlertCircle, FileText, Loader2, X, ExternalLink, Calendar
} from "lucide-react";
import API_URL from "@/lib/api";

export default function AdminBlogDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Published' | 'Drafts' | 'Featured'
  const [togglingSlug, setTogglingSlug] = useState(null); // slug of the post whose status is being toggled
  const [deletingSlug, setDeletingSlug] = useState(null); // slug of post being deleted
  const [selectedBlog, setSelectedBlog] = useState(null); // blog for preview modal

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_URL}/api/blog/admin/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
      else setError(data.message || 'Failed to load.');
    } catch {
      setError('Network error. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    if (!window.confirm(`Change status to ${newStatus}?`)) return;

    setTogglingSlug(slug);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/blog/admin/${slug}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.map(b => b.slug === slug ? { ...b, status: newStatus } : b));
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    } finally {
      setTogglingSlug(null);
    }
  };

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    setDeletingSlug(slug);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/blog/admin/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        // Optimistic UI - filter out immediately
        setBlogs(blogs.filter(b => b.slug !== slug));
      } else {
        alert("Delete failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    } finally {
      setDeletingSlug(null);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.authorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Published' && b.status === 'published') ||
      (activeFilter === 'Drafts' && b.status === 'draft') ||
      (activeFilter === 'Featured' && b.featuredPost === true);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/admin')}
            className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2a2a4a] text-[#a0a0c0]">
                Total: {blogs.length}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Published: {blogs.filter(b => b.status === 'published').length}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Drafts: {blogs.filter(b => b.status === 'draft').length}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => router.push('/admin/blog/new')}
          className="bg-gradient-to-r from-[#0EB4A6] to-[#0b8f84] text-white px-5 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(14,180,166,0.3)] hover:opacity-90 transition-all cursor-pointer"
        >
          <PenTool size={14} /> New Post
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search posts by title, author, tag..." 
              className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-[#a0a0c0] focus:border-[#0EB4A6] focus:outline-none transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Published', 'Drafts', 'Featured'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === filter 
                    ? 'bg-[#0EB4A6] text-white' 
                    : 'bg-[#1a1a2e] border border-[#2a2a4a] text-[#a0a0c0] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-6 pb-10">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a2e] border-b border-[#2a2a4a]">
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[40px]">#</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[80px]">Cover</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3">Post</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[140px]">Author</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[100px]">Category</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[100px]">Status</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[110px]">Date</th>
                <th className="text-xs font-semibold text-[#a0a0c0] uppercase tracking-wider px-4 py-3 w-[120px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a4a]">
              {loading ? (
                // Skeleton Rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-[#2a2a4a]">
                    <td className="px-4 py-4"><div className="w-6 h-3 bg-[#2a2a4a] rounded animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="w-14 h-10 bg-[#2a2a4a] rounded-lg animate-pulse" /></td>
                    <td className="px-4 py-4">
                      <div className="w-48 h-3 bg-[#2a2a4a] rounded animate-pulse mb-2" />
                      <div className="w-32 h-2 bg-[#2a2a4a] rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-4"><div className="w-20 h-3 bg-[#2a2a4a] rounded animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="w-16 h-3 bg-[#2a2a4a] rounded animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="w-20 h-6 bg-[#2a2a4a] rounded-full animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="w-16 h-3 bg-[#2a2a4a] rounded animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="w-20 h-6 bg-[#2a2a4a] rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={8} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#2a2a4a] flex items-center justify-center">
                        <FileText size={28} className="text-[#a0a0c0]" />
                      </div>
                      <p className="text-white font-semibold text-lg">
                        {searchQuery || activeFilter !== 'All' ? 'No posts match your filter' : 'No blog posts yet'}
                      </p>
                      <p className="text-[#a0a0c0] text-sm">
                        {searchQuery || activeFilter !== 'All'
                          ? 'Try a different search term or filter.'
                          : 'Click "New Post" to write your first blog.'}
                      </p>
                      {!searchQuery && activeFilter === 'All' && (
                        <button
                          onClick={() => router.push('/admin/blog/new')}
                          className="mt-2 bg-[#0EB4A6] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#0b8f84] transition-colors"
                        >
                          Write First Post
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog, idx) => (
                  <tr key={blog._id} className="border-b border-[#2a2a4a] hover:bg-[#1a1a2e]/50 transition-colors group">
                    <td className="px-4 py-4 text-[#a0a0c0] text-sm">{idx + 1}</td>
                    <td className="px-4 py-4">
                      {blog.coverImage ? (
                        <img src={blog.coverImage} className="w-14 h-10 object-cover rounded-lg border border-[#2a2a4a]" alt="" />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-[#2a2a4a] flex items-center justify-center">
                          <ImageIcon size={16} className="text-[#a0a0c0]" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white text-sm leading-tight line-clamp-1">{blog.title}</h4>
                        {blog.featuredPost && (
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#a0a0c0] line-clamp-1 mb-2">{blog.metaDescription}</p>
                      <div className="flex flex-wrap gap-1">
                        {(blog.tags || []).slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-[#2a2a4a] text-[#a0a0c0] text-[10px] px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {(blog.tags || []).length > 3 && (
                          <span className="text-[10px] text-[#a0a0c0] py-0.5">
                            +{(blog.tags || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full bg-[#0EB4A6]/20 text-[#0EB4A6] text-xs font-bold flex items-center justify-center shrink-0">
                          {(blog.authorName || '?').charAt(0)}
                        </div>
                        <div className="ml-2 min-w-0">
                          <p className="text-sm text-white truncate">{blog.authorName}</p>
                          <p className="text-[10px] text-[#a0a0c0] truncate">{blog.authorRole || 'Author'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {blog.category ? (
                        <span className="bg-[#2a2a4a] text-[#a0a0c0] text-xs px-2 py-1 rounded-md capitalize">
                          {blog.category}
                        </span>
                      ) : (
                        <span className="text-[#a0a0c0]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleStatusToggle(blog.slug, blog.status)}
                        disabled={togglingSlug === blog.slug}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                          blog.status === 'published'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        }`}
                      >
                        {togglingSlug === blog.slug ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          blog.status === 'published' ? 'Published' : 'Draft'
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-[#a0a0c0]">
                        {new Date(blog.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-[#a0a0c0] mt-1 italic">{blog.readingTime} min read</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setSelectedBlog(blog)}
                          className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] hover:text-white transition-colors cursor-pointer"
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => router.push(`/admin/blog/new?edit=${blog.slug}`)}
                          className="p-2 rounded-lg hover:bg-[#0EB4A6]/10 text-[#a0a0c0] hover:text-[#0EB4A6] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.slug, blog.title)}
                          disabled={deletingSlug === blog.slug}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-[#a0a0c0] hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          {deletingSlug === blog.slug ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#2a2a4a] flex items-center justify-between bg-[#1a1a2e]/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedBlog.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {selectedBlog.status}
                </span>
                <h3 className="font-bold text-white truncate max-w-md">{selectedBlog.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open(`/blog/${selectedBlog.slug}`, '_blank')}
                  className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] hover:text-white transition-colors cursor-pointer"
                  title="View Public Link"
                >
                  <ExternalLink size={18} />
                </button>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              {selectedBlog.coverImage && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-[#2a2a4a]">
                  <img src={selectedBlog.coverImage} className="w-full h-full object-cover" alt="" />
                </div>
              )}
              
              <h1 className="text-3xl font-bold mb-6 text-white leading-tight">{selectedBlog.title}</h1>
              
              <div className="flex items-center gap-6 mb-8 text-[#a0a0c0] text-sm border-b border-[#2a2a4a] pb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{selectedBlog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(selectedBlog.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{selectedBlog.readingTime} min read</span>
                </div>
              </div>

              <div 
                className="prose prose-invert max-w-none 
                  prose-h2:text-white prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-[#a0a0c0] prose-p:leading-relaxed prose-p:mb-4
                  prose-img:rounded-2xl prose-img:border prose-img:border-[#2a2a4a]
                  prose-strong:text-white prose-a:text-[#0EB4A6]"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#2a2a4a] flex items-center justify-end gap-3 bg-[#1a1a2e]/50">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 rounded-xl border border-[#2a2a4a] text-[#a0a0c0] hover:text-white hover:bg-[#2a2a4a] transition-all cursor-pointer text-sm font-medium"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedBlog(null);
                  router.push(`/admin/blog/new?edit=${selectedBlog.slug}`);
                }}
                className="px-5 py-2 rounded-xl bg-[#0EB4A6] text-white font-bold hover:bg-[#0b8f84] transition-all cursor-pointer text-sm shadow-[0_4px_12px_rgba(14,180,166,0.2)]"
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
