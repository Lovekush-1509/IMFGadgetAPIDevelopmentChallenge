const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// signUP
exports.signUp = async(req,res) =>{
    try{
        const {
            lastName,
            firstName,
            contactNo="",
            password,
            confirmPassword,
            email,
        } = req.body;


        if(!lastName || !firstName  || !password || !confirmPassword || !email){
            return res.json({
                success:false,
                message:"All field are required......",
            });
        }

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"password and confirm password should be same",
            });
        }

        const isuserExist = await User.findOne({email:email});
        console.log(isuserExist);
        if(isuserExist){
            return res.json({
                success:false,
                message:"user already registered",
            });
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            lastName,
            firstName,
            contactNo,
            password:hashedPassword,
            email,
        });


        return res.json({
            success:true,
            message:"sign up successfully",
            data:user,
        });

    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during sign up",
            error:e.message,
        });
    }
}

// LogIn
exports.LogIn = async(req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }


        const userExist = await User.findOne({email});
        if(!userExist){
            return res.json({
                success:false,
                message:"User not found",
            });
        }

        if(await bcrypt.compare(password,userExist.password)){
            const payload = {
                email:userExist.email,
                id:userExist._id,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            userExist.token = token;
            userExist.password = undefined;

            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            return res.cookie("token",token,options).json({
                success:true,
                message:"Logged In succesfully",
                data:userExist
            });
        }else{
            return res.json({
                success:false,
                message:"Password is incorrect",
            });
        }



    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during Log in",
            error:e.message,
        });
    }
}

