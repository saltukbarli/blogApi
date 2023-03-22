const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");


router.post("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }) //USER VAR MI YOK MU KONTROL
        if (user) {
            const userId = user._id
            const newMessage = new Message({
                toWhom: userId,
                messages: req.body.messages,
            })
            if (req.body.username == null || req.body.password == null) {//USERNAME YA DA PAROLA OLMADAN MESAJ GÖNDERİLMESİN
                res.status(400).json("You can not send a message without username and password path filled in.")
            }
            //GİRİLEN USERNAME VE PAROLA DOĞRU MU KONTROL ET
            const valid = await User.findOne({ username: req.body.username, password: req.body.password })
            if (!valid) {
                res.status(400).json("Invalid username or password!")
            } else {
                //USER VARSA VE DAHA ÖNCE MESAJ ATTIYSA VERİTABANINA TEKRAR "FROM" ALANI EKLEMEMEK İÇİN OLAN KISIM
                const index = user.messages.findIndex(x => x.from === req.body.username)

                if (user.messages.find(x => x.from === req.body.username)) {
                    let deger = Object.keys(user.messages[index]).length;
                    let varyObj = user.messages[index]
                    varyObj[`message${deger}`] = req.body.messages
                    user.messages.splice(index, 1, varyObj)
                    await user.save()
                    const savedMessage = await newMessage.save()
                    res.status(200).json(savedMessage._id + " message send succesfully!")
                    // DEĞER USER İLK DEFA MESAJ ATIYORSA OBJEYİ DİREKT DİZİYE PUSHLA
                } else {
                    user.messages.push({ "from": req.body.username, "message": req.body.messages })
                    await user.save()
                    const savedMessage = await newMessage.save()
                    res.status(200).json(savedMessage._id + " message send succesfully!")
                }
            }
        } else {
            res.status(400).json("Mentioned username do not exist!")
        }
    } catch (err) {
        res.status(500)
    }

})

router.post("/:username/mymessages", async (req, res) => {
    try {
        const foundOne = await User.findOne({ username: req.params.username })
        const uzunluk = Object.keys(req.body).length //SADECE PASSWORD GİRİLSİN
        if(uzunluk==1){
            if (foundOne) {
                if (req.body.password === foundOne.password) {
                    const agg = await User.aggregate([
                        {'$match': {'username': req.params.username}}, 
                        {'$unwind': {'path': '$messages'}}, 
                        {'$addFields': {
                                'from': '$messages.from',
                                'message': '$messages'
                            }}, 
                        {'$project': {
                                'message.from': 0,
                                '_id': 0,
                                'posts': 0,
                                'username': 0,
                                'password': 0,
                                'profilPicture': 0,
                                'messages': 0
                            }}
                    ]);
                    res.status(200).json(agg)
                }
                res.status(400).json("Invalid username or password! Also Check if you are using the exact path like 'password':'<password>' ")
            }

        } else {
            res.status(401).json("Just enter the password key!")
        }
        

    } catch (err) {
        res.status(500)
    }

})

module.exports = router