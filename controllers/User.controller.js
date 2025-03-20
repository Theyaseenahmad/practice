// import { body } from "express-validator"
import { LoginUser } from "../services/User.services.js";
import  jwt  from "jsonwebtoken";


export const Login = async(req,res)=>{
    try {
        const {Name, Password} = await req.body    // json data expected 1 wrong why body and not json
        console.log(Name , Password);
        // return res.status(200).json({Name,Password,message:"Tested OK"},);

        const newUser = await LoginUser({Name,Password});

        if(newUser){


            const token = await jwt.sign({Name,Password},process.env.JWT_SECRET,{expiresIn:"1h"}) // we will get newUser on jwt decoding !

            res.cookie("token",token,{
                httpOnly:true,  // only for browser 
                secure:true,  
                maxAge:60000 // 1 min for testing change after !
            })


            return res.status(201).json({message:"user created successfully",token});
        }else{
            return res.status(400).json({message:"cannot create user"});
        }
        

    } catch (error) {
        console.log("err:",error);
        res.status(500).json({message:error.message});
    }
}


export const Home = async(req,res)=>{
    return res.status(200).json({message:"hi You are verified G"});
}