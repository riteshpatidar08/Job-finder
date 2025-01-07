import express from 'express' ;
import dotenv from 'dotenv'  ;
import dbConnect from './db/connect.js';

dotenv.config() ;
dbConnect()


const app = express() ;

//middlewares



//routes





app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on the ${process.env.PORT}`)
})






//redux setup complete 

//Login Page => mantine prefer