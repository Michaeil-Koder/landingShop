
const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.url)

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15
    },
    covers: {
        type: Array,
        required: true,
        minLength: 1,
        maxLength: 10
    },
    href: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
    },
    disCount: {
        type: Number,
        default: 0,
        required:false
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    remaining: {
        type: Number,
        required: true,
    },
    information: {
        type: Object,
        required: true,
    },
    option: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })

schema.virtual("CommentVirtual", {
    localField: "_id",
    ref: "Comment",
    foreignField: "product"
})
schema.virtual("ColorSize", {
    localField: "_id",
    ref: "Color",
    foreignField: "product"
})


const model = mongoose.model("Product", schema)

module.exports = model