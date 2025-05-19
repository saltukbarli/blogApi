const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRouter")
const postRoute = require("./routes/postRouter")
const messageRoute = require("./routes/messageRouter")
const cors = require("cors");


dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(/* process.env.MONGO_URI */"mongodb+srv://admin:saltuk123@cluster1.yw1lyeg.mongodb.net/blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("Connected Efficently to the MongoDB"))
    .catch((err) => console.log(err));


/* app.use(cors({ 
    origin: 'http://localhost:3000', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
})) */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use("/api/userRouter", userRoute)
app.use("/api/postRouter", postRoute)
app.use("/api/messageRouter", messageRoute)

app.listen("3000", () => {
    console.log("liveon");
});
