const Gadget = require("../Models/Gadgets");

function generateConfirmationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


exports.selfDestruction = async(req,res) =>{
    try{
        const {id} = req.params;
        const DestroyedGadget = await Gadget.findByIdAndUpdate({_id:id},{status:"Destroyed"},{new:true});
        if(!DestroyedGadget){
            return res.json({
                message:"Gadget not found",
            });
        }

        const code = generateConfirmationCode();

        return res.json(`Self-destruct sequence initiated for gadget name as "${DestroyedGadget.name}". with code ${code}`);

    }catch(e){
        return res.json({
            message:e.message
        });
    }
}