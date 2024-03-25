const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:1,
        maxLength:5
    },
},{timestamps:true})


const model=mongoose.model("Size",schema)

module.exports=model