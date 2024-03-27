const valid = require("fastest-validator")
const v = new valid()
const schema = {
    description: {
        type: "string",
        optional:true
    },
    information: {
        type: "object",
        optional:true
    },
    option: {
        type: "object",
        optional:true
    },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check