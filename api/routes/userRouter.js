const router = require("express").Router();
const User = require("../models/User");


/* CREATE */
router.post("/create", async (req, res) => {

    try {
        const newAcc = new User({
            username: req.body.username,
            password: req.body.password,
            profilPicture: req.body.profilPicture,
            posts: req.body.posts,
            messages: req.body.messages,
        })

        acc = await newAcc.save();
        res.status(200).json(acc._id)

    } catch (err) {
        const foundOne = await User.findOne({ username: req.body.username })
        foundOne && res.status(404).json("Username has been taken!")

        res.status(500)
    }
})

module.exports = router