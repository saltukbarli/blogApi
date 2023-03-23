const Post = require("../../models/Post")
const User = require("../../models/User")
const queryRepo = require("../postRepository/queryRepo")

async function postCreater (data) {
    const founded = await queryRepo.checkUserDetails(data)
    await queryRepo.checkTitleIsTaken(data)
    const newPost = {
        title: data.title,
        description: data.description,
        photo: data.photo,
        username: data.username,
        password: data.password
    }
    const savedpost = await new Post(newPost).save()
    if(!savedpost) {
        const myErr = new Error("Something has been occured!")
        myErr.status = 500
        throw myErr
    }
    founded.posts.push(savedpost._id)
    await founded.save()

    return founded.posts
}

module.exports = {postCreater}