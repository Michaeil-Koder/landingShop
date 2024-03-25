const exprees = require("express")
const path =require("path")




exports.login=async(req=exprees.request,res=exprees.response)=>{
    try{
        res.sendFile(path.resolve(__dirname,"..","/views/login/index.html"))
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}