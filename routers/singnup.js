const express=require('express')
const user=express()
const {signUp}  =require("../controllers/authController")


user.get("/", (req, res) => {
    res.status(200).json("Welcome to the SignUp Page!");
})

user.post('/',signUp);



module.exports={user}
