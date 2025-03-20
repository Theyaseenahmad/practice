import  jwt  from "jsonwebtoken";

export const authMiddleware = async (req,res,next)=>{
    const token = await req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({message:"login first"});
    }

    const Userdata = await jwt.verify(token,process.env.JWT_SECRET);

    const {Name,Password} = Userdata
    

    console.log("authorized with data", Name, Password);

    next();
}