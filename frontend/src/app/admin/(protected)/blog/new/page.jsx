"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { CharacterCount } from "@tiptap/extension-character-count";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, CheckSquare, Quote, Link as LinkIcon,
  Image as ImageIcon, Table as TableIcon, Minus, CodeSquare,
  Highlighter, Eraser, Undo, Redo, PenTool, X, ChevronDown, Check,
  Save, Eye, Calendar, Clock, Lock, Settings, Type, LayoutTemplate, Share2, LogOut, Loader2,
  Star, Trash2, User, ArrowLeft, Plus
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import API_URL from "@/lib/api";

export function BlogAdminPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');
  const isEditMode = !!editSlug;

  const [title, setTitle] = useState("");
  const [saveState, setSaveState] = useState("saved");

  // Sidebar states
  const [toc, setToc] = useState([]);
  const [includeToc, setIncludeToc] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const [schedulePost, setSchedulePost] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");

  // Categories and Tags
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Blog Settings
  const [allowComments, setAllowComments] = useState(true);
  const [featuredPost, setFeaturedPost] = useState(false);
  const [showAuthorInfo, setShowAuthorInfo] = useState(true);
  const [readingTimeMode, setReadingTimeMode] = useState("auto");
  const [manualReadingTime, setManualReadingTime] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");

  // Modals
  const [showPreview, setShowPreview] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(true);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
      CharacterCount,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setSaveState("unsaved");
      if (toc.length === 0) {
        const headings = [];
        editor.state.doc.descendants((node, pos) => {
          if (node.type.name === 'heading' && node.attrs.level <= 3) {
            headings.push({
              level: node.attrs.level,
              text: node.textContent,
              id: `heading-${pos}`
            });
          }
        });
        setToc(headings);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] text-gray-200',
      },
    },
  });

  // Pre-fill state for Edit Mode
  useEffect(() => {
    if (!editSlug || !editor) return;
    const load = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/blog/admin/${editSlug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.success) { alert('Failed to load post for editing.'); return; }
      const b = data.blog;
      setTitle(b.title || '');
      setSlug(b.slug || '');
      setMetaDesc(b.metaDescription || '');
      setCoverImageUrl(b.coverImage || '');
      setCoverImage(b.coverImage || null);
      setCoverAlt(b.coverAlt || '');
      setAuthorName(b.authorName || '');
      setAuthorRole(b.authorRole || '');
      setAuthorBio(b.authorBio || '');
      setSelectedCategory(b.category || '');
      setTags(b.tags || []);
      setFeaturedPost(b.featuredPost || false);
      setVisibility(b.visibility || 'public');
      setPassword(b.password || '');
      setAllowComments(b.allowComments !== false);
      setShowAuthorInfo(b.showAuthorInfo !== false);
      if (b.publishDate) {
        const d = new Date(b.publishDate);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setPublishDate(`${year}-${month}-${day}`);
        setPublishTime(String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'));
      }
      if (b.readingTime) {
        setReadingTimeMode('manual');
        setManualReadingTime(String(b.readingTime));
      }
      editor.commands.setContent(b.content || '');
    };
    load();
  }, [editSlug, editor]);

  // Default to today's date for new posts
  useEffect(() => {
    if (!isEditMode && !publishDate) {
      const now = new Date();
      setPublishDate(now.toISOString().split('T')[0]);
      setPublishTime(now.toTimeString().slice(0, 5));
    }
  }, [isEditMode, publishDate]);

  const saveBlog = async (statusOverride) => {
    const token = localStorage.getItem('token');
    const payload = {
      title,
      slug,
      content: editor.getHTML(),
      metaDescription: metaDesc,
      coverImage: coverImageUrl || coverImage || '',
      coverAlt,
      authorName,
      category: selectedCategory,
      tags,
      status: statusOverride,
      visibility,
      password,
      featuredPost,
      readingTime: readingTimeMode === 'manual' ? parseInt(manualReadingTime) || readTime : readTime,
      tableOfContents: toc,
      publishDate: publishDate ? new Date(`${publishDate}T${publishTime || '00:00'}`) : new Date(),
    };
    const res = await fetch(`${API_URL}/api/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  useEffect(() => {
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title]);

  if (!editor) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0EB4A6] animate-spin" />
      </div>
    );
  }

  const wordCount = editor.storage?.characterCount?.words() || 0;
  const readTime = Math.ceil(wordCount / 200) || 1;

  const getMetaColor = () => {
    const len = metaDesc.length;
    if (len === 0) return "text-gray-400";
    if (len <= 120) return "text-[#2ed573]";
    if (len <= 155) return "text-[#ffa502]";
    return "text-[#ff4757]";
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/blog/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCoverImageUrl(data.imageUrl);
        setCoverImage(data.imageUrl);
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl, target: linkNewTab ? '_blank' : '_self' }).run();
    }
    setShowLinkModal(false);
    setLinkUrl("");
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/blog/admin/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          editor.chain().focus().setImage({ src: data.imageUrl }).run();
        } else {
          alert("Upload failed: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error uploading image.");
      }
    };
    input.click();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const syncToc = () => {
    const headings = [];
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'heading' && node.attrs.level <= 3) {
        headings.push({
          level: node.attrs.level,
          text: node.textContent,
          id: `heading-${pos}`
        });
      }
    });
    setToc(headings);
  };

  const currentHeadingLevel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1';
    if (editor.isActive('heading', { level: 2 })) return 'H2';
    if (editor.isActive('heading', { level: 3 })) return 'H3';
    if (editor.isActive('heading', { level: 4 })) return 'H4';
    if (editor.isActive('heading', { level: 5 })) return 'H5';
    if (editor.isActive('heading', { level: 6 })) return 'H6';
    return 'Paragraph';
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const levelColors = {
    1: { bg: 'bg-[#0EB4A6]/15', border: 'border-[#0EB4A6]/40', text: 'text-[#0EB4A6]' },
    2: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    3: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Toolbar */}
      <div className="sticky top-0 z-40 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/blog')}
            className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] hover:text-white transition-colors cursor-pointer"
            title="Back to Blog List"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EB4A6] to-[#0b8f84] flex items-center justify-center shadow-[0_0_15px_rgba(14,180,166,0.3)]">
            <PenTool size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">
              {isEditMode ? 'Edit Post' : 'Blog Admin'}
            </h1>
            <div className="flex items-center gap-2 text-xs text-[#a0a0c0] mt-0.5">
              {isEditMode && (
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium mr-1">
                  Editing
                </span>
              )}
              {saveState === "saving" && (
                <><span className="w-2 h-2 rounded-full bg-[#ffa502] animate-pulse"></span> Saving...</>
              )}
              {saveState === "saved" && (
                <><span className="w-2 h-2 rounded-full bg-[#2ed573]"></span> All changes saved</>
              )}
              {saveState === "unsaved" && (
                <><span className="w-2 h-2 rounded-full bg-gray-500"></span> Unsaved changes</>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-[#2a2a4a] hover:bg-[#ff4757]/10 hover:text-[#ff4757] hover:border-[#ff4757]/30 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Logout
          </button>
          <div className="w-px h-6 bg-[#2a2a4a] mx-1"></div>
          <button
            className="px-4 py-2 rounded-lg border border-[#2a2a4a] hover:bg-[#2a2a4a] text-sm font-medium transition-colors cursor-pointer"
            onClick={async () => {
              setSaveState('saving');
              const result = await saveBlog('draft');
              setSaveState(result.success ? 'saved' : 'unsaved');
              if (!result.success) alert('Save failed: ' + result.message);
            }}
          >
            Save Draft
          </button>
          <button
            className="px-4 py-2 rounded-lg border border-[#2a2a4a] hover:bg-[#2a2a4a] text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            onClick={() => setShowPreview(true)}
          >
            <Eye size={16} /> Preview
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#0EB4A6] to-[#0b8f84] hover:from-[#0b8f84] hover:to-[#097b71] text-white text-sm font-bold shadow-[0_0_20px_rgba(14,180,166,0.3)] hover:shadow-[0_0_25px_rgba(14,180,166,0.5)] transition-all flex items-center gap-2 cursor-pointer"
            onClick={() => setShowPublishModal(true)}
          >
            <Check size={16} strokeWidth={3} /> {isEditMode ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 flex gap-8">
        {/* Main Editor Area */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Title Input */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-8 shadow-xl">
            <input
              type="text"
              placeholder="Enter post title..."
              className="w-full bg-transparent text-4xl font-bold text-white placeholder:text-[#2a2a4a] focus:outline-none mb-4"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSaveState("unsaved");
              }}
            />
            <div className="flex items-center gap-4 text-sm text-[#a0a0c0]">
              <div className="flex items-center gap-1.5">
                <LayoutTemplate size={14} className="text-[#0EB4A6]" />
                <span>Permalink: </span>
                <span className="text-[#0EB4A6] hover:underline cursor-pointer">guidevera.com/blog/</span>
                <input
                  type="text"
                  className="bg-transparent border-b border-[#2a2a4a] focus:border-[#0EB4A6] focus:outline-none px-1 text-[#0EB4A6] w-auto inline-block"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-2 flex flex-wrap items-center gap-1 sticky top-24 z-30 shadow-lg">
            {/* Text Style */}
            <div className="flex items-center gap-1 pr-2 border-r border-[#2a2a4a]">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#2a2a4a] text-sm font-medium transition-colors min-w-[100px] justify-between">
                  {currentHeadingLevel()} <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                  <button onClick={() => editor.chain().focus().setParagraph().run()} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a4a] text-sm">Paragraph</button>
                  <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a4a] text-xl font-bold">Heading 1</button>
                  <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a4a] text-lg font-bold">Heading 2</button>
                  <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a4a] text-base font-bold">Heading 3</button>
                </div>
              </div>
            </div>

            {/* Formatting */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Bold size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Italic size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><UnderlineIcon size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Strikethrough size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('code') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Code size={18} /></button>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><AlignLeft size={18} /></button>
              <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><AlignCenter size={18} /></button>
              <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><AlignRight size={18} /></button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><List size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><ListOrdered size={18} /></button>
              <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Quote size={18} /></button>
            </div>

            {/* Media & Tools */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-[#2a2a4a]">
              <button onClick={() => setShowLinkModal(true)} className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><LinkIcon size={18} /></button>
              <button onClick={insertImage} className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] transition-colors"><ImageIcon size={18} /></button>
              <button onClick={insertTable} className={`p-2 rounded-lg transition-colors ${editor.isActive('table') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><TableIcon size={18} /></button>
              <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] transition-colors"><Minus size={18} /></button>
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5 ml-auto">
              <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] transition-colors"><Undo size={18} /></button>
              <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded-lg hover:bg-[#2a2a4a] text-[#a0a0c0] transition-colors"><Redo size={18} /></button>
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl p-10 shadow-2xl min-h-[700px] relative">
            <EditorContent editor={editor} />

            {/* Bubble Menu */}
            {editor && (
              <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl shadow-2xl flex items-center p-1 gap-1 overflow-hidden backdrop-blur-md">
                  <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Bold size={16} /></button>
                  <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><Italic size={16} /></button>
                  <button onClick={() => setShowLinkModal(true)} className={`p-1.5 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-[#0EB4A6] text-white' : 'hover:bg-[#2a2a4a] text-[#a0a0c0]'}`}><LinkIcon size={16} /></button>
                </div>
              </BubbleMenu>
            )}
          </div>

          {/* Footer Stats */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl px-6 py-3 flex items-center justify-between text-sm text-[#a0a0c0]">
            <div className="flex items-center gap-6">
              <span>{wordCount} words</span>
              <span>{editor ? (editor.storage?.characterCount?.characters() || 0) : 0} characters</span>
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Type size={14} />
              <span>UTF-8</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[380px] shrink-0 space-y-6">

          {/* Publish Section */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#2a2a4a]/30 px-6 py-4 border-b border-[#2a2a4a] flex items-center gap-2 font-bold">
              <Calendar size={18} className="text-[#0EB4A6]" /> Publish Settings
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a0a0c0] uppercase tracking-wider">Visibility</label>
                <div className="grid grid-cols-3 gap-2">
                  {["public", "private", "password"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVisibility(v)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all capitalize ${visibility === v ? "bg-[#0EB4A6] border-[#0EB4A6] text-white" : "bg-[#0f0f1a] border-[#2a2a4a] text-[#a0a0c0]"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {visibility === "password" && (
                  <input
                    type="password"
                    placeholder="Enter password..."
                    className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-sm text-white mt-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a0a0c0] uppercase tracking-wider">Publish Date</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0c0] pointer-events-none" />
                    <input
                      type="date"
                      className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0c0] pointer-events-none" />
                    <input
                      type="time"
                      className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Star size={16} className={featuredPost ? "text-yellow-500 fill-yellow-500" : "text-[#a0a0c0]"} />
                  <span className="text-sm font-medium">Featured Post</span>
                </div>
                <button
                  onClick={() => setFeaturedPost(!featuredPost)}
                  className={`w-10 h-5 rounded-full transition-all relative ${featuredPost ? "bg-[#0EB4A6]" : "bg-[#2a2a4a]"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${featuredPost ? "right-1" : "left-1"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Table of Contents ── */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-[#2a2a4a] flex items-center justify-between bg-[#2a2a4a]/20">
              <div className="flex items-center gap-2">
                <LayoutTemplate size={15} className="text-[#0EB4A6]" />
                <span className="text-sm font-bold">Table of Contents</span>
                {toc.length > 0 && (
                  <span className="text-[10px] font-bold bg-[#0EB4A6]/15 text-[#0EB4A6] border border-[#0EB4A6]/25 px-1.5 py-0.5 rounded-md">
                    {toc.length}
                  </span>
                )}
              </div>
              <button
                onClick={syncToc}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0EB4A6]/10 text-[#0EB4A6] border border-[#0EB4A6]/20 text-[10px] font-bold hover:bg-[#0EB4A6] hover:text-black hover:border-[#0EB4A6] transition-all"
              >
                <Undo size={10} className="rotate-90" />
                Sync
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Empty State */}
              {toc.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-[#2a2a4a] bg-[#0f0f1a]/40">
                  <LayoutTemplate size={28} className="text-[#2a2a4a] mb-2.5" />
                  <p className="text-xs font-semibold text-white/30 mb-1">No headings found</p>
                  <p className="text-[10px] text-[#a0a0c0]/60 mb-4 text-center px-6">
                    Click Sync to pull headings from your content
                  </p>
                  <button
                    onClick={() => setToc([{ level: 2, text: '', id: `heading-${Date.now()}` }])}
                    className="flex items-center gap-1.5 text-[11px] text-[#0EB4A6] font-bold hover:text-white transition-colors"
                  >
                    <Plus size={12} /> Add manually
                  </button>
                </div>
              ) : (
                /* TOC Items */
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-0.5 custom-scrollbar">
                  {toc.map((item, index) => {
                    const lc = levelColors[item.level] || levelColors[3];
                    const indent = (item.level - 1) * 12;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 group"
                        style={{ paddingLeft: `${indent}px` }}
                      >
                        {/* H-level selector */}
                        <div className="relative shrink-0">
                          <select
                            value={item.level}
                            onChange={(e) => {
                              const newToc = [...toc];
                              newToc[index].level = parseInt(e.target.value);
                              setToc(newToc);
                            }}
                            className={`appearance-none w-10 h-7 rounded-md border text-[11px] font-black text-center outline-none cursor-pointer focus:ring-0 transition-colors ${lc.bg} ${lc.border} ${lc.text}`}
                          >
                            <option value={1} className="bg-[#1a1a2e] text-[#0EB4A6]">H1</option>
                            <option value={2} className="bg-[#1a1a2e] text-purple-400">H2</option>
                            <option value={3} className="bg-[#1a1a2e] text-blue-400">H3</option>
                          </select>
                        </div>

                        {/* Label input */}
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const newToc = [...toc];
                            newToc[index].text = e.target.value;
                            setToc(newToc);
                          }}
                          placeholder="Section label..."
                          className="flex-1 min-w-0 bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-white/15 focus:outline-none focus:border-[#0EB4A6]/40 transition-colors"
                        />

                        {/* Delete */}
                        <button
                          onClick={() => setToc(toc.filter((_, i) => i !== index))}
                          className="shrink-0 p-1.5 rounded-lg text-white/10 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add item button */}
              <button
                onClick={() => setToc([...toc, { level: 2, text: '', id: `heading-${Date.now()}` }])}
                className="w-full py-2 rounded-xl border border-dashed border-[#2a2a4a] hover:border-[#0EB4A6]/40 hover:bg-[#0EB4A6]/5 text-[#a0a0c0] hover:text-[#0EB4A6] text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Plus size={13} /> Add Item
              </button>
            </div>
          </div>
          {/* ── End Table of Contents ── */}

          {/* Featured Image */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#2a2a4a]/30 px-6 py-4 border-b border-[#2a2a4a] flex items-center gap-2 font-bold">
              <ImageIcon size={18} className="text-[#0EB4A6]" /> Featured Image
            </div>
            <div className="p-6">
              <div className="relative group aspect-video rounded-xl overflow-hidden border-2 border-dashed border-[#2a2a4a] bg-[#0f0f1a] flex flex-col items-center justify-center cursor-pointer hover:border-[#0EB4A6]/50 transition-all">
                {coverImage || coverImageUrl ? (
                  <>
                    <img src={coverImageUrl || coverImage} className="w-full h-full object-cover" alt="Cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => { setCoverImage(null); setCoverImageUrl(""); }} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"><Trash2 size={20} /></button>
                      <button onClick={() => setImageUrlInput(true)} className="p-3 bg-[#0EB4A6] text-white rounded-full hover:scale-110 transition-transform"><LinkIcon size={20} /></button>
                    </div>
                  </>
                ) : isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-[#0EB4A6] animate-spin" />
                    <span className="text-xs font-bold text-[#a0a0c0]">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={32} className="text-[#2a2a4a] mb-2" />
                    <span className="text-xs font-bold text-[#a0a0c0]">Drop image or click to upload</span>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCoverUpload} />
                  </>
                )}
              </div>

              {imageUrlInput && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL..."
                    className="flex-1 bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-xs text-white"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                  />
                  <button onClick={() => setImageUrlInput(false)} className="bg-[#0EB4A6] text-white p-2 rounded-lg"><Check size={14} /></button>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <label className="text-[10px] font-bold text-[#a0a0c0] uppercase tracking-wider">Alt Text (SEO)</label>
                <input
                  type="text"
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-xs text-white"
                  placeholder="Describe image..."
                  value={coverAlt}
                  onChange={(e) => setCoverAlt(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Author Settings */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#2a2a4a]/30 px-6 py-4 border-b border-[#2a2a4a] flex items-center gap-2 font-bold">
              <User size={18} className="text-[#0EB4A6]" /> Author Info
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#a0a0c0] uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-sm text-white"
                  placeholder="Author Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#2a2a4a]/30 px-6 py-4 border-b border-[#2a2a4a] flex items-center gap-2 font-bold">
              <Settings size={18} className="text-[#0EB4A6]" /> SEO & Tags
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-[#a0a0c0] uppercase tracking-wider">Meta Description</label>
                  <span className={`text-[10px] font-bold ${getMetaColor()}`}>{metaDesc.length} / 155</span>
                </div>
                <textarea
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-sm text-white min-h-[100px] focus:border-[#0EB4A6] transition-colors"
                  placeholder="Brief summary for search engines..."
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#a0a0c0] uppercase tracking-wider">Category</label>
                <select
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="career-guidance">Career Guidance</option>
                  <option value="college-reviews">College Reviews</option>
                  <option value="exam-tips">Exam Tips</option>
                  <option value="student-stories">Student Stories</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#a0a0c0] uppercase tracking-wider">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-[#0EB4A6]/10 text-[#0EB4A6] border border-[#0EB4A6]/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2 text-sm text-white"
                  placeholder="Press enter to add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Insert Link</h2>
              <input
                type="text"
                className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-xl px-4 py-3 text-sm text-white mb-4 focus:border-[#0EB4A6] outline-none"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                autoFocus
              />
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setLinkNewTab(!linkNewTab)}
                  className={`w-10 h-5 rounded-full transition-all relative ${linkNewTab ? "bg-[#0EB4A6]" : "bg-[#2a2a4a]"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${linkNewTab ? "right-1" : "left-1"}`} />
                </button>
                <span className="text-sm text-[#a0a0c0]">Open in new tab</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLinkModal(false)} className="flex-1 py-3 rounded-xl border border-[#2a2a4a] hover:bg-[#2a2a4a] transition-colors font-bold">Cancel</button>
                <button onClick={insertLink} className="flex-1 py-3 rounded-xl bg-[#0EB4A6] text-black font-bold hover:bg-[#0c9c90] transition-all">Apply Link</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-[#09090b] z-50 flex flex-col animate-in fade-in duration-300">
          <div className="bg-[#1a1a2e] border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
              <span className="text-[#a0a0c0] font-bold text-sm tracking-widest uppercase">Live Preview</span>
              <div className="h-4 w-px bg-[#2a2a4a]"></div>
              <span className="text-white font-bold">{title || "Untitled Post"}</span>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 bg-[#ff4757]/10 text-[#ff4757] rounded-full hover:bg-[#ff4757] hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#09090b] p-6 md:p-20 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#0EB4A6] text-black text-[10px] font-bold px-3 py-1.5 rounded tracking-widest uppercase">{selectedCategory || "General"}</span>
                <span className="text-white/40 text-xs flex items-center gap-2"><Clock size={14} /> {readTime} min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-10 text-white tracking-tight">{title || "Your Amazing Title Here"}</h1>

              <div className="flex items-center gap-4 mb-12 py-8 border-y border-white/5">
                <div className="w-12 h-12 rounded-full bg-[#0EB4A6] flex items-center justify-center text-black font-bold text-xl">{authorName.charAt(0) || "G"}</div>
                <div>
                  <p className="font-bold text-white">{authorName || "Guidevera Author"}</p>
                  <p className="text-xs text-white/40">Verified Publisher</p>
                </div>
              </div>

              {toc.length > 0 && (
                <div className="mb-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <LayoutTemplate size={20} className="text-[#0EB4A6]" /> Table of Contents
                  </h3>
                  <ul className="space-y-3">
                    {toc.map((item, i) => (
                      <li key={i} style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}>
                        <span className="text-[#0EB4A6]/60 mr-2 text-xs font-bold">H{item.level}</span>
                        <span className="text-white/70 hover:text-[#0EB4A6] transition-colors cursor-pointer text-sm">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {coverImage && (
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                  <img src={coverImage} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-invert prose-lg max-w-none text-gray-200" dangerouslySetInnerHTML={{ __html: editor.getHTML() }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-[#0EB4A6] mb-4">
                <Share2 size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{isEditMode ? 'Update Post?' : 'Ready to Publish?'}</h2>
              <p className="text-[#a0a0c0] text-sm mb-6">Review your post details before making it live.</p>

              <div className="bg-[#0f0f1a] rounded-xl p-4 mb-6 border border-[#2a2a4a]">
                {coverImage && <img src={coverImage} className="w-full h-32 object-cover rounded-lg mb-4" />}
                <h4 className="font-bold text-white mb-2 line-clamp-2">{title || "Untitled Blog Post"}</h4>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-[#a0a0c0]">Author:</div><div className="text-white text-right truncate">{authorName || "Not set"}</div>
                  <div className="text-[#a0a0c0]">Date:</div><div className="text-white text-right">{publishDate || "Immediate"}</div>
                  <div className="text-[#a0a0c0]">Word Count:</div><div className="text-white text-right">{wordCount} words</div>
                  <div className="text-[#a0a0c0]">Visibility:</div><div className="text-white text-right capitalize">{visibility}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowPublishModal(false)} className="flex-1 px-4 py-3 rounded-lg border border-[#2a2a4a] hover:bg-[#2a2a4a] text-white font-medium transition-colors">
                  Go Back
                </button>
                <button
                  onClick={async () => {
                    const result = await saveBlog('published');
                    if (result.success) {
                      setShowPublishModal(false);
                      alert(isEditMode ? 'Post Updated Successfully!' : 'Post Published Successfully!');
                      router.push('/admin/blog');
                    } else {
                      alert('Publish failed: ' + result.message);
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#0EB4A6] to-[#0b8f84] hover:from-[#0b8f84] hover:to-[#097b71] text-white font-bold shadow-[0_0_20px_rgba(14,180,166,0.3)] flex items-center justify-center gap-2 transition-all"
                >
                  {isEditMode ? 'Update Post' : 'Publish Now'} <Check size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        button { cursor: pointer; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3a3a5a; }
        .prose-invert h1, .prose-invert h2, .prose-invert h3, .prose-invert h4 {
          color: white !important; margin-top: 2em !important; margin-bottom: 1em !important;
        }
        .prose-invert p { color: rgba(255,255,255,0.7) !important; line-height: 1.8 !important; margin-bottom: 1.5em !important; }
        .prose-invert img { border-radius: 1.5rem !important; margin: 2em 0 !important; }
        .prose-invert blockquote {
          border-left-color: #0EB4A6 !important; background: rgba(14,180,166,0.05) !important;
          padding: 1.5em !important; border-radius: 0 1rem 1rem 0 !important; font-style: italic !important;
        }
        .prose-invert a { color: #0EB4A6 !important; text-underline-offset: 4px !important; }
        select option { background: #1a1a2e; }
      `}} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0EB4A6] animate-spin" />
      </div>
    }>
      <BlogAdminPanel />
    </Suspense>
  );
}