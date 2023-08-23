const mongoose = require("mongoose") ; 
const jwt = require("jsonwebtoken") ; 

const userSchema = new mongoose.Schema({
    name : {
        type: String ,
        required:true ,
        minlength : 7 , 
        maxlength : 60
    } , 
    email : {
        type: String , 
        required :true ,
        unique : true , 
        minlength : 5 , 
        maxlength: 60
    },
    password :{
        type: String ,
        required: true , 
        minlength : 8 ,
        maxlength : 60,
    } ,
    isAdmin : Boolean
}) ; 

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id : this._id ,
        isAdmin : this.isAdmin 
    } , "youbetterlawyerupasshole") ;
    return token ;
} ; 

const User = mongoose.model("user" , userSchema);
module.exports.user = User ;