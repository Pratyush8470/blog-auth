const userSchema = require("../model/db/userschema")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

let OTP = null;
let refreshToken = null;

const forgot = (req, res) => {
    res.render("forgetpass", { id: req.params.id });
}

const errorPage = (req, res) => {
    res.render("404");
}


const forgotPassowrd = async (req, res) => {

    const { email } = req.body;

    const user = await userSchema.findOne({ email });
    console.log("user", user);

    if (!user) {
        res.redirect("/forgotPassForm");

    } else {

        const refToken = randomstring.generate();

        console.log("refToken", refToken);
        await userSchema.updateOne({ email }, { refreshToken: refToken })

        const link = `http://localhost:5012/resetPass/${user._id}`
        console.log("link", link);

        const userAuth = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "pratyushbhatiya106@gmail.com",
                pass: "ytak ekpz evpz pqoz"
            }
        })

        const mailOptionsRce = {
            from: "pratyushbhatiya106@gmail.com",
            to: user.email,
            subject: "Reset Password",
            text: `your reset password Link is ${link}`,
        }

        userAuth.sendMail(mailOptionsRce, (err, info) => {
            if (!err) {
                res.redirect(`sendMailMsg/${user._id}`);
            } else {
                console.log("Error not send the mail", err);
            }
        })

    }
}

const checkOtp = (req, res) => {
    res.render("chackotp", { id: req.params.id });
};

const checkOtpCon = async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;

    if (OTP === otp) {
        res.redirect(`/resetPass/${id}`);
    } else {
        res.redirect(`/checkOtp/${id}`);
    }
};


const resetPass = async (req, res) => {

    const loginUser = await userSchema.findOne({ _id: req.params.id });
    try {
        if (loginUser) {
            console.log("loginUser", loginUser);
            if (loginUser.refreshToken) {
                res.render("resetlinkpass", { id: req.params.id });
            } else {
                res.redirect("/errorPage");
            }
        } else {
            res.redirect("/logInForm");
        }
    } catch (error) {
        console.log(error, "error");
    }

}

const resetPassword = async (req, res) => {

    const { id } = req.params;
    const { newPass, confPass } = req.body;

    if (newPass === confPass) {
        bcrypt.hash(newPass, 10, async (err, hashPass) => {
            if (!err) {
                const updatePass = await userSchema.updateOne(
                    { _id: id },
                    { password: hashPass, refreshToken: null },
                    { new: true }
                );
                console.log("updatePass", updatePass);
                res.redirect("/logInForm");
            } else {
                console.log(err, "Password hashing error");
            }
        });
    } else {
        console.log("New password does not match confirmation");
        res.redirect(`/resetPass/${id}`);
    }
};



module.exports = { forgot, forgotPassowrd, checkOtp, checkOtpCon, resetPass, resetPassword, errorPage };