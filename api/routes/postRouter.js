const router = require("express").Router();
const mutationRepo = require("../data/postRepository/mutationRepo")
const queryRepo = require("../data/postRepository/queryRepo")
/* const authenticate = require("../helpers/auths") */

/* CREATE */
router.post("/create", async (req, res) => {
    try {
        const postss = await mutationRepo.postCreater(req.body)
        res.status(200).send(postss)
    }
    catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }
})

router.get("/:username", async (req, res) => {
    try {
        const aggregation = await queryRepo.userPostList(req.params.username)
        res.status(200).json(aggregation)
    } catch (err) {
        res.status(err.status ?? 404).send(err.message)
    }
})


module.exports = router