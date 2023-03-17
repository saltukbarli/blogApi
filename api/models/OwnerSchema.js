const { Schema } = require("mongoose");


const OwnerSchema = new Schema({
    username: {
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
})

module.exports = OwnerSchema