const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user:{type: mongoose.Schema.Types.ObjectId}


}, {timestamps: true});

const contactModel = mongoose.model("contactdata", contactScheme);

module.exports = {contactModel};


