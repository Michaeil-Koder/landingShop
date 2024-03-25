const valid=require("fastest-validator")
const v=new valid()
const schema={
    title: {
        type: "string",
        required: true,
        min: 4,
        max: 15
    },
    href: {
        type: "string",
        required: true,
        min: 4,
        max: 20
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
        type: "array",
        required: true,
    },
    option: {
        type: "array",
        required: true,
    },
    $$strict:"remove"
}

const check=v.compile(schema)

module.exports=check