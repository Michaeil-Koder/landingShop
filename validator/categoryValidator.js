const valid=require("fastest-validator")
const v=new valid()
const schema={
    title:{
        type:"string",
        required:true,
        min:4,
        max:20
    },
    href:{
        type:"string",
        required:true,
        min:4,
        max:20
    },
    $$strict:"remove"
}

const check=v.compile(schema)

module.exports=check