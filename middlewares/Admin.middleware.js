import  jwt  from "jsonwebtoken";

export const AdminMiddleware = async (req,res,next)=>{
    const token = await req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({message:"login first"});
    }

    const Userdata = jwt.verify(token,process.env.JWT_SECRET);

    const {Name,Role} = Userdata

    if(Role == "Admin"){
        console.log("authorized with data", Name);
        return next();
    }
    
    return res.status(403).json({message:"you are not allowed to access admin panel"})

   
}