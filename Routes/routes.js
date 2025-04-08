const express = require("express");
const router = express.Router();

const {
    getAllGadgets,
    addGadget,
    updateGadgetInformation,
    deleteGadget,
    gadgetWithStatus,
} = require("../Controllers/Gadgets");
    
const {
    selfDestruction,
} = require("../Controllers/SelfDestruct");

const {
    signUp,
    LogIn,
} = require("../Controllers/UserAuth");

const {
    auth,
} = require("../Midddlewares/Auth");



router.post('/sign-up',signUp);
router.post("/log-in",LogIn);


router.get('/get-all-gadgets',auth,getAllGadgets);
router.post('/add-gadget',auth,addGadget);
router.patch('/update-gadget',auth,updateGadgetInformation);
router.delete('/delete-gadget',auth,deleteGadget);
router.get('/',auth,gadgetWithStatus);



router.post('/:id/self-destruct',auth,selfDestruction);






module.exports = router;