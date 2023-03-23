const User = require("../../models/User")
const Message = require("../../models/Message")
const postQuery = require("../postRepository/queryRepo")
const validator = require("../../validations/userValidator")

async function messageCreater(params, data) {
    const user = await User.findOne({ username: params })
    await postQuery.checkUserDetails(data)
    await validator.userPasswordValidation(data)
    if (user) {
        const userId = user._id
        const newMessage = new Message({
            toWhom: userId,
            messages: data.messages,
        })
        const index = user.messages.findIndex(x => x.from === data.username)
        if (user.messages.find(x => x.from === data.username)) {
            let deger = Object.keys(user.messages[index]).length;
            let varyObj = user.messages[index]
            varyObj[`message${deger}`] = data.messages
            user.messages.splice(index, 1, varyObj)
            await user.save()
            const savedMessage = await newMessage.save()
            return savedMessage._id ;
        } else {
            user.messages.push({ "from": data.username, "message": data.messages })
            await user.save()
            const savedMessage = await newMessage.save()
            return savedMessage._id ;
        }

    } else {
        const myErr = new Error("Mentioned username does not exist!")
        myErr.status = 401
        throw myErr
    }


}

module.exports = {messageCreater}