const express = require("express") ;
const { valid } = require("joi");
const mongoose = require("mongoose") ; 
const User = require("../models/user.js").user ; 
const userSchema = require("../schemas.js").userSchema ;
const validate = require("../schemas.js").validate ;
const _ = require("loadsh") ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 
const auth = require("../middleware/auth.js") ; 

const router = express.Router() ; 

mongoose.connect("mongodb://127.0.0.1/vidly")
    .catch(e => console.log(e)) ; 

router.post("/" ,async (req , res)=>{
    const {error} = validate(req.body , userSchema) ; 
    if(error) return res.status(400).send(error) ; 

    let user = await User.findOne({email:req.body.email}) ;
    if(user) {return res.send("email is already registered") ; }

    user = User(_.pick(req.body , ["email", "name" , "password"])) ; 
    const salt = await bcrypt.genSalt(10) ;
    user.password = await bcrypt.hash(user.password , salt) ; 

    user = await user.save() ;
    
    const token = user.generateAuthToken() ; 
    res.header("x-auth-token" , token).send(_.pick(user , ["name" ,"email" ,"_id"])); 
    res.he
}) ; 

router.get("/me" ,auth , async (req , res)=>{
    const user = await User.findById(req.user._id) ;
    res.send(user)
})



module.exports = router ;

