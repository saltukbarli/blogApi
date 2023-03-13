const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User")

/* CREATE */
router.post("/create", async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            photo: req.body.photo,
            username: req.body.username,
            password: req.body.password
        })
        const founded = await User.findOne({ username: req.body.username, password: req.body.password })
        if (founded) {
            const savedpost = await newPost.save()
            founded.posts.push(savedpost._id)
            const savedFounded = await founded.save()
            res.status(200).json(savedFounded.posts)
        } else {
            res.status(401).json("No such user detail existed.")
        }
    } catch (err) {
        const foundOne = await Post.findOne({ title: req.body.title })
        foundOne && res.status(404).json("Title has been taken!")
        res.status(500)
    }
})

router.get("")

module.exports = router