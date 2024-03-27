const valid = require("fastest-validator")
const v = new valid()
const schema = {
    description: {
        type: "string",
        required: false,
    },
    information: {
        type: "object",
        required: false,
    },
    option: {
        type: "object",
        required: false,
    },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check