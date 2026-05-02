const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },        // raw HTML from TipTap editor.getHTML()
  metaDescription: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  coverAlt: { type: String, default: '' },
  authorName: { type: String, default: 'Guidevera Team' },
  authorRole: { type: String, default: '' },
  authorBio: { type: String, default: '' },
  category: { type: String, default: '' },
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  visibility: { type: String, enum: ['public', 'private', 'password'], default: 'public' },
  password: { type: String, default: '' },
  featuredPost: { type: Boolean, default: false },
  readingTime: { type: Number, default: 1 },
  publishDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
