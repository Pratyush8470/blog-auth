const userModel = require('../model/db/userschema');

const userListing = async (req, res) => {

    res.render('user-listing.ejs', {
        userImg: req.user.path,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email
    });

}

const profile = async (req, res) => {

    res.render('profile.ejs', {
        userImg: req.user.path,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email
    });

}

module.exports = { userListing, profile }