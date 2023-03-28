const { default: mongoose } = require("mongoose");
const User = require("../models/User")

function checkUsername(username) {
    const myRegex = new RegExp("[_.,]")
    if (username.match(myRegex)) {
        throw new Error("Invalid name")
    }
}

function idValidator(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        const myErr = Error("Invalid ID type has been entered.")
        myErr.status = 402
        throw myErr
    }
}

async function userPasswordValidation(data) {
    if (data == null) {
        const myErr = new Error("fill in the blank")
        myErr.status = 401
        throw myErr
    }
    const foundOne = await User.findOne({ username: data.username, password: data.password })
    if (!foundOne) {
        const myErr = new Error("Invalid username or password!")
        myErr.status = 401
        throw myErr
    }
    if (data.username == null || data.password == null) {
        const myErr = new Error("You can not send a message without username and password path filled in.")
        myErr.status = 401
        throw myErr
    }
    return true;
}
async function loginPageValidation(data) {

    const foundOne = await User.findOne({ username: data.username, password: data.password })
    if (!foundOne) {
        const myErr = new Error("Invalid username or password!")
        myErr.status = 401
        throw myErr
    }
    if (data.username == null || data.password == null) {
        const myErr = new Error("Fill in the blanks!")
        myErr.status = 406
        throw myErr
    }
    return foundOne;
}

module.exports = { checkUsername, idValidator, userPasswordValidation, loginPageValidation }