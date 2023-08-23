const jwt = require("jsonwebtoken")
const User = require("../models/user").user ;

async function auth(req, res ,next){

  const token = req.header("x-auth-token") ; 

  if(!token) return res.status(401).send("access denied  , No token denied") ; 

  try{
    const decoded = jwt.verify(token , 'youbetterlawyerupasshole') ; 
    req.user = decoded ;
    req.user.isAdmin = (await User.findById(req.user._id)).isAdmin ; 
    next() ; 
  }
  
  catch(ex){
    res.status(400).send("Invalid Token") ;
  }


}

module.exports= auth ; 
