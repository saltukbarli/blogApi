const User = require("../../models/User")
const Post = require("../../models/Post")


async function checkUserDetails(data) {
    const foundOne = await User.findOne({ username: data.username, password: data.password })
    if (!foundOne) {
        const myErr = new Error("No such user detail existed.")
        myErr.status = 400
        throw myErr
    }
    return foundOne;
}

async function checkTitleIsTaken(data) {
    const foundOne = await Post.findOne({ title: data.title })
    if (foundOne) {
        const myErr = new Error("Title has been taken!")
        myErr.status = 404
        throw myErr
    }
    return true
}

async function userPostList(username) {
    const foundOne = await User.findOne({ username: username })
    if (!foundOne) {
        const myErr = new Error("User not found!!")
        myErr.status = 404
        throw myErr
    }
    const agg = await User.aggregate([
        { '$match': { 'username': username } },
        {
            '$lookup': {
                'from': 'posts',
                'localField': 'posts',
                'foreignField': '_id',
                'as': 'result'
            }
        },
        { '$unwind': { 'path': '$result' } },
        {
            '$project': {
                '_id': 0,
                'title': '$result.title',
                'description': '$result.description'
            }
        }
    ]);
    return agg

}

module.exports = { checkUserDetails, checkTitleIsTaken, userPostList }