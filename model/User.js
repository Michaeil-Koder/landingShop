const mongoose=require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema = new mongoose.Schema({
    name:{
        type:String,
        minLength:4,
        required:true
    },
    username:{
        type:String,
        minLength:8,
        maxLength:16,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        minLength:10,
        maxLength:13,
        required:true
    },
    password:{
        type:String,
        minLength:8,
        required:true
    },
    role:{
        type:String,
        default:"USER"
    },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
    },

})

const model= mongoose.model("User",schema)

module.exports=model