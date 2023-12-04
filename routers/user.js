const express=require('express')
const user1= express()
const {verifyToken}= require('../middleware/verifytoken')
const {getUser}= require("../controllers/userController")


// user1.post('/',verifyToken)
user1.get('/',verifyToken,getUser)


module.exports ={user1}