const express = require("express") ; 
const router = express.Router();
const schemas = require("../schemas.js") ; 
const genreSchema = schemas.genreSchema ; 
const validate = schemas.validate ; 
const mongoose = require("mongoose") ; 
const Genre = require("../models/genre.js").genre ;
const auth = require("../middleware/auth.js") ; 
// const admin = require("../middleware/admin.js") ; 

mongoose.connect("mongodb://127.0.0.1/vidly")
    .catch(e => console.log(e)) ; 

router.get("/" ,async (req , res)=>{
    const genres = await Genre.find()
    .sort({name:1}) ; 
    return res.send(genres)  ;
})

router.post("/" ,auth,async (req , res)=>{
    admin(req.user , res) ; 
    let validation = validate(req.body , genreSchema) ; 

    if(validation.erro) return res.send(validation) ; 

    let genre = new Genre({
        name : req.body.name
    })  ; 
    genre = await genre.save() ;

    res.send(genre) ; 
}) ; 

router.put('/:id',auth, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validate(req.body, genreSchema); 
    if (error) return res.status(400).send(error.details[0].message);
    genre.name=req.body.name ; 
    const output = await genre.save() ; 
    res.send(output);
  });
  
  router.delete('/:id',async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id) ;
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });

router.get("/:id" , async (req , res)=>{
    const genre = await Genre.findById(req.params.id) ; 
    if (!genre) return res.status(404).send("genre with the given ID was not found") ; 
    res.send(genre) ; 
})


function admin(obj , res){
    if(!obj.isAdmin){
        return res.status(403).send("Acess denied") ; 
    }
}

  module.exports = router ; 