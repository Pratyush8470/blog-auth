const blogSchema = require("../model/db/blogschema.js");
const commentModel = require("../model/db/comment.js");

const showBlog = async (req, res) => {
    console.log(req.body);
    const addComment = await commentModel.find({}).populate("userId");

    console.log("addComment", addComment);

    let blogData = await blogSchema.find({});

    console.log("blogData", blogData);
    res.render('blog',
        {
            userPath: req.user.userPath,
            userName: req.user.userName,
            email: req.user.email,
            role: req.user.role,
            blogData: blogData,
            addComment: addComment
        });
}

const addBlog = async (req, res) => {

    const add = new blogSchema({
        imgPath: req.file.path,
        title: req.body.title,
        userName: req.body.userName,
        date: req.body.date,
        description: req.body.description
    })

    console.log("added", add);

    try {
        const newBlog = await addBlogData.save();
        console.log("newblog", newBlog);
        res.redirect('/blog');
    } catch (error) {
        console.log(error);
    }
}


const addComents = async (req, res) => {
    try {
        const addComment = new commentModel({
            comment: req.body.comment,
            userId: req.user._id,  
            blogId: req.body.blogId 
        });

        const newComment = await addComment.save();
        console.log("newComment", newComment);

        res.redirect('/blog');

        const getComment = await commentModel.find({}).populate("blogId");
        console.log("getCommentsData", getComment);

    } catch (error) {
        console.log("Error saving comment:", error);
    }
};


module.exports = { showBlog, addBlog, addComents };