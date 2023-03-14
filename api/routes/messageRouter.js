const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");


router.post("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
    if (user) {
        const userId = user._id
        const newMessage = new Message({
            toWhom: userId,
            messages: req.body.messages,
        })
        if (req.body.username == null || req.body.password == null) {
            res.status(400).json("You can not send a message without username and password path filled in.")
        }
        const valid = await User.findOne({ username: req.body.username, password: req.body.password })
        if (!valid) {
            res.status(400).json("Invalid username or password!")
        } else {

            const index = user.messages.findIndex(x => x.from === req.body.username)

            if (user.messages.find(x => x.from === req.body.username)) {
                let deger = Object.keys(user.messages[index]).length;
                let varyObj = user.messages[index]  
                varyObj[`message${deger}`] = req.body.messages
                user.messages.splice(index,1,varyObj)
                await user.save()
                const savedMessage = await newMessage.save()
                res.status(200).json(savedMessage._id + " message send succesfully!")
                
            } else {
                user.messages.push({ "from": req.body.username, "message": req.body.messages })
                await user.save()
                const savedMessage = await newMessage.save()
                res.status(200).json(savedMessage._id + " message send succesfully!")
            }

        }


    } else {
        res.status(400).json("Mentioned username do not exist!")
    }
})



module.exports = router