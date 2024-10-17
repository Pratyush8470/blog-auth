const express = require('express');
const router = express.Router();
const con = require('../controller/controller');
const logcon = require('../controller/login');
const signupcon = require('../controller/signup');
const upload = require('../middleware/multer');
const passport = require('../middleware/passport');
const blogCon = require('../controller/blog');
const myblogCon = require('../controller/myblog');
const profilecon = require('../controller/userprofile');
const logoutCon = require('../controller/logout');
const changePwdCon = require('../controller/changepwd');
const forgetpass = require('../controller/forgetpass');
const topicCon = require('../controller/topic');
const subtopicCon = require('../controller/subtopic');
const Auth = require('../middleware/auth');

// dashboard
router.get('/', con.index);

// login
router.get('/logInForm', logcon.login);
router.post('/login', passport.authenticate('local', { failureRedirect: '/loginForm' }), logcon.loginuser);

// signup
router.get('/registerForm', signupcon.register);
router.post('/register', upload.single('userImg'), signupcon.registeruser);

// profile
router.get('/profile', Auth, profilecon.profile);

// logout
router.get('/logout', logoutCon.logout);

//blog
router.get('/blogData', Auth, blogCon.showBlog);
router.get('/showBlog', upload.single('userImg'), blogCon.addBlog);

//comment
router.get('/coment', Auth, blogCon.addComents);

//my blog
router.get("/myBlog", Auth, myblogCon.myBlog);

//edit My blog
router.get("/myblogEdit/:id", myblogCon.editMyblog);
router.post("/myblogUpdate/:id", upload.single("imgPath"), myblogCon.updatemyBlog);

//Delet my blog
router.get("/mybogDelete/:id", myblogCon.deletmyBlog);

// change pwd
router.get("/changePass", Auth, changePwdCon.chanePass);
router.post("/changePassword", changePwdCon.changePassword)

//forgotPass
router.get("/forgotPass", forgetpass.forgot);
router.post("/forgetPass", forgetpass.forgotPassowrd);

//otp
router.get("/checkOtp/:id", forgetpass.checkOtp);
router.post("/check_Otp/:id", forgetpass.checkOtpCon);

//reset Password
router.get("/resetPassForm/:id", forgetpass.resetPass);
router.post("/resetPassword/:id", forgetpass.resetPassword);

// topice
router.get("/addTopic", topicCon.addtoPic);
router.post("/add_Topic", topicCon.addTopic);

//subtopics
router.get("/addsubTopic", subtopicCon.subToPic);
router.post("/add_subTopic", subtopicCon.addsubTopics);

// Delet subtopic 
router.get("/deletSubtopic/:id", subtopicCon.deletsubTopic);

// show topic and sub-topic
router.get("/showTopics", subtopicCon.showTopic);

module.exports = router;