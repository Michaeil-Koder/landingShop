const exprees = require("express")
const path =require("path")




exports.login=async(req=exprees.request,res=exprees.response)=>{
    try{
        res.sendFile(path.join(__dirname,"../views/login/login.html"))
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}
exports.notFound=async(req=exprees.request,res=exprees.response)=>{
    try{
        res.sendFile(path.join(__dirname,"../views/404page/index.html"))
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}