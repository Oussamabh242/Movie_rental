const express = require("express") ; 
const mongoose = require("mongoose") ; 
const router = express.Router() ; 
const schema = require("../schemas.js") ;
const movieSchema = schema.movieSchema ; 
const validate = schema.validate ;
const Movie = require("../models/movie.js").movie ;
const Genre = require("../models/genre.js").genre ; 


mongoose.connect("mongodb://127.0.0.1/vidly")
    .then(console.log("connected to mongodb"))
    .catch(e => console.log(e)) ; 

router.get("/" ,async (req , res)=>{
        res.send(await Movie.find()) ; 
}) ; 

router.post("/" , async (req ,res)=>{
    
    if (validate(req.body , movieSchema).error)
        return res.status(400).send(validate(req.body , movieSchema).error);
    const genre = await Genre.findById(req.body.genre) ; 
    if(!genre) return res.status(404).send("genre is not identified") ; 
    

    try{
        const movie = new Movie({
        title: req.body.title, 
        genre : {
            _id: genre.id ,
            name : genre.name
        } , 
        dailyRentalRate : req.body.dailyRentalRate , 
        numberInStock : req.body.numberInStock
    }) ;
    return res.send(await movie.save()) ; 
    }
    catch(e){
        return res.send(e)
    }
    
});

module.exports = router