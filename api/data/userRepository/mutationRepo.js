const User = require("../../models/User")
const { getUserByName } = require("../userRepository/queryRepo")


async function creater(inputUser) {
    await getUserByName(inputUser.username)
    const user = {
        username: inputUser.username,
        password: inputUser.password,
        profilPicture: inputUser.profilPicture,
        posts: inputUser.posts,
        messages: inputUser.messages,
    }

    const newAcc = await new User(user).save()
    if (!newAcc) {
        const myErr = new Error("Something has been occured!")
        myErr.status = 500
        throw myErr
    }

    return newAcc._id;
}


module.exports = { creater }