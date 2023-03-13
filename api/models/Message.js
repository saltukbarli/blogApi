const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    toWhom: {
        type: ObjectId,
        required: true,
    },
    messages: {
        type: String,
        required: true
    }
},{ versionKey: false })

module.exports = mongoose.model("Message", MessageSchema)