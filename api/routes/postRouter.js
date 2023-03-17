const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");
/* const authenticate = require("../helpers/auths") */

/* CREATE */
router.post("/create", async (req, res) => {
    /* const session = await mongoose.startSession() */
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
            /* const savedpost = await newPost.save({session}) */
            const savedpost = await newPost.save()
            founded.posts.push(savedpost._id)
            const savedFounded = await founded.save()
            res.status(200).json(savedFounded.posts)
            /* const result = await User.updateOne({username:req.body.username},{$push:{posts:savedpost._id}},{session})
            if(result.modifiedCount ==1){
                res.status(200).json(savedpost._id)
            } */
        } else {
            /* await session.abortTransaction()
            await session.endSession() */
            res.status(401).json("No such user detail existed.")
        }
    } catch (err) {
        /* await session.abortTransaction()
        await session.endSession() */
        const foundOne = await Post.findOne({ title: req.body.title })
        foundOne && res.status(404).json("Title has been taken!")
        res.status(500)
    }   finally {
        /* await session.commitTransaction() */
    }
})

router.get("/:username", async (req, res) => {
    try {
        const foundOne = await User.findOne({ username: req.params.username })
        if (foundOne) {
            const agg = await User.aggregate([
                { '$match': { 'username': req.params.username } },
                {'$lookup': {
                        'from': 'posts',
                        'localField': 'posts',
                        'foreignField': '_id',
                        'as': 'result'
                    } },
                { '$unwind': { 'path': '$result' } }, 
                { '$project': {
                    '_id': 0, 
                    'title': '$result.title', 
                    'description': '$result.description'
                  }}
            ]);
            res.status(200).json(agg)
        } else {
            res.status(400).json("User not found!")
        }
    } catch (err) {
        res.status(500)
    }
})


module.exports = router