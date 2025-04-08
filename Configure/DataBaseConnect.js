const mongoose = require("mongoose");
require('dotenv').config();

function connectDB(){
    console.log(process.env.DATABASE_URL)
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then (() =>{console.log("DATABASE CONNECTED SUCCESSFULLY")})
    .catch((e) =>{
        console.log(e.message,":DATABASE NOT CONNECTED")
        process.exit(1);
    })
}

module.exports = connectDB;