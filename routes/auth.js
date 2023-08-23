const express = require("express") ;
const mongoose = require("mongoose") ; 
const User = require("../models/user.js").user ; 
const _ = require("loadsh") ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 

const router = express.Router() ; 

mongoose.connect("mongodb://127.0.0.1/vidly")
    .catch(e => console.log(e)) ; 

router.post("/" ,async (req , res)=>{

    let user = await User.findOne({email:req.body.email}) ;
    if(!user) {return res.status(404).send("user not found") ; }

    const validPassword =await bcrypt.compare(req.body.password , user.password) ;
    if(!validPassword) return res.status(400).send("wrong password") ; 

    const token = user.generateAuthToken() ; 

    res.send({toekn : token}) ; 

}) ;
module.exports = router ;