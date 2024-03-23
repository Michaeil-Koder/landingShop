const jwt=require("jsonwebtoken")
require("dotenv").config()
const userModel=require("../model/User")


const checkTokken=async(req,res,next)=>{
    try{
        const authHeader=req.header("Cookie")?.split("=")
        if(authHeader?.length!==2){
            return next()
        }
        const idTokken=jwt.verify(authHeader[1],process.env.JWT_SECURITY)
        const user=await userModel.findById(idTokken.id,"-password")
        
        req.body.user=user
        next()
    }catch(err){
        res.status(400).send(err)
    }
}


module.exports=checkTokken