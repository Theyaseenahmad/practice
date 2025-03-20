import User from "../config/User.model.js"
import bcrypt from "bcryptjs";


export async function SignupUser ({Name,Password,Role}){
    try {

        console.log(Name,Password,Role);

        if(!Role){
            Role = "User";
        }


        const DoesUserAlreadyExist = await User.findOne({Name});

        if(DoesUserAlreadyExist){
            throw new Error("User already exists") ;// cond: assuming names to be diff
        }
        

        const HashedPassword = await bcrypt.hash(Password,10);
        const newUser = await User.create({Name,Password:HashedPassword,Role});

        if(newUser){
            return {Name:newUser.Name,Role};
        }else{
            throw new Error("cannot create user")
        }

    }catch(error) {
        throw new Error(error.message);
    }

}