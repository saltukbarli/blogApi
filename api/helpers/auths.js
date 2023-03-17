const User = require("../models/User");


function authMiddleWare(req, res, next) {
    try {
        const user = User.findOne({ username: req.params.username })
        if (!user) {
            throw new Error("No such username exists")
        }
        next();
    } catch (err) {
        res.status(400).json(err.message)

    }

}

module.exports = authMiddleWare