const { default: mongoose } = require("mongoose");

function checkUsername (username) {
    const myRegex = new RegExp ("[_.,]")
    if(username.match(myRegex)) {
        throw new Error("Invalid name")
    }
}

function idValidator (userId) {
    if(!mongoose.Types.ObjectId.isValid(userId)){
        const myErr = Error("Invalid ID type has been entered.")
        myErr.status = 402
        throw myErr
    }
}

module.exports = {checkUsername,idValidator}