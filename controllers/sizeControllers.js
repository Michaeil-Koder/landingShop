const sizeModel = require("../model/Sizes")
const colorModel = require("../model/Colors")




exports.create = async (req, res) => {
    try {
        const {size}=req.body
        if(size.length===0||size===undefined){
            return res.status(400).send({message:"لطفا سایز را وارد کنید"})
        }
        const createRes=await sizeModel.create({name:size})
        res.status(201).send(createRes)
    } catch (err) {
        return res.status(400).send({ message: "خطایی روی داده است" })
    }
}
exports.remove = async (req, res) => {
    try {
        const {id}=req.params
        const findSize=await sizeModel.findById(id)
        if(!findSize){
            return res.status(404).send({message:"سایزی یافت نشد"})
        }
        await colorModel.deleteMany({size:id})
        await sizeModel.findByIdAndDelete(id)
        res.status(200).send({message:"حذف با موفقیت انجام شد"})
    } catch (err) {
        return res.status(400).send({ message: "خطایی روی داده است" })
    }
}