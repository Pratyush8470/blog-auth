const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

});

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;