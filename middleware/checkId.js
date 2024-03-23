const mongoose=require("mongoose")


const checkId = (req, res , next) => {
    const { _id } = req.body.user
    const ParamsId=req.params.id
    if(_id!==undefined){
        const isValidId = mongoose.Types.ObjectId.isValid(_id)
        if (!isValidId) {
            return res.status(401).send({ message: "This Id Not Valid" })
        }
    }else{
        return res.status(300).send({message:"Please LogIn Or SignIn"})
    }
    if(ParamsId!==undefined){
        const isValidParamsId = mongoose.Types.ObjectId.isValid(ParamsId)
        if (!isValidParamsId) {
            return res.status(401).send({ message: "This Id Params Not Valid" })
        }
    }
    next()
}
module.exports=checkId