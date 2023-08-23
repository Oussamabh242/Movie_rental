

module.export =function(obj){
    if(!obj.isAdmin){
        return res.status(403).send("Acess denied") ; 
    }
}