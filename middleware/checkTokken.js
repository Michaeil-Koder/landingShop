const jwt=require("jsonwebtoken")
require("dotenv").config()
const userModel=require("../model/User")
const banModel=require("../model/Ban")


const checkTokken=async(req,res,next)=>{
    try{
        const authHeader=req.header("Cookie")?.split("=")
        if(authHeader?.length!==2){
            return next()
        }else if(authHeader[1].length===0){
            return res.status(401).send({message:"لطفا وارد شوید یا ثبت کنید"})
        }
        const idTokken=jwt.verify(authHeader[1],process.env.JWT_SECURITY)
        const user=await userModel.findById(idTokken.id,"-password")
        const HasBan= await banModel.findOne({user:user._id})
        if(HasBan){
            return res.status(403).send({message:"متاسفیم شما توسط مدیر بن شده اید"})
        }
        req.body.user=user
        next()
    }catch(err){
        res.status(400).send(err)
    }
}


module.exports=checkTokken