const router = require("express").Router();
const { default: mongoose } = require("mongoose");
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

router.get("/:id", async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json("Invalid ID type has been entered.")
        }
        const getFoundOne = await User.findById(req.params.id)
        if (getFoundOne) {
            const { password, ...data } = getFoundOne._doc
            res.status(200).json(data)
        } 
        res.status(401).json("User not found.") 

    } catch (err) {
        res.status(500)
    }
})

module.exports = router