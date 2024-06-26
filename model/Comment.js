const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    isAccept:{
        type:Boolean,
        default:false
    },
    score:{
        type:Number,
        minLength:1,
        maxLength:5,
        default:5
    },
    isAnswer:{//کامنت اصلی یا فرعی
        type:Boolean,
        default:false,
    },
    mainCommentID:{
        type:mongoose.Types.ObjectId,
        ref:"Comment",
        required:false
    },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
    },
})


const model=mongoose.model("Comment",schema)

module.exports=model