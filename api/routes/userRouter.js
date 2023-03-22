const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const userMutationRepo = require("../data/userRepository/mutationRepo")
const userQueryRepo = require("../data/userRepository/queryRepo")
const validator = require("../validations/userValidator")

/* CREATE */
router.post("/create", async (req, res) => {
    try {
        const account = await userMutationRepo.creater(req.body)
        res.status(200).send(account)
    } catch (err) {
        res.status(err.status??404).send(err.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        validator.idValidator(req.params.id)
        const userData = await userQueryRepo.getUserById(req.params.id)
        res.status(200).send(userData)
    } catch (err) {
        res.status(err.status??404).send(err.message)
    }
})

module.exports = router