const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pratyushbhatiya:AyZ3wRXkbw2ywtig@cluster1.2bdmb.mongodb.net/admin_auth')

    .then(() => console.log('Connected to db'))
    .catch((err) => console.log(err));


const user = new mongoose.Schema({
    path: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tokenReset: { type: String }
});
const userSchema = mongoose.model("user", user);

module.exports = userSchema;