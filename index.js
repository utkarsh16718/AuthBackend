const express = require('express');
const bodyParser = require('body-parser');
const port = 4000
const app = express();
const server = require('http').createServer(app);
// const server = http.createServer(app);
const mongoose = require('mongoose');
require('dotenv/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {user}=require('./routers/singnup')
const {log}= require('./routers/login')
const {user1}=require('./routers/user')

app.use(cors({ origin: ['http://localhost:5173'] ,credentials: true }));

app.use(cookieParser());
app.use(
    bodyParser.json()
)
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use("/signUp",user)
app.use("/login",log)
app.use("/user",user1)

app.get("/", (req, res) => {
    res.status(200).json("GOt it");
})
mongoose.set('strictQuery', true);

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    }
).then(() => {
    console.log("Database Successfully Connected");
}).catch(() => {
    console.log("Failed to connect")
})


server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
