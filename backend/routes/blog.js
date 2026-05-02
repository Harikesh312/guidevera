const express = require('express');
const multer = require('multer');
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
router.post('/admin/upload', auth, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ success: false, message: 'File too large. Max limit is 50MB.' });
      }
      return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ success: false, message: `Upload error: ${err.message}` });
    }
    next();
  });
}, uploadImage);
router.get('/admin/stats', auth, getBlogStats);
router.get('/admin/all', auth, getAllBlogsAdmin);
router.get('/admin/:slug', auth, getBlogBySlugAdmin);
router.patch('/admin/:slug/status', auth, updateBlogStatus);
router.delete('/admin/:slug', auth, deleteBlog);

module.exports = router;
