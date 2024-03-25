const valid=require("fastest-validator")
const v=new valid()
const schema={
    title: {
        type: "string",
        required: true,
        min: 4,
        max: 15,
        unique:true
    },
    href: {
        type: "string",
        required: true,
        min: 4,
        max: 20,
        unique:true
    },
    price: {
        type: "number",
        required: true,
    },
    disCount: {
        type: "number",
        required: false,
    },
    description: {
        type: "string",
        required: true,
    },
    category: {
        type: "string",
        required: false,
    },
    remaining: {
        type: "number",
        required: true,
    },
    information: {
        type: "object",
        required: true,
    },
    option: {
        type: "object",
        required: true,
    },
    sizes: {
        type: "object",
        required: true,
    },
    $$strict:"remove"
}

const check=v.compile(schema)

module.exports=check