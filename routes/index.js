const express = require('express');
const router = express.Router();
const multer = require('multer')
const con = require('../controller/controller');
const logcon = require('../controller/login');
const signupcon = require('../controller/signup');
const upload = require('../middleware/multer');
const passport = require('../middleware/passport');
const blogCon = require('../controller/blog');
const blogAddCon = require('../controller/addblog');
const profilecon = require('../controller/userprofile');
const logoutCon = require('../controller/logout');
const changePwdCon = require('../controller/changepwd');
const topicCon = require('../controller/topic');
const Auth = require('../middleware/auth');
const topic = require('../model/db/topic');

// dashboard
router.get('/', con.index);

// login
router.get('/logInForm', logcon.logincon);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), logcon.loginuser);

// signup
router.get('/registerForm', signupcon.registerForm);
router.post('/register', upload.single('userImg'), signupcon.registeruser);

// profile
router.get('/user-listing', Auth, profilecon.userListing);
router.get('/profile', Auth, profilecon.profile);

// logout
router.get('/logout', logoutCon.logout);

//blog
router.get('/blog', Auth, blogCon.blog);
router.get('/myblog', Auth, blogCon.myblog);

router.get('/addblog', Auth, blogAddCon.blogAdd);
router.post('/addBlogData', upload.single('blogImg'), blogAddCon.blogAddData);

router.get('/blog-edit/:id', blogAddCon.blogEdit);
router.post('/blog-update/:id', upload.single('blogImg'), blogAddCon.blogUpdate);

router.get('/blog-delete/:id', Auth, blogAddCon.blogDelete);

//pwd
router.get('/changepassword', Auth, changePwdCon.chanePass);
router.post('/changePassword', changePwdCon.changePassword);

// router.get('/forgotPassword', changePwdCon.forgotPassword);
// router.post('/forgotPasswordData', changePwdCon.forgotPasswordData);

// router.get('/otp/:id', changePwdCon.otp);
// router.post('/otpCheck/:id', changePwdCon.otpCheck);

// router.get('/newPass/:id', changePwdCon.newPass);
// router.post('/newPassWord/:id', changePwdCon.newPassWord);

// topic

router.get('/topic', Auth, topicCon.topic);
router.post('/addTopic', Auth, topicCon.addTopic);

router.get('/view-topic', Auth, topicCon.viewTopic);

router.get('/delete-topic/:id', Auth, topicCon.deleteTopic);

router.get('/subTopic', Auth, topicCon.subTopic);
router.post('/addSubTopic', Auth, topicCon.addSubTopic);

module.exports = router;