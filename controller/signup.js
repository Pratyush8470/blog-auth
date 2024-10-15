const userSchema = require('../model/db/userschema');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerForm = (req, res) => {
    res.render("signup")
}

const registeruser = async (req, res) => {

    if (req.body.pwd === req.body.con_pwd) {

        bcrypt.hash(req.body.pwd, saltRounds, async (err, hash) => {

            const userData = new userModel({
                path: req.file.path,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hash
            })
            console.log(userData);

            try {
                const user = await userData.save();
            } catch (error) {
                res.redirect('/login');
            }
        });

    } else {
        res.redirect('/register');
    }
}


module.exports = { registerForm, registeruser }