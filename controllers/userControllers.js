const userModel = require("../model/User")
const banModel = require("../model/Ban")
const moment = require("moment-jalaali")
const jwt = require("jsonwebtoken")
const registerCheck = require("../validator/userValidator")
require("dotenv").config()
const bcrypt = require("bcrypt")
const cookie = require("cookie")
const nodemailer = require("nodemailer")




exports.create = async (req, res) => {
    try {
        const { name, username, email, phone, password, confirmPassword } = req.body
        const check = registerCheck({ name, username, email, phone, password, confirmPassword })
        const regEx = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$", "g")
        if (check !== true) {
            return res.status(400).send(check)
        } else if (!regEx.test(phone)) {
            return res.status(400).send({ message: "لطفا شماره را صحیح وارد کنید" })
        }
        const finduser = await userModel.findOne({ $or: [{ email }, { phone }] })
        const HasBan=await banModel.findOne({$or:[{user:finduser._id},{email:finduser.email},{phone:finduser.phone}]})

        if (HasBan) {
            return res.status(401).send({ message: "کاربر بن شده است" })
        }
        if (finduser) {
            return res.status(400).send({ message: "این کاربر قبلا ثبت نام کرده است" })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const createdAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const updatedAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")

        const countUserModel = await userModel.countDocuments()//length

        const newUser = await userModel.create({ name, username, email, phone, password: hash, role: countUserModel > 0 ? "USER" : "ADMIN", createdAt, updatedAt })//create
        const userObj = newUser.toObject()

        const tokken = jwt.sign({//tokken
            id: newUser._id,
        }, process.env.JWT_SECURITY, {
            expiresIn: "5day"
        })
        delete userObj.password
        res.setHeader("Set-Cookie", cookie.serialize("tokken", tokken), { httpOnly: true, maxAge: 60 * 60 * 24 * 5 }).send({ user: userObj })

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "michael.zare.1382@gmail.com",
                pass: "cknh bkex lqvx bjii"
            },
        })
        const mailOptions = {
            from: "michael.zare.1382@gmail.com",
            to: userObj.email,
            subject: "ثبت نام موفقیت آمیز بود",
            text: `سلام ${userObj.name} به سایت ما خوش آمدی❤️`
        }
        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                throw new Error(err.message)
            }
        })
    } catch (err) {
        return res.status(err.status || 400).send(err.message || { message: "خطایی روی داده است" })
    }
}



exports.Uplevel = async (req, res) => {
    try {
        const {id}=req.params
        const finduser = await userModel.findById(id)
        if(!finduser){
            return res.status(404).send({message:"کاربری یافت نشد"})
        }else if(finduser.role==="ADMIN"){
            return res.status(400).send({message:"این کاربر با نقش ادمین در سایت ذخیره شده است"})
        }
        const HasBan=await banModel.findOne({$or:[{user:finduser._id},{email:finduser.email},{phone:finduser.phone}]})
        if(HasBan){
            return res.status(403).send({message:"این کاربر بن شده است ، لطفا آن را از بن خارج کنید"})
        }
        const updatedAt=moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const upUser=await userModel.findByIdAndUpdate(id,{role:"ADMIN",updatedAt}).select("-password -__v")
        res.send(upUser)
    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}


exports.Downgrade = async (req, res) => {
    try {
        const {id}=req.params
        const finduser=await userModel.findById(id)
        if(!finduser){
            return res.status(404).send({message:"کاربری یافت نشد"})
        }else if(finduser.role==="USER"){
            return res.status(403).send({message:"این کاربر با نقش یوزر در سایت ذخیره شده است"})
        }else if(req.body.user.createdAt>finduser.createdAt){
            return res.status(403).send({message:"شما مجاز به این درخواست نمی باشید"})
        }
        const updatedAt=moment().format("jYYYY/jMM/jDD HH:mm:ss")
        await userModel.findByIdAndUpdate(id,{role:'USER',updatedAt}).select("-password -__v")
        res.send({message:"کاربر از نقش ادمین به یوزر تنزل پیدا کرد"})
    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}




exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        const findOneUser = await userModel.findById(id, "-password")
        if (!findOneUser) {
            return res.status(404).send({ message: "کاربری یافت نشد" })
        }
        res.send(findOneUser)
    } catch (err) {
        return res.status(err.status || 400).send(err.message || { message: "خطایی روی داده است" })
    }
}
exports.getMe = async (req, res) => {
    try {
        const { _id } = req.body.user
        const finduser = await userModel.findById(_id, "-password")
        const HasBan = await banModel.findOne({ user: _id })
        if (HasBan) {
            return res.status(401).send({ message: "شما بن هستید" })
        } else if (!finduser) {
            return res.status(404).send({ message: "کاربری یافت نشد" })
        }
        res.send(finduser)
    } catch (err) {
        return res.status(err.status || 400).send(err.message || { message: "خطایی روی داده است" })
    }
}


exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        const finduser = await userModel.findById(id)
        if (!finduser) {
            return res.status(404).send({ message: "کاربری یافت نشد" })
        }else if(req.body.user.createdAt>finduser.createdAt && finduser.role==="ADMIN"){
            return res.status(400).send({ message: "شما نمی توانید ادمین قدیمی تر را حذف کنید" })
        }
        await userModel.findByIdAndDelete(id)
        res.send({message:"حذف با موفقیت انجام شد"})
    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}


exports.getAll = async (req, res) => {
    try {
        const id=req.body.user?._id
        const allUser=await userModel.find({_id:{$ne:id}},"-password -__v").lean().sort({_id:-1})
        if(allUser.length===0){
            res.status(404).send({message:"کاربری ایجاد نشده است"})
        }
        res.send(allUser)
    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}

exports.login = async (req, res) => {
    try {

    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}

exports.logout = async (req, res) => {
    try {

    } catch (err) {
        return res.status(err.status || 400).send({ message: "خطایی روی داده است" })
    }
}
