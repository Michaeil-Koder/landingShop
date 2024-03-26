const valid = require("fastest-validator")
const v = new valid()
const schema = {
    title: {
        type: "string",
        required: true,
        min: 4,
        max: 40,
        unique: true
    },
    href: {
        type: "string",
        required: true,
        min: 4,
        max: 50,
        unique: true
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
    information: {
        type: "object",
        required: true,
    },
    option: {
        type: "object",
        required: true,
    },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check