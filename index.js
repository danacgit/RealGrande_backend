const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors=require('cors');

dotenv.config()

//require cors
//set corspolicy to allow requests from localhost:3000

const allRouter = require('./routes/allRoutes')

const app = express()
app.use(express.json());
let corsplicy={
    origin:process.env.FRONTEND_URL
    //origin:"http://localhost:3000"
}

app.use(cors(corsplicy));



const db = module.exports =()=>{
    try{
        mongoose.connect(process.env.DBURI, { user: process.env.DBUSERNAME, pass: process.env.DBPASSWORD, useNewUrlParser: true,     useUnifiedTopology: true })
            console.log("MongoDB Connection is Successful")
        } catch(error){
            console.log(error);
            console.log("MongoDB Connection is failed")
        }
    }
db();
 


app.use('/', (req, res, next) => {
    console.log('A new request received at ' + new Date(Date.now()));
    next();
})

app.use('/', allRouter)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
