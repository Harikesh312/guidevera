const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  createOrUpdateBlog,
  getAllPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  getBlogBySlugAdmin,
  updateBlogStatus,
  deleteBlog,
  uploadImage,
  getBlogStats,
} = require('../controllers/blogController');

// Public routes
router.get('/', getAllPublishedBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes (auth protected)
router.post('/', auth, createOrUpdateBlog);
router.post('/admin/upload', auth, upload.single('image'), uploadImage);
router.get('/admin/stats', auth, getBlogStats);
router.get('/admin/all', auth, getAllBlogsAdmin);
router.get('/admin/:slug', auth, getBlogBySlugAdmin);
router.patch('/admin/:slug/status', auth, updateBlogStatus);
router.delete('/admin/:slug', auth, deleteBlog);

module.exports = router;
