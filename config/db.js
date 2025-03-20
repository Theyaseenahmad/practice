import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("connected to DB !!!");
            
        }).catch((err)=>{
            throw new Error(err.message)
        })

    } catch (error) {
        console.log("error (manual):",error);
        res.status(500).json({message:error.message})
    }
}
export default connectDB;