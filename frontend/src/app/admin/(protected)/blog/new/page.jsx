"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
  Save, Eye, Calendar, Clock, Lock, Settings, Type, LayoutTemplate, Share2
} from "lucide-react";

export default function BlogAdminPanel() {
  const [title, setTitle] = useState("");
  const [saveState, setSaveState] = useState("saved"); // saved, saving, unsaved
  
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
  const [readingTimeMode, setReadingTimeMode] = useState("auto"); // auto, manual
  const [manualReadingTime, setManualReadingTime] = useState("");
  const [visibility, setVisibility] = useState("public"); // public, private, password
  const [password, setPassword] = useState("");

  // Modals
  const [showPreview, setShowPreview] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(true);

  // Derive Slug from Title
  useEffect(() => {
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title]);

  // Auto-save simulation
  useEffect(() => {
    if (saveState === "unsaved") {
      const timer = setTimeout(() => {
        setSaveState("saving");
        setTimeout(() => setSaveState("saved"), 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [saveState, title, metaDesc, tags]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, // configure custom heading below
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
      // Generate TOC
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
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] text-gray-200',
      },
    },
  });

  const getMetaColor = () => {
    const len = metaDesc.length;
    if (len === 0) return "text-gray-400";
    if (len <= 120) return "text-[#2ed573]";
    if (len <= 155) return "text-[#ffa502]";
    return "text-[#ff4757]";
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
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
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  if (!editor) {
    return null;
  }

  const wordCount = editor.storage.characterCount.words();
  const charCount = editor.storage.characterCount.characters();
  const readTime = Math.ceil(wordCount / 200) || 1;

  const currentHeadingLevel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1';
    if (editor.isActive('heading', { level: 2 })) return 'H2';
    if (editor.isActive('heading', { level: 3 })) return 'H3';
    if (editor.isActive('heading', { level: 4 })) return 'H4';
    if (editor.isActive('heading', { level: 5 })) return 'H5';
    if (editor.isActive('heading', { level: 6 })) return 'H6';
    return 'Paragraph';
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Toolbar */}
      <div className="sticky top-0 z-40 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EB4A6] to-[#0b8f84] flex items-center justify-center shadow-[0_0_15px_rgba(14,180,166,0.3)]">
            <PenTool size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Blog Admin</h1>
            <div className="flex items-center gap-2 text-xs text-[#a0a0c0]">
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
            className="px-4 py-2 rounded-lg border border-[#2a2a4a] hover:bg-[#2a2a4a] text-sm font-medium transition-colors"
            onClick={() => setSaveState("saved")}
          >
            Save Draft
          </button>
          <button 
            className="px-4 py-2 rounded-lg border border-[#2a2a4a] hover:bg-[#2a2a4a] text-sm font-medium transition-colors flex items-center gap-2"
            onClick={() => setShowPreview(true)}
          >
            <Eye size={16} /> Preview
          </button>
          <button 
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#0EB4A6] to-[#0b8f84] hover:from-[#0b8f84] hover:to-[#097b71] text-white text-sm font-bold shadow-[0_0_20px_rgba(14,180,166,0.3)] hover:shadow-[0_0_25px_rgba(14,180,166,0.5)] transition-all flex items-center gap-2"
            onClick={() => setShowPublishModal(true)}
          >
            <Check size={16} strokeWidth={3} /> Publish
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 flex gap-8">
        {/* LEFT COLUMN - Editor */}
        <div className="w-[65%] space-y-6">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your blog title here..."
              className="w-full bg-transparent text-[2.5rem] font-bold leading-tight placeholder-gray-600 focus:outline-none border-b border-transparent focus:border-[#2a2a4a] pb-2 transition-colors"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSaveState("unsaved");
              }}
              maxLength={100}
            />
            <div className="absolute right-0 bottom-[-24px] text-xs text-[#a0a0c0]">
              {title.length} / 100 characters
            </div>
          </div>

          {/* TipTap Editor Toolbar */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-2 sticky top-[80px] z-30 shadow-lg flex flex-wrap gap-1 items-center">
            {/* GROUP 1: Text Style */}
            <div className="flex items-center gap-1 pr-3 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('bold') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`} title="Bold (Cmd+B)"><Bold size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('italic') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`} title="Italic (Cmd+I)"><Italic size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('underline') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`} title="Underline (Cmd+U)"><UnderlineIcon size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('strike') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`} title="Strikethrough (Cmd+Shift+X)"><Strikethrough size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('code') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`} title="Code"><Code size={16} /></button>
            </div>

            {/* GROUP 2: Headings */}
            <div className="flex items-center px-3 border-r border-[#2a2a4a]">
              <select 
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-gray-300 hover:text-white"
                value={currentHeadingLevel()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'Paragraph') {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().toggleHeading({ level: parseInt(val.replace('H', '')) }).run();
                  }
                }}
              >
                <option value="Paragraph" className="bg-[#1a1a2e]">Paragraph</option>
                <option value="H1" className="bg-[#1a1a2e]">Heading 1</option>
                <option value="H2" className="bg-[#1a1a2e]">Heading 2</option>
                <option value="H3" className="bg-[#1a1a2e]">Heading 3</option>
                <option value="H4" className="bg-[#1a1a2e]">Heading 4</option>
                <option value="H5" className="bg-[#1a1a2e]">Heading 5</option>
                <option value="H6" className="bg-[#1a1a2e]">Heading 6</option>
              </select>
            </div>

            {/* GROUP 3: Alignment */}
            <div className="flex items-center gap-1 px-3 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><AlignLeft size={16} /></button>
              <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><AlignCenter size={16} /></button>
              <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><AlignRight size={16} /></button>
              <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><AlignJustify size={16} /></button>
            </div>

            {/* GROUP 4: Lists */}
            <div className="flex items-center gap-1 px-3 border-r border-[#2a2a4a]">
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('bulletList') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><List size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('orderedList') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><ListOrdered size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('blockquote') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><Quote size={16} /></button>
            </div>

            {/* GROUP 5: Insert */}
            <div className="flex items-center gap-1 px-3 border-r border-[#2a2a4a] relative">
              <button onClick={() => setShowLinkModal(!showLinkModal)} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('link') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><LinkIcon size={16} /></button>
              {showLinkModal && (
                <div className="absolute top-full left-0 mt-2 bg-[#1a1a2e] border border-[#2a2a4a] p-3 rounded-lg shadow-xl w-64 z-50">
                  <input type="url" placeholder="https://..." value={linkUrl} onChange={(e)=>setLinkUrl(e.target.value)} className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded px-3 py-2 text-sm text-white focus:outline-none mb-2" />
                  <label className="flex items-center gap-2 text-xs text-gray-400 mb-3 cursor-pointer">
                    <input type="checkbox" checked={linkNewTab} onChange={(e)=>setLinkNewTab(e.target.checked)} className="accent-[#0EB4A6]" />
                    Open in new tab
                  </label>
                  <div className="flex gap-2">
                    <button onClick={insertLink} className="flex-1 bg-[#0EB4A6] text-white text-xs py-1.5 rounded font-medium">Add</button>
                    <button onClick={()=>setShowLinkModal(false)} className="flex-1 bg-[#2a2a4a] text-white text-xs py-1.5 rounded font-medium">Cancel</button>
                  </div>
                </div>
              )}
              <button onClick={insertImage} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><ImageIcon size={16} /></button>
              <button onClick={insertTable} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><TableIcon size={16} /></button>
              <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><Minus size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-[#2a2a4a] transition-colors ${editor.isActive('codeBlock') ? 'bg-[#2a2a4a] text-[#0EB4A6]' : 'text-gray-400'}`}><CodeSquare size={16} /></button>
            </div>

            {/* GROUP 6: Format Colors */}
            <div className="flex items-center gap-1 px-3 border-r border-[#2a2a4a]">
              <div className="relative group">
                <button className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><Type size={16} /></button>
                <input type="color" onInput={(e) => editor.chain().focus().setColor(e.target.value).run()} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </div>
              <div className="relative group">
                <button className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><Highlighter size={16} /></button>
                <input type="color" onInput={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </div>
              <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400"><Eraser size={16} /></button>
            </div>

            {/* GROUP 7: History */}
            <div className="flex items-center gap-1 pl-3">
              <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400 disabled:opacity-50"><Undo size={16} /></button>
              <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-[#2a2a4a] transition-colors text-gray-400 disabled:opacity-50"><Redo size={16} /></button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-6 min-h-[600px] shadow-sm relative">
            {editor.isActive('table') && (
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-[#2a2a4a] rounded-lg p-1 flex gap-1 shadow-xl z-10 border border-[#3a3a5a]">
                <button onClick={() => editor.chain().focus().addColumnBefore().run()} className="p-1.5 text-xs bg-[#1a1a2e] rounded hover:bg-[#3a3a5a]">Add Col Before</button>
                <button onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-1.5 text-xs bg-[#1a1a2e] rounded hover:bg-[#3a3a5a]">Add Col After</button>
                <button onClick={() => editor.chain().focus().deleteColumn().run()} className="p-1.5 text-xs bg-[#ff4757]/20 text-[#ff4757] rounded hover:bg-[#ff4757]/30">Del Col</button>
                <div className="w-px bg-gray-600 mx-1"></div>
                <button onClick={() => editor.chain().focus().addRowBefore().run()} className="p-1.5 text-xs bg-[#1a1a2e] rounded hover:bg-[#3a3a5a]">Add Row Before</button>
                <button onClick={() => editor.chain().focus().addRowAfter().run()} className="p-1.5 text-xs bg-[#1a1a2e] rounded hover:bg-[#3a3a5a]">Add Row After</button>
                <button onClick={() => editor.chain().focus().deleteRow().run()} className="p-1.5 text-xs bg-[#ff4757]/20 text-[#ff4757] rounded hover:bg-[#ff4757]/30">Del Row</button>
                <div className="w-px bg-gray-600 mx-1"></div>
                <button onClick={() => editor.chain().focus().deleteTable().run()} className="p-1.5 text-xs bg-[#ff4757] text-white rounded hover:bg-red-600">Delete Table</button>
              </div>
            )}
            
            <EditorContent editor={editor} />
            
            <div className="mt-8 border-t border-[#2a2a4a] pt-4 flex justify-between text-[#a0a0c0] text-sm">
              <div>
                <span className="font-medium text-white">{wordCount}</span> words · <span className="font-medium text-white">{charCount}</span> characters · ~<span className="font-medium text-white">{readTime}</span> min read
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Sidebar */}
        <div className="w-[35%] space-y-6 pb-20">
          
          {/* TOC Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a4a]">
              <h3 className="font-semibold text-lg flex items-center gap-2"><LayoutTemplate size={18} className="text-[#0EB4A6]" /> Table of Contents</h3>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={includeToc} onChange={() => setIncludeToc(!includeToc)} />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${includeToc ? 'bg-[#0EB4A6]' : 'bg-[#2a2a4a]'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeToc ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </label>
            </div>
            {toc.length === 0 ? (
              <p className="text-sm text-[#a0a0c0] text-center py-4 italic">Add headings (H1, H2, H3) to auto-generate TOC</p>
            ) : (
              <ul className="space-y-2 text-sm max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {toc.map((item, idx) => (
                  <li key={idx} className={`text-gray-300 hover:text-[#0EB4A6] cursor-pointer truncate ${item.level === 2 ? 'ml-4' : item.level === 3 ? 'ml-8' : ''}`}>
                    <span className="text-[#2a2a4a] mr-2 text-xs font-mono">H{item.level}</span> {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Author Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Type size={18} className="text-[#0EB4A6]" /> Author Info</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Name</label>
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a4a] flex items-center justify-center font-bold text-lg text-[#0EB4A6] shrink-0">
                    {authorName ? authorName.substring(0, 2).toUpperCase() : "?"}
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. Digamber Singh Rana" 
                    value={authorName} onChange={(e) => setAuthorName(e.target.value)}
                    className="flex-1 bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Role / Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Career Counselor" 
                  value={authorRole} onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Author Bio</label>
                <textarea 
                  rows={2}
                  placeholder="Short bio about the author..." 
                  value={authorBio} onChange={(e) => setAuthorBio(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Date & Schedule Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Calendar size={18} className="text-[#0EB4A6]" /> Publish Date</h3>
            <div className="flex items-center justify-between mb-4 bg-[#0f0f1a] p-3 rounded-lg border border-[#2a2a4a]">
              <span className="text-sm font-medium">Schedule Post</span>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={schedulePost} onChange={() => setSchedulePost(!schedulePost)} />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${schedulePost ? 'bg-[#0EB4A6]' : 'bg-[#2a2a4a]'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${schedulePost ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Date</label>
                <input 
                  type="date" 
                  value={publishDate} onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none text-sm text-gray-300 color-scheme-dark"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Time</label>
                <input 
                  type="time" 
                  value={publishTime} onChange={(e) => setPublishTime(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none text-sm text-gray-300 color-scheme-dark"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {const d=new Date(); setPublishDate(d.toISOString().split('T')[0])}} className="flex-1 bg-[#2a2a4a] hover:bg-[#3a3a5a] text-xs py-1.5 rounded transition-colors">Today</button>
              <button onClick={() => {const d=new Date(); d.setDate(d.getDate()+1); setPublishDate(d.toISOString().split('T')[0])}} className="flex-1 bg-[#2a2a4a] hover:bg-[#3a3a5a] text-xs py-1.5 rounded transition-colors">Tomorrow</button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-[#0EB4A6]" /> Cover Image</h3>
            
            {!coverImage && !imageUrlInput ? (
              <div className="border-2 border-dashed border-[#2a2a4a] hover:border-[#0EB4A6] rounded-xl p-8 text-center transition-colors group cursor-pointer relative">
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <ImageIcon size={32} className="mx-auto text-[#a0a0c0] group-hover:text-[#0EB4A6] mb-3 transition-colors" />
                <p className="text-sm font-medium text-white mb-1">Click or drag to upload</p>
                <p className="text-xs text-[#a0a0c0]">Recommended: 1200 x 630px</p>
              </div>
            ) : coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-[#2a2a4a] group">
                <img src={coverImage} alt="Cover preview" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="bg-[#0EB4A6] text-white px-3 py-1.5 rounded text-sm font-medium cursor-pointer hover:bg-[#0b8f84]">
                    Change
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                  <button onClick={() => setCoverImage(null)} className="bg-[#ff4757] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600">Remove</button>
                </div>
              </div>
            ) : null}

            {imageUrlInput && !coverImage && (
              <div className="mt-3">
                <input type="url" placeholder="https://..." value={coverImageUrl} onChange={(e) => {setCoverImageUrl(e.target.value); setCoverImage(e.target.value)}} className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm focus:border-[#0EB4A6] focus:outline-none mb-2" />
              </div>
            )}
            
            <div className="mt-3 flex justify-between items-center">
              <button onClick={() => setImageUrlInput(!imageUrlInput)} className="text-[#0EB4A6] hover:text-[#0b8f84] text-xs font-medium transition-colors">
                {imageUrlInput ? "Upload image instead" : "Enter image URL"}
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Alt Text (SEO)</label>
              <input 
                type="text" 
                placeholder="Describe the image..." 
                value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)}
                className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          {/* SEO Settings Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Share2 size={18} className="text-[#0EB4A6]" /> SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-xs font-medium text-[#a0a0c0] mb-1">
                  <span>Meta Description</span>
                  <span className={getMetaColor()}>{metaDesc.length} / 155</span>
                </label>
                <textarea 
                  rows={3}
                  placeholder="Write a compelling meta description for search engines..." 
                  value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm resize-none"
                />
                <div className="h-1 w-full bg-[#2a2a4a] mt-1 rounded-full overflow-hidden">
                  <div className="h-full bg-current transition-all" style={{ width: `${Math.min((metaDesc.length/155)*100, 100)}%`, color: getMetaColor().replace('text-', '') }}></div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Slug / URL</label>
                <div className="flex bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg overflow-hidden focus-within:border-[#0EB4A6] transition-colors">
                  <span className="px-3 py-2 text-sm text-[#a0a0c0] bg-[#1a1a2e] border-r border-[#2a2a4a]">guidevera.com/blog/</span>
                  <input 
                    type="text" 
                    value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 bg-transparent px-3 py-2 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Focus Keyword</label>
                <input 
                  type="text" 
                  value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#2a2a4a]">
                <p className="text-xs font-medium text-[#a0a0c0] mb-2">Google Search Preview</p>
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <div className="text-xs text-[#202124] mb-1 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden"><img src="/guidevera-header.png" className="w-full h-full object-cover" /></div>
                    <span>Guidevera</span>
                    <span className="text-gray-500 mx-1">›</span>
                    <span className="text-gray-500 truncate max-w-[150px]">blog › {slug || 'your-slug'}</span>
                  </div>
                  <h4 className="text-[20px] text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer truncate">{title || 'Your Blog Title Here'}</h4>
                  <p className="text-[14px] text-[#4d5156] mt-1 line-clamp-2 leading-[1.58]">{metaDesc || 'Your meta description will appear here. Make it compelling to encourage users to click on your search result.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories & Tags */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Settings size={18} className="text-[#0EB4A6]" /> Categories & Tags</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Category</label>
                <select 
                  value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="career">Career Guidance</option>
                  <option value="college">College Reviews</option>
                  <option value="exam">Entrance Exams</option>
                  <option value="student-life">Student Life</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a0a0c0] mb-1">Tags</label>
                <div className="bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg p-2 focus-within:border-[#0EB4A6] transition-colors min-h-[80px]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="bg-[#2a2a4a] text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        {tag} <button onClick={() => removeTag(tag)} className="hover:text-[#ff4757]"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Type tag and press Enter..." 
                    value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag}
                    className="w-full bg-transparent focus:outline-none text-sm px-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blog Settings Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Settings size={18} className="text-[#0EB4A6]" /> Blog Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#a0a0c0]">Allow Comments</span>
                <label className="flex items-center cursor-pointer"><div className="relative"><input type="checkbox" className="sr-only" checked={allowComments} onChange={() => setAllowComments(!allowComments)} /><div className={`block w-10 h-6 rounded-full transition-colors ${allowComments ? 'bg-[#0EB4A6]' : 'bg-[#2a2a4a]'}`}></div><div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${allowComments ? 'transform translate-x-4' : ''}`}></div></div></label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#a0a0c0]">Featured Post</span>
                <label className="flex items-center cursor-pointer"><div className="relative"><input type="checkbox" className="sr-only" checked={featuredPost} onChange={() => setFeaturedPost(!featuredPost)} /><div className={`block w-10 h-6 rounded-full transition-colors ${featuredPost ? 'bg-[#0EB4A6]' : 'bg-[#2a2a4a]'}`}></div><div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${featuredPost ? 'transform translate-x-4' : ''}`}></div></div></label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#a0a0c0]">Show Author Info</span>
                <label className="flex items-center cursor-pointer"><div className="relative"><input type="checkbox" className="sr-only" checked={showAuthorInfo} onChange={() => setShowAuthorInfo(!showAuthorInfo)} /><div className={`block w-10 h-6 rounded-full transition-colors ${showAuthorInfo ? 'bg-[#0EB4A6]' : 'bg-[#2a2a4a]'}`}></div><div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showAuthorInfo ? 'transform translate-x-4' : ''}`}></div></div></label>
              </div>

              <div className="pt-3 border-t border-[#2a2a4a]">
                <label className="block text-xs font-medium text-[#a0a0c0] mb-2">Reading Time</label>
                <div className="flex bg-[#0f0f1a] rounded-lg p-1 border border-[#2a2a4a] mb-2">
                  <button onClick={() => setReadingTimeMode('auto')} className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${readingTimeMode==='auto' ? 'bg-[#2a2a4a] text-white' : 'text-[#a0a0c0] hover:text-white'}`}>Auto Calculate</button>
                  <button onClick={() => setReadingTimeMode('manual')} className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${readingTimeMode==='manual' ? 'bg-[#2a2a4a] text-white' : 'text-[#a0a0c0] hover:text-white'}`}>Manual</button>
                </div>
                {readingTimeMode === 'manual' && (
                  <input type="number" placeholder="X min" value={manualReadingTime} onChange={(e) => setManualReadingTime(e.target.value)} className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none text-sm" />
                )}
              </div>

              <div className="pt-3 border-t border-[#2a2a4a]">
                <label className="block text-xs font-medium text-[#a0a0c0] mb-2">Visibility</label>
                <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 focus:border-[#0EB4A6] focus:outline-none transition-colors text-sm mb-2">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="password">Password Protected</option>
                </select>
                {visibility === 'password' && (
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0c0]" />
                    <input type="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg pl-9 pr-3 py-2 focus:border-[#0EB4A6] focus:outline-none text-sm" />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Preview Drawer */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-sm">
          <div className="w-[800px] max-w-full bg-white h-full overflow-y-auto animate-slide-in-right relative">
            <button onClick={() => setShowPreview(false)} className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors z-10">
              <X size={20} />
            </button>
            <div className="max-w-3xl mx-auto px-8 py-16">
              {coverImage && (
                <img src={coverImage} alt={coverAlt || "Cover"} className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-md" />
              )}
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight font-sans">
                {title || "Blog Title Will Appear Here"}
              </h1>
              
              {showAuthorInfo && (
                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xl overflow-hidden">
                    {authorName ? authorName.substring(0, 2).toUpperCase() : "?"}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{authorName || "Author Name"}</div>
                    <div className="text-gray-500 text-sm flex items-center gap-2">
                      {publishDate ? new Date(publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Date"} · {readingTimeMode === 'auto' ? readTime : (manualReadingTime || readTime)} min read
                    </div>
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: editor.getHTML() }}></div>
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
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Publish?</h2>
              <p className="text-[#a0a0c0] text-sm mb-6">Review your post details before making it live to the world.</p>
              
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
                <button onClick={() => { setShowPublishModal(false); alert("Post Published Successfully!"); }} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#0EB4A6] to-[#0b8f84] hover:from-[#0b8f84] hover:to-[#097b71] text-white font-bold shadow-[0_0_20px_rgba(14,180,166,0.3)] flex items-center justify-center gap-2 transition-all">
                  Publish Now <Check size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles for Animations & Prose Overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a4a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0EB4A6;
        }
        
        /* TipTap overrides for dark theme */
        .ProseMirror table {
          border-collapse: collapse;
          margin: 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
          border: 1px solid #3a3a5a;
          border-radius: 8px;
        }
        .ProseMirror table td, .ProseMirror table th {
          border: 1px solid #3a3a5a;
          box-sizing: border-box;
          min-width: 1em;
          padding: 8px 12px;
          position: relative;
          vertical-align: top;
        }
        .ProseMirror table th {
          background-color: #2a2a4a;
          font-weight: bold;
          text-align: left;
        }
        .ProseMirror table tr:nth-child(even) {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .ProseMirror table .selectedCell:after {
          background: rgba(14, 180, 166, 0.2);
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #4a4a6a;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid #3a3a5a;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #0EB4A6;
        }
        .ProseMirror a {
          color: #0EB4A6;
          text-decoration: underline;
        }
        .ProseMirror mark {
          background-color: #0EB4A6;
          color: white;
          padding: 0 2px;
          border-radius: 2px;
        }
        .ProseMirror pre {
          background: #0f0f1a;
          color: #e0e0e0;
          font-family: 'JetBrains Mono', monospace;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #2a2a4a;
          overflow-x: auto;
        }
        .ProseMirror code {
          background: #2a2a4a;
          color: #0EB4A6;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: 'JetBrains Mono', monospace;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #0EB4A6;
          padding-left: 1rem;
          color: #a0a0c0;
          font-style: italic;
        }
        .ProseMirror hr {
          border-color: #2a2a4a;
          margin: 2rem 0;
        }
      `}} />
    </div>
  );
}
