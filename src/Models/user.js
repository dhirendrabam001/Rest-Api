const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createArt: {
        type: Date,
        default: Date.now
    }

});

const newUser = mongoose.model("userinfo", userScheme);

module.exports = {
    newUser
}