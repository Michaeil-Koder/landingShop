const categoryModel=require("../model/Category")
const check =require("../validator/categoryValidator")

exports.getAll=async(req,res)=>{
    try{
        const findAll = await categoryModel.find({},"-__v").lean()
        if(findAll.length===0){
            return res.status(404).send({message:"دسته بندی ایجاد نشده"})
        }
        return res.send(findAll)
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است."})
    }
}


exports.update=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,href}=req.body
        const find=await categoryModel.findById(id)
        if(title?.length<4 || title?.length>20){
            return res.status(403).send({message:"لطفا عنوان را در محدوده 4تا20 وارد کنید"})
        }else if(href?.length<4 || href?.length>20){
            return res.status(403).send({message:"لطفا لینک را در محدوده 4تا20 وارد کنید"})
        }else if(title===undefined&&href===undefined){
            return res.status(403).send({message:"لطفا یک فیلد را (href یا title)را وارد نمایید"})
        }else if(find.href===href){
            return res.status(403).send({message:"این لینک در دیتابیس موجود است"})
        }else if(find.title===title){
            return res.status(403).send({message:"این عنوان در دیتابیس موجود است"})
        }
        const resUpdate=await categoryModel.findByIdAndUpdate(id,{title,href})
        if(!resUpdate){
            return res.status(404).send({message:"این دسته بندی یافت نشد"})
        }
        res.send({message:"با موفقیت آپدیت شد"})
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است."})
    }
}


exports.newCat=async(req,res)=>{
    try{
        const {title , href}=req.body
        const checkBody=check({title,href})
        if(checkBody!==true){
            return res.status(403).send(checkBody)
        }
        const createRes=await categoryModel.create({title,href})
        res.status(201).send(createRes)
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است."})
    }
}



exports.remove=async(req,res)=>{
    try{
        const {id}=req.params
        const findAndRemove=await categoryModel.findByIdAndDelete(id)
        if(!findAndRemove){
            return res.status(404).send({message:"این دسته بندی یافت نشد"})
        }
        res.send({message:"با موفقیت حذف شد"})
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است."})
    }
}



exports.product_cat=async(req,res)=>{
    try{
        const {href}=req.params
        const findCat=await  categoryModel.findOne({href}).select("-__v")
        if (!findCat){
            return  res.status(404).send({message:"این دسته یافت نشد"})
        }
        return  res.send(findCat)
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است."})
    }
}