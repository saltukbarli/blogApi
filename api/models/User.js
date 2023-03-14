const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilPicture: {
        type: String,
        default: ""
    },
    posts: [{
        type: mongoose.Types.ObjectId,
    }],
    messages: [{
        type: Object,
    }]
}, { versionKey: false })

module.exports = mongoose.model("User", UserSchema)