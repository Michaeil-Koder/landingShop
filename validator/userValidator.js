const valid=require("fastest-validator")
const v=new valid()
const schema={
    name:{
        type:"string",
        min:4,
        required:true
    },
    username:{
        type:"string",
        min:8,
        max:16,
        required:true
    },
    email:{
        type:"email",
        required:true
    },
    phone:{
        type:"string",
        min:10,
        max:13,
        required:true
    },
    password:{
        type:"string",
        min:8,
        required:true
    },
    confirmPassword:{
        type:"equal",
        field:"password",
        required:true
    },
    $$strict:"remove"
}

const check=v.compile(schema)

module.exports=check