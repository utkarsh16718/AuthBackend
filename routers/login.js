const express=require('express');
const log = express();

const {login}=require('../controllers/authController');


log.get('/',(req,res)=>{
    return res.status(200).json("welcome to login")
})
log.post('/',login)

module.exports= {log}