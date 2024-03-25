const valid=require("fastest-validator")
const v=new valid()
const schema={
    name:{
        type:"string",
        required:true
    },
    remaining:{
        type:"number",
        required:true
    },
    price:{
        type:"number",
        required:true
    },
    size:{
        type:"string",
        required:true
    },
    product:{
        type:"string",
        required:true
    },
    $$strict:"remove"
}

const check=v.compile(schema)

module.exports=check