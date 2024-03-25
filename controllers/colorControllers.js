const colorModel=require("../model/Colors")
const check =require("../validator/colorValidator")


exports.create=async(req,res)=>{
    try{
        const {name , remaining , price , size , product}=req.body
        const checkColor=check({name , remaining , price , size , product})
        if(checkColor!==true){
            return res.status(403).send(checkColor)
        }
        const createREs=(await colorModel.create({name , remaining , price , size , product}))
        res.status(201).send(createREs)
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}


exports.remove=async(req,res)=>{
    try{
        const {id}=req.params
        const findandDelete=await colorModel.findByIdAndDelete(id)
        if(!findandDelete){
            return res.status(404).send({message:"این رنگ یافت نشد"})
        }
        return res.send({message:"با موفقیت حذف شد"})
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}