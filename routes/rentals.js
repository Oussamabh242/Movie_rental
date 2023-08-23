const express = require("express") ; 
const mongoose = require("mongoose") ; 
const router = express.Router() ; 
// const schema = require("../schemas.js") ;
// const movieSchema = schema.movieSchema ; 
// const validate = schema.validate ;
const Movie = require("../models/movie.js").movie ;
const Customer = require("../models/customer.js").customer ; 
const Rental= require("../models/rental.js").rental ;
const rentalSchema = require("../schemas.js").rentalSchema ; 
const validate = require("../schemas.js").validate ; 



mongoose.connect("mongodb://127.0.0.1/vidly")
    .catch(e => console.log(e)) ; 

router.get("/" ,async (req , res)=>{
        const result = await Rental.find().sort("-dateOut")
            
        res.send(result) ; 
}) ; 

router.post("/" , async (req ,res)=>{
    
    if(validate(req.body , rentalSchema).error) return res.send(validate(req.body , rentalSchema).error)
    // if (validate(req.body , movieSchema).error)
    //     return res.status(400).send(validate(req.body , movieSchema).error);
    const customer = await Customer.findById(req.body.customer) ; 
    if(!customer) return res.status(404).send("customer is not identified") ; 
    
    const movie = await Movie.findById(req.body.movie) ; 
    if(!movie) return res.status(404).send("movie is not identified") ; 
    

    try{
        const rental = new Rental({
        customer :{
            _id : customer.id ,
            name :customer.name ,
            isGold : customer.isGold , 
            phone : customer.phone 
        } , 
        movie: {
            _id:movie._id , 
            title: movie.title , 
            dailyRentalRate : movie.dailyRentalRate 
        },
        dateReturned : new Date(req.body.dateReturned) ,
        rentalFee : req.body.rentalFee
    }) ;
    movie.numberInStock-- ;
    movie.save() ; 
    return res.send(await rental.save()) ; 
    
    }
    catch(e){
        return res.send(e)
    }
    
});

module.exports = router