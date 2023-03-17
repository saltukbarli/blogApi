const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const OwnerSchema = require("./OwnerSchema");

const MessageSchema = new mongoose.Schema({

    toWhom: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    messages: [{
        type: String,
        required: true
    }],
    username: {
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
},{ timestamps: true },{ versionKey: false })

module.exports = mongoose.model("Message", MessageSchema)