const User = require("../../models/User")

async function getMessages(params, data) {
    const foundOne = await User.findOne({ username: params })
    const uzunluk = Object.keys(data).length
    if (uzunluk == 1) {
        if (foundOne) {
            if (data.password === foundOne.password) {
                const agg = await User.aggregate([
                    { '$match': { 'username': params } },
                    { '$unwind': { 'path': '$messages' } },
                    {
                        '$addFields': {
                            'from': '$messages.from',
                            'message': '$messages'
                        }
                    },
                    {
                        '$project': {
                            'message.from': 0,
                            '_id': 0,
                            'posts': 0,
                            'username': 0,
                            'password': 0,
                            'profilPicture': 0,
                            'messages': 0
                        }
                    }
                ]);
                return agg
            }
            const myErr = new Error("Invalid username or password! Also Check if you are using the exact path like 'password':'<password>' ")
            myErr.status = 402
            throw myErr
        } else {
            const myErr = new Error("Just enter the password key!")
            myErr.status = 403
            throw myErr
        }

    }
}

module.exports = { getMessages }