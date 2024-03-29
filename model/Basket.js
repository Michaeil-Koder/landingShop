const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    TotalPrice:{
        type:Number,
        required:true
    },
    createPay:{
        type:Object,
        required:true,
    },
},{timestamps:true})


const model=mongoose.model("Basket",schema)

module.exports=model