const Blog = require('../models/Blog');

// @route   POST /api/blog
// @desc    Create or Update a blog (upsert by slug)
// @access  Admin (Protected)
exports.createOrUpdateBlog = async (req, res) => {
  try {
    const { slug } = req.body;
    const blogData = {
      ...req.body,
      updatedAt: Date.now(),
    };

    const blog = await Blog.findOneAndUpdate(
      { slug },
      blogData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, blog });
  } catch (err) {
    console.error('Create/Update blog error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while saving blog.' });
  }
};

// @route   GET /api/blog
// @desc    Get all published public blogs (lightweight)
// @access  Public
exports.getAllPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published', visibility: 'public' })
      .select('title slug metaDescription coverImage coverAlt authorName authorRole category tags featuredPost readingTime publishDate')
      .sort({ publishDate: -1 });

    res.json({ success: true, blogs });
  } catch (err) {
    console.error('Get published blogs error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching blogs.' });
  }
};

// @route   GET /api/blog/:slug
// @desc    Get single blog by slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    res.json({ success: true, blog });
  } catch (err) {
    console.error('Get blog by slug error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching post.' });
  }
};

// @route   GET /api/blog/admin/all
// @desc    Get all blogs for admin dashboard
// @access  Admin (Protected)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    // Only allow admins (handled by middleware but double check if needed)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) {
    console.error('Get admin blogs error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching admin list.' });
  }
};

// @route   DELETE /api/blog/:slug
// @desc    Delete a blog by slug
// @access  Admin (Protected)
exports.deleteBlog = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found.' });
    }

    res.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Delete blog error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while deleting blog.' });
  }
};
// @route   GET /api/blog/admin/:slug
// @desc    Returns full blog doc regardless of status — for editing drafts
// @access  Admin (Protected)
exports.getBlogBySlugAdmin = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   PATCH /api/blog/admin/:slug/status
// @desc    Quickly toggle a post between draft and published without full re-save
// @access  Admin (Protected)
exports.updateBlogStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['draft', 'published'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   POST /api/blog/admin/upload
// @desc    Upload an image to Cloudinary
// @access  Admin (Protected)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    res.json({ 
      success: true, 
      imageUrl: req.file.path, // Cloudinary URL
      publicId: req.file.filename 
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Upload failed.' });
  }
};

// @route   GET /api/blog/admin/stats
// @desc    Get blog statistics
// @access  Admin (Protected)
exports.getBlogStats = async (req, res) => {
  try {
    const total = await Blog.countDocuments();
    const published = await Blog.countDocuments({ status: 'published' });
    const drafts = await Blog.countDocuments({ status: 'draft' });
    const featured = await Blog.countDocuments({ featuredPost: true });

    res.json({
      success: true,
      stats: { total, published, drafts, featured }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
};
