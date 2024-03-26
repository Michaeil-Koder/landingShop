const mongoose=require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20
    },
    href:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20
    }
},{timestamps:true})

const model=mongoose.model("Category",schema)

module.exports=model