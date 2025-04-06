const Blog = require('../models/blog');
const User = require('../models/User');

// Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('user', 'username'); // Populate user to show the username of the blog creator
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

// Create a new blog (User can create their own blog)
const createBlog = async (req, res) => {
    const { title, author, url, likes } = req.body;
    const user = req.user; // Get the logged-in user from the JWT token

    try {
        // Check if required fields are provided
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }

        // Create the new blog
        const newBlog = new Blog({
            title,
            author,
            url,
            likes,
            user: user.id, // Associate the blog with the logged-in user
        });

        // Save the new blog to the database
        const savedBlog = await newBlog.save();

        // Find the user and add the blog to the user's blogs array
        const updatedUser = await User.findById(user.id); // Make sure you retrieve the user object

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        updatedUser.blogs.push(savedBlog._id); // Add the blog ID to the user's blogs array
        await updatedUser.save(); // Save the updated user

        // Send the successfully created blog as a response
        return res.status(201).json(savedBlog); // Return the saved blog
    } catch (err) {
        console.error('Error occurred while creating blog:', err); // Log error for debugging
        return res.status(500).json({ error: 'Failed to create blog' }); // Return generic error message
    }
};



// Update a blog (Only the owner can update their own blog)
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, author, url, likes } = req.body;
    const user = req.user; // Get the logged-in user from the JWT token

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the logged-in user is the one who created the blog
        if (blog.user.toString() !== user.id) {
            return res.status(403).json({ error: 'You are not allowed to modify this blog' });
        }

        // Update blog
        blog.title = title || blog.title;
        blog.author = author || blog.author;
        blog.url = url || blog.url;
        blog.likes = likes || blog.likes;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
};

// Delete a blog (Only the owner can delete their own blog)
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const user = req.user; // Get the logged-in user from the JWT token

    try {
        // Find the blog
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the logged-in user is the one who created the blog
        if (blog.user.toString() !== user.id) {
            return res.status(403).json({ error: 'You are not allowed to delete this blog' });
        }

        // Remove the blog from the user's blogs array
        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            { $pull: { blogs: blog._id } }, // Remove the blog's id from the user's blogs array
            { new: true } // To get the updated user document
        );

        // Delete the blog from the database
        await Blog.findByIdAndDelete(id);

        // Send a response
        res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error("Error occurred while deleting blog:", err);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};



module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
