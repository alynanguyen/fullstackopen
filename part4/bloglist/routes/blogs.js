const express = require('express');
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogsController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// GET all blogs - accessible to everyone
router.get('/', getBlogs);

// POST a new blog - accessible only to logged-in users (no roles anymore)
router.post('/', authenticate(), createBlog);

// PUT (update) a blog - accessible only to the user who created the blog
router.put('/:id', authenticate(), updateBlog);

// DELETE a blog - accessible only to the user who created the blog
router.delete('/:id', authenticate(), deleteBlog);

module.exports = router;
