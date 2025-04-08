const {faker} = require("@faker-js/faker");
const Gadget = require('../Models/Gadgets');
const User = require("../Models/User");

exports.getAllGadgets = async(req,res) =>{
    try{
        // console.log("user:",req.user);
        const id = req.user.id;
        const list = await User.find({_id:id}).populate("Gadgets");
        console.log("list:",list)
        const listWithProb = list[0].Gadgets.map(data =>({
            ...data.toObject(),
            missionSuccessProbability:`${Math.floor(Math.random() * 41) + 60}%`,
        }));
        return res.json({
            success:true,
            data:listWithProb,
        })
    }catch(e){
        return res.json({
            success:false,
            message:e.message
        });
    }
}


exports.addGadget = async(req,res) =>{
    try{
        const id = req.user.id;
        const codename = faker.internet.username();
        const status = "Available";
        const newGadget = new Gadget({
            name:codename,
            status:status,
        });
        const savedData = await newGadget.save();
        const userData = await User.findByIdAndUpdate(id,{$push:{Gadgets:savedData._id}},{new:true}).populate("Gadgets");
        return res.status(201).json(userData);
    }catch(e){
        return res.json({
            message:e.message
        })
    }
}


exports.updateGadgetInformation = async(req,res) =>{
    try{
        const id = req.body.id;
        if(!id){
            return res.status(400).json({
                message:"id is required",
            });
        }
        const {name,status} = req.body;
        const updatingInf = {};
        if(name){
            updatingInf.name = name;
        }
        if(status){
            const requiredStatus = ['Available', 'Deployed', 'Destroyed', 'Decommissioned'];
            if(!requiredStatus.includes(status)){
                return res.status(400).json({
                    message:"Invalid status",
                });
            }
            updatingInf.status = status;
        }
        
        const updatedInf = await Gadget.findByIdAndUpdate({_id:id},updatingInf,{new:true});
        if(!updatedInf){
            return res.json({
                message:"Gadget not found",
            });
        }

        return res.json(
            updatedInf
        )

    }catch(e){
        return res.json({
            message:e.message
        })
    }
}

exports.deleteGadget = async(req,res) =>{
    try{
        const id = req.body.id;
        if(!id){
            return res.status(400).json({
                message:"id is required",
            });
        }

        const deletedGadget = await Gadget.findByIdAndUpdate({_id:id},{status:"Decommissioned",decommissionedAt:Date.now()},{new:true});
        if(!deletedGadget){
            return res.status(400).json({
                message:"No Gadget Found",
            });
        }
        return res.json(deletedGadget);
    }catch(e){
        return res.json({
            message:e.message
        })
    }
}


exports.gadgetWithStatus = async(req,res) =>{
    try{
        const {status} = req.query;
        const id = req.user.id;
        if(!status){
            return res.json({
                message:"Status is required"
            });
        }
        const statusGadget = await User.find({_id:id}).populate("Gadgets");

        const gadgetWithst = statusGadget[0].Gadgets.filter(val => val.status === status);

        if(!gadgetWithst){
            return res.json("No Gadget is found with given status");
        }
        return res.json(gadgetWithst);

    }catch(e){
        return res.json({
            message:e.message
        })
    }
}