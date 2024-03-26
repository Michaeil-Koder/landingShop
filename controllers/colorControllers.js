const colorModel = require("../model/Colors")
const check = require("../validator/colorValidator")


exports.create = async (req, res) => {
    try {
        const {name, remaining, price, size, product} = req.body
        const checkColor = check({name, remaining, price, size, product})
        if (checkColor !== true) {
            return res.status(403).send(checkColor)
        }
        const createREs = (await colorModel.create({name, remaining, price, size, product}))
        res.status(201).send(createREs)
    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}


exports.remove = async (req, res) => {
    try {
        const {id} = req.params
        const findandDelete = await colorModel.findByIdAndDelete(id)
        if (!findandDelete) {
            return res.status(404).send({message: "این رنگ یافت نشد"})
        }
        return res.send({message: "با موفقیت حذف شد"})
    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}


exports.getAll = async (req, res) => {
    try {
        const findAll = await colorModel.find({}).populate("size", "name").populate("product", "title href").lean()
        if (findAll.length === 0) {
            return res.status(404).json({message: "رنگی یافت نشد"})
        }
        res.send(findAll)
    } catch (e) {

    }
}


exports.getOne = async (req, res) => {
    try {
        const {id} = req.params
        const findColor = await colorModel.findById(id).populate("size", "name").populate("product", "title href")
        if (!findColor) {
            return res.status(400).send({message: "این رنگ یافت نشد"})
        }
        return res.send(findColor)
    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}


exports.update = async (req, res) => {
    try {
        const {name, remaining, price} = req.body
        const {id} = req.params
        if (typeof (name) !== "string" && name !== undefined) {
            return res.status(403).send({message: "لطفا رشته وارد کنید"})
        } else if (typeof (remaining) !== "number" && remaining !== undefined) {
            return res.status(403).send({message: "لطفا عدد وارد کنید"})
        } else if (typeof (price) !== "number" && price !== undefined) {
            return res.status(403).send({message: "لطفا عدد وارد کنید"})
        } else if (name?.length === 0) {
            return res.status(403).send({message: "لطفا مقداری را برای نام وارد کنید"})
        } else if (name === undefined && remaining === undefined && price === undefined) {
            return res.status(403).send({message: "لطفا مقداری را وارد کنید"})
        }
        const findandUpdate = await colorModel.findByIdAndUpdate(id, {name, remaining, price})
        if (!findandUpdate) {
            return res.status(400).send({message: "این رنگ یافت نشد"})
        }
        res.send({message:"با موفقیت آپدیت شد"})
    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}

