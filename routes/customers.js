const express = require("express") ; 
const mongoose = require("mongoose") ; 
const router = express.Router() ; 
const schema = require("../schemas.js") ;
const customerSchema = schema.customerSchema ; 
const validate = schema.validate ;
const Customer = require("../models/customer.js").customer ;

mongoose.connect("mongodb://127.0.0.1/vidly")
    .then(console.log("connected to mongodb"))
    .catch(e => console.log(e)) ; 

router.get("/" ,async (req , res)=>{
    res.send(await Customer.find()) ; 
})
router.get("/:id" , async (req , res)=>{
    const customer =await Customer.findById(req.params.id) ;
    if(!customer) return res.status(404).send("customer with given ID was not found"); 
    res.send(customer) ;
});


router.post("/" , async (req ,res)=>{
    
    if (validate(req.body , customerSchema).error)
        return res.status(400).send(validate(req.body , customerSchema).error);

    try{
        const customer = new Customer({
        name: req.body.name , 
        phone : req.body.phone , 
        isGold : req.body.isGold
    }) ;
    return res.send(await customer.save()) ;
    }
    catch(e){
        return res.send(e)
    }

})


router.put("/:id" , async (req ,res)=>{
    const customer= await Customer.findById(req.params.id)  ;
    if (!customer)return res.status(404).send("customer with given ID was not found") ;
    customer.name = req.body.name===undefined?customer.name : req.body.name;
    customer.isGold = req.body.isGold===undefined ? customer.isGold : req.body.isGold;
    customer.phone = req.body.phone===undefined?customer.phone : req.body.phone;
    res.send(await customer.save() ) ;
})
router.delete("/:id" ,async (req ,res)=>{
    let customer= await Customer.findById(req.params.id)  ;
    if (!customer)return res.status(404).send("customer with given ID was not found") ;
    customer = await customer.deleteOne() ;
    res.send(customer) ; 
})
module.exports = router ; 