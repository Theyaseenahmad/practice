import User from "../config/User.model.js"
import bcrypt from "bcryptjs";


export async function LoginUser ({Name,Password}){
    try {

        const HashedPassword = await bcrypt.hash(Password,10);
        const newUser = await User.create({Name,Password:HashedPassword});

        if(newUser){
            return {Name:newUser.Name,Password:newUser.Password};
        }else{
            throw new Error("cannot create user")
        }

    }catch(error) {
        throw new Error("Internal server Error");
    }

}