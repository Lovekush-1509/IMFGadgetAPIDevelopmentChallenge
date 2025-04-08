const mongoose = require("mongoose");
const Gadget = require("./Gadgets");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    Gadgets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Gadget"
        },
    ],

    token:{
        type:String,
    },

    contactNo:{
        type:String,
    },
    
});


module.exports = mongoose.model("User",userSchema);