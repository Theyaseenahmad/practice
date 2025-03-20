import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true,
        default:"User"
    }
})

const User = mongoose.User || mongoose.model("User",UserSchema); //saved as Users or users

export default User;