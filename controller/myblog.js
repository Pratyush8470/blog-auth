const blogSchema = require("../model/db/blogschema");
const fs = require("fs");

const myBlog = async (req, res) => {

    console.log(req.body);

    let myBlogData = await blogSchema.find({ userName: req.user.userName });

    console.log("myblog", myBlogData);
    res.render('myblog',
        {
            userPath: req.user.userPath,
            userName: req.user.userName,
            email: req.user.email,
            role: req.user.role,
            myBlogData: myBlogData
        });
}

const myblogCon = async (req, res) => {

    const addBlog = new blogSchema({
        imgPath: req.file.path,
        title: req.body.title,
        userName: req.body.userName,
        date: req.body.date,
        description: req.body.description
    })

    console.log("added", addBlog);

    try {
        const newBlog = new blogSchema(addBlog)
        await newBlog.save();
        console.log("new Blog", newBlog);
        res.redirect('/myblog');
    } catch (error) {
        console.log(error, "error");
    }
}

const editMyblog = async (req, res) => {

    const { id } = req.params;

    const myBlogEdit = await blogSchema.findOne({ _id: id });

    console.log(myBlogEdit, "myBlogSingleRecEdit");

    await res.render("editblog", { myBlogEdit })

}

const updatemyBlog = async (req, res) => {

    const { id } = req.params;

    const myblogUpdate = await blogSchema.findById({ _id: id });

    console.log(myblogUpdate, "my Blog Updated");

    if (req.path) {
        fs.unlinkSync(myblogUpdate.imgPath, (err) => {
            if (err) {
                console.log(err, "File was deleted!");
            }
        });
        myblogUpdate.imgPath = req.file.path
    }

    myblogUpdate.title = req.body.title
    myblogUpdate.userName = req.body.userName
    myblogUpdate.date = req.body.date
    myblogUpdate.description = req.body.description

    try {
        const updateBlog = await blogSchema.findByIdAndUpdate({ _id: id }, myblogUpdate, { new: true });
        console.log(updateBlog, "updateData");
        res.redirect("/myblog");
    } catch (error) {
        console.log(error, "error");
    }

}

const deletmyBlog = async (req, res) => {

    const { id } = req.params;

    console.log(id, "id");

    const myblogDelete = await blogSchema.findById({ _id: id });

    console.log("my Blog Deleted", myblogDelete);

    fs.unlinkSync(myblogDelete.imgPath, (err) => {
        if (err) {
            console.log(err, "file was deleted!");
        }
    });



    const deleteBlog = await blogSchema.findByIdAndDelete({ _id: id });

    console.log(deleteBlog, "deleteData");


    res.redirect("/myblog");
}


module.exports = { myBlog, myblogCon, editMyblog, updatemyBlog, deletmyBlog };