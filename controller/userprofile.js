const userSchema = require('../model/db/userschema');


const profile = async (req, res) => {

    res.render('profile.ejs', {
        userImg: req.user.path,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email
    });

}

module.exports = {  profile }