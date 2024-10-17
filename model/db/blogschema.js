const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    path: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true, default: new Date() },
    userName: { type: String, required: true }
});

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;