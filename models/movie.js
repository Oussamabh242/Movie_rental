const mongoose= require("mongoose") ; 
let genreSchema = require("./genre.js").genreSchema;



const Movie =mongoose.model("movie", new mongoose.Schema({
    title : {
        type: String , 
        required : true , 
        minlength : 2 , 
        maxlength : 100 ,
    } ,
    numberInStock :{type:Number , required :true} ,
    dailyRentalRate :{type : Number , required : true} , 
    genre : {
        type : genreSchema ,
        required :true}
}));

module.exports.movie = Movie