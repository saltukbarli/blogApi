const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRouter")
const postRoute = require("./routes/postRouter")
const messageRoute = require("./routes/messageRouter")

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("Connected Efficently to the MongoDB"))
    .catch((err) => console.log(err));



app.use("/api/userRouter", userRoute)
app.use("/api/postRouter", postRoute)
app.use("/api/messageRouter", messageRoute)

app.listen("3000", () => {
    console.log("liveon");
});
