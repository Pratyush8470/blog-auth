const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const port = process.env.PORT || 3006;
const bodyParser = require('body-parser');
const reqPath = path.join(__dirname, 'views/src/html');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const db = require('./model/db/userschema.js');
const session = require('express-session');
const passport = require('./middleware/passport.js');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', reqPath);

app.use(session({ secret: 'secretkey', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(flash());

app.use(express.static(reqPath));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use('/', router);

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on http://localhost:${port}`);
    }
})