import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const User = mongoose.User || mongoose.model("User",UserSchema); //saved as Users or users

export default User;