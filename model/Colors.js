const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    remaining:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:mongoose.Types.ObjectId,
        ref:"Size",
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    },
},{timestamps:true})


const model=mongoose.model("Color",schema)

module.exports=model