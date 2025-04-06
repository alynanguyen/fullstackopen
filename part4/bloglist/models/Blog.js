const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }, // This is the author's name
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  // This is the user who posted the blog
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
