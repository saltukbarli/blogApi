
const {model,Schema} = require("mongoose")

const PostSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true }, { versionKey: false }
)

module.exports = model("Post", PostSchema)