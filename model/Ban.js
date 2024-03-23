const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

const model=mongoose.model("Ban",schema)
module.exports=model