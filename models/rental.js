const { string } = require("joi");
const mongoose= require("mongoose") ; 

const Rental = mongoose.model("rental" , new mongoose.Schema({
    customer : {
        type :new mongoose.Schema({
            name : {
                type: String , 
                required : true, 
            } , 
            isGold: {
                type: Boolean , 
                default : false ,
                required:true
            } , 
            phone : {
                type : String , 
                required:true 
            }
        }),
        required:true
    } , 
    movie : {
        type :new mongoose.Schema({
            title : {
                type: String , 
                required : true ,
                trim : true
            } , 
            dailyRentalRate:{
                type :Number , 
                required:true 

            }
        }),
        required:true
    } ,
    dateOut:{
        type :Date , 
        required: true ,
        default :Date.now() 
    },
    dateReturned :{
        type: Date , 

    },
    retalFee: {
        type:Number ,
        min : 0 ,
    }
    
})) ; 

module.exports.rental = Rental ; 