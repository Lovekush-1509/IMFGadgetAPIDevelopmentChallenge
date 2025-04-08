const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next) =>{
    try{
        const token =  req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.json({
                success:false,
                message:"Token not found",
            });
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }catch(e){
            return res.json({
                success:false,
                message:"Error occured during token verification",
                error:e.message,
            });
        }

        next();

    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during auth middleware check",
            error:e.message,
        });
    }
}
