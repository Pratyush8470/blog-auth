const express = require('express');
const router = express.Router();
const con = require('../controller/controller');
const logcon = require('../controller/login');
const signupcon = require('../controller/signup');
const upload = require('../middleware/multer');
const passport = require('../middleware/passport');
const profilecon = require('../controller/userprofile');
const logoutCon = require('../controller/logout');
const Auth = require('../middleware/auth');

// dashboard
router.get('/', con.index);

// login
router.get('/login', logcon.logincon);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), logcon.loginuser);

// signup
router.get('/register', signupcon.registerForm);
router.post('/register', upload.single('userImg'), signupcon.registeruser);

// profile
router.get('/user-listing', Auth, profilecon.userListing);
router.get('/profile', Auth, profilecon.profile);

// logout
router.get('/logout', logoutCon.logout);





module.exports = router;