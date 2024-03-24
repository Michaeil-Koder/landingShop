const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },

})

const model=mongoose.model("Ban",schema)
module.exports=model