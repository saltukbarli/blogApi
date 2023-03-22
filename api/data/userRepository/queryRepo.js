const User = require("../../models/User")

async function getUserByName(username) {
    const foundOne = await User.findOne({ username: username })
    if (foundOne) {
        const myErr = new Error("Username has been taken!")
        myErr.status = 400
        throw myErr
    }
    return foundOne
}
async function getUserById(userId) {
    const foundOne = await User.findById(userId)
    if (foundOne) {
        const { password, messages, ...data } = foundOne._doc
        return data;
    }
    const myErr = Error("User not found")
    myErr.status = 400
    throw myErr

}
module.exports = { getUserByName, getUserById }