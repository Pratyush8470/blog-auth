const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    path: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true, default: new Date() },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;