const validator=require("fastest-validator")
const validat=new validator()
const schema={
    body:{
        type:"string",
        required:true
    },
    isAccept:{
        type:"boolean",
        default:false,
    },
    score:{
        type:"number",
        min:1,
        max:5,
        default:5
    },
    isAnswer:{//کامنت اصلی یا فرعی
        type:"boolean",
        default:false
    }
}
const check=validat.compile(schema)

module.exports=check