const Joi = require("joi") ; 
Joi.objectId = require("joi-objectid")(Joi) ; 

const genreSchema = Joi.object({
    name : Joi.string().min(3).required() 
}) ; 
const customerSchema = Joi.object({
    name :Joi.string().min(7).max(50).required() ,
    phone : Joi.string().min(8).max(11).required() ,
    isGold :Joi.bool().required() , 
});
const movieSchema = Joi.object({
    title : Joi.string().min(2).max(100).required(), 
    genre : Joi.string().required() , 
    numberInStock :Joi.number().required() ,
    dailyRentalRate : Joi.number().required()
});

const rentalSchema = Joi.object({
    movie: Joi.objectId().required() , 
    customer : Joi.objectId().required() , 
    dateReturned:Joi.string()
});

const userSchema = Joi.object({
    name : Joi.string().min(5).max(60).required(),
    email: Joi.string().min(5).max(60).required(),
    password : Joi.string().min(5).max(60).required(),

}) ; 

function validate(thing , schema){
    return schema.validate(thing) ; 
}
module.exports.genreSchema = genreSchema ; 
module.exports.validate = validate ; 
module.exports.customerSchema = customerSchema ;
module.exports.movieSchema = movieSchema ;
module.exports.rentalSchema = rentalSchema ;
module.exports.userSchema = userSchema;