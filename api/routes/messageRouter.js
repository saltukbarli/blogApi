const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");
const mutationRepo = require("../data/messageRepository/mutationRepo")
const queryRepo = require("../data/messageRepository/queryRepo")

router.post("/:username", async (req, res) => {
    try {
        const result = await mutationRepo.messageCreater(req.params.username, req.body)
        res.status(200).json(result + " message send succesfully!")
    } catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }

})

router.post("/:username/mymessages", async (req, res) => {
    try {
        const aggregation = await queryRepo.getMessages(req.params.username,req.body)
        res.status(200).json(aggregation)
    } catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }

})

module.exports = router