const bcrypt = require('bcrypt');
const userSchema = require('../model/db/userschema');

const logincon = (req, res) => {
    res.render('signin');
}

const loginuser = (req, res) => {
    req.flash('success', 'You Have Logged-in Successfully');
    res.redirect('/');
}

module.exports = { logincon, loginuser };