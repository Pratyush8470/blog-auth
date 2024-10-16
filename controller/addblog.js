const blogModel = require('../model/db/blogschema');
const fs = require('fs');

const blogAdd = (req, res) => {

    res.render('blog-add');
}

const blogAddData = async (req, res) => {
    try {
        const blogData = new blogModel({
            path: req.file.path,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            user_id: req.user._id
        })



        const blog = await blogData.save();
        res.redirect('/blog');
    } catch (error) {
        res.redirect('/blog-add');
    }
}

const blogEdit = async (req, res) => {

    const { id } = req.params;

    const blogData = await blogModel.findOne({ _id: id });


    res.render('blog-edit.ejs', { blogData })
}

const blogUpdate = async (req, res) => {

    const { id } = req.params;

    const blogData = {
        path: req.file.path,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }

    try {
        const blog = await blogModel.updateOne({ _id: id }, blogData);
        res.redirect('/blog');
    } catch (error) {
        res.redirect('/blog-edit');
    }
}

const blogDelete = async (req, res) => {
    const { id } = req.params;

    const blogData = await blogModel.deleteOne({ _id: id });

    res.redirect('/blog');
}

module.exports = { blogAdd, blogAddData, blogEdit, blogUpdate, blogDelete };