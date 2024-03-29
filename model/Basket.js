const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    number:{
        type:Number,
        required:true,
        minLength:1,
        maxLength:5
    },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
    },
})


const model=mongoose.model("Basket",schema)

module.exports=model