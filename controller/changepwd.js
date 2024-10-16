const userSchema = require("../model/db/userschema")
const bcrypt = require("bcrypt")

const chanePass = (req, res) => {

    res.render("changepass");
}

const changePassword = (req, res) => {

    const { password } = req.user;

    console.log("password", password);

    const { currentpass, newpass, confirmpass} = req.body;

    bcrypt.compare(currentpass, password, async (err, result) => {
        if(result) {   
            console.log("result", result);
            if(newpass === confirmpass) {
                bcrypt.hash(newpass, 10, async (err, hashPass) => {

                    if(!err) {
                        const updatePass = await userSchema.updateOne(
                            { _id : req.user._id },
                            { password : hashPass }
                        )
                        console.log("updatePass", updatePass);        
                        res.redirect("/logInForm")
                    } else {
                        console.log(err, "password not match")
                    }
                })
            } else {
                console.log(err, "new password not match")
                res.redirect("/logInForm")
            }
        } 
    })
}

module.exports = { chanePass, changePassword }