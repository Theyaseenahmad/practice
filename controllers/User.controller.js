// import { body } from "express-validator"
import { validationResult } from "express-validator";
import { SignupUser } from "../services/User.services.js";
import  jwt  from "jsonwebtoken";
import User from "../config/User.model.js";
import bcrypt from "bcryptjs"


export const Signup = async(req,res)=>{
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {Name, Password, Role} = req.body    // json data expected 1 wrong why body and not json
        // return res.status(200).json({Name,Password,message:"Tested OK"},);

        const newUser = await SignupUser({Name,Password,Role});

        if(newUser){
            return res.status(201).json({message:"user created successfully"});
        }else{
            return res.status(400).json({message:"cannot create user"});
        }
        

    } catch (error) {
        // console.log("err:",error);

        if(error.message === "User already exists"){
           return  res.status(409).json({message:error.message});
        }
       
        return res.status(500).json({message:error.message});
    }
}

export const Login = async(req,res)=>{
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        
        const {Name, Password} = req.body    // json data expected 1 wrong why body and not json
        // return res.status(200).json({Name,Password,message:"Tested OK"},);

        const ExistingUser = await User.findOne({Name});

        if(ExistingUser){
            const IsPasswordCorrect = await bcrypt.compare(Password,ExistingUser.Password)

            if(!IsPasswordCorrect){
                return res.status(400).json({message:"Incorrect Name or Password"});
            }

            const token = jwt.sign({Name,Role:ExistingUser.Role},process.env.JWT_SECRET,{expiresIn:"1h"});

            res.cookie('token',token,{
                httpOnly:true,
                secure:true,
                maxAge:3600000
            })

            return res.status(200).json({token,message:"login successful"})
    
        }else{
            return res.status(404).json({message:"user not found"});
        }

       
    
        

    } catch (error) {
        console.log("err:",error);
        res.status(500).json({message:error.message});
    }
}


export const Home = async(req,res)=>{
    return res.status(200).json({message:"hi You are verified G"});
}

export const Admin = async(req,res)=>{
    return res.status(200).json({message:"hi You are an Admin G"});
}