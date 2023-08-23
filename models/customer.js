const mongoose = require("mongoose") ;

const Customer = mongoose.model("customer" , new mongoose.Schema({
    name: {
        type: String ,
        required : true , 
        minlength : 7 , 
        maxlength : 50 , 
    },
    isGold : {
        type :Boolean , 
        required : true 
    } , 
    phone : {
        type :String , 
        required : true , 
        minlength: 8 , 
        maxlength : 11 , 
    }
})) ; 
module.exports.customer = Customer ;