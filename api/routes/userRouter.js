const router = require("express").Router();
const userMutationRepo = require("../data/userRepository/mutationRepo")
const userQueryRepo = require("../data/userRepository/queryRepo")
const validator = require("../validations/userValidator")

/* CREATE */
router.post("/create", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        const account = await userMutationRepo.creater(req.body)
        res.status(200).send(account)
    } catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }
})

router.get("/:id", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        validator.idValidator(req.params.id)
        const userData = await userQueryRepo.getUserById(req.params.id)
        res.status(200).send(userData)
    } catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }
})
router.post("/login", async (req, res) => {
    try {
        const userInf = await validator.loginPageValidation(req.body)
        res.status(200).json(userInf._doc)
    } catch (err){
        res.status(err.status ?? 404).json(err.message)
    }
})

module.exports = router