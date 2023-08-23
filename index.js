const express = require("express"); const app = express() ; 
const schemas = require("./schemas.js")
const Joi = require("joi") ; 

const helmet = require("helmet") ; 
const morgan = require("morgan") ; 
const config = require("config"); 
const debug = require("debug")("app:startup") ;
const winston = require("winston") ; 

const genresRouter = require("./routes/genres.js") ; 
const homeRouter = require("./routes/home.js") ; 
const customerRouter = require("./routes/customers.js") ; 
const movieRouter  = require("./routes/movies.js") ; 
const rentalRouter = require("./routes/rentals.js") ; 
const userRouter = require("./routes/users.js") ; 
const authRouter = require("./routes/auth.js") ; 

const genreSchema = schemas.genreSchema ; 
const validate = schemas.validate ; 

winston.add(new winston.transports.File({filename : "logfile.log"}));

//middleware fx
app.use(express.json()) ;
app.use(express.urlencoded({extended: true})) ; 
app.use(helmet()) ; 
if(app.get("env")==='development')
  app.use(morgan("tiny")) ; 
  debug("morgan enabled..."); 

app.use("/" ,homeRouter ) ; 
app.use("/api/genres" , genresRouter); 
app.use("/api/customers" , customerRouter) ;
app.use("/api/movies",movieRouter ) ; 
app.use("/api/rentals" , rentalRouter) ; 
app.use("/api/users" , userRouter) ; 
app.use("/api/auth" , authRouter) ; 

 
app.set("view engine" , "pug");
app.set("views", "./views") ;




process.on("unhandledRejection" , (ex)=>{
  console.log("WE GOT AN UNHADLED REJECTION") ;
  winston.error(ex.code , ex)
})

//Listener

const port = process.env.PORT || 3000 ;
app.listen(port , ()=>console.log("listening on port 3000")) ; 