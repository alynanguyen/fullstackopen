const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', default: [] }], // Reference to blogs
});

const User = mongoose.model('User', userSchema);

module.exports = User;
