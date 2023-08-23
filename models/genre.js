const mongoose = require("mongoose") ;
const genreSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true ,
        minlength : 5 , 
        maxlength : 50 , 
    }
});
const Genre= mongoose.model("genre" , genreSchema);

module.exports.genre = Genre ;
module.exports.genreSchema = genreSchema;


