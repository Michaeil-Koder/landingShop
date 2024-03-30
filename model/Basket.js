const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema=new mongoose.Schema({
    TotalPrice:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
    },
    Mobile:{
        type:String,
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        default:"paid"
    },
    createPay:{
        type:Object,
        required:true,
    },
    Order:{
        type:Array,
        required:true,
    },
    RefID:{
        type:Number,
        default:12345678
    }
},{timestamps:true})


const model=mongoose.model("Basket",schema)

module.exports=model