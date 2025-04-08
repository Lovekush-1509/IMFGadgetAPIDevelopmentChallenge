const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },

    status: {
        type: String,
        enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
        default: 'Available'
    },
    decommissionedAt: {
        type:Date,
    }
})

const gadget = mongoose.model("Gadget",gadgetSchema);
module.exports = gadget;