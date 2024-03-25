const userModel = require("../model/User")
const banModel = require("../model/Ban")
const moment = require("moment-jalaali")
const jwt = require("jsonwebtoken")
const registerCheck = require("../validator/userValidator")
require("dotenv").config()
const bcrypt = require("bcrypt")
const cookie = require("cookie")
const nodemailer = require("nodemailer")


exports.ban=async(req,res)=>{
    try{
        const {id}=req.params
        const {user}=req.body
        const HasBan=await banModel.findOne({user:id})
        const finduser=await userModel.findById(id)
        if(HasBan){
            return res.status(403).send({message:"این کاربر قبلا توسط مدیر بن شده است."})
        }else if(user.createdAt>finduser.createdAt && finduser.role==="ADMIN"){
            return res.status(403).send({message:"شما مجاز به انجام این عملیات نیستید"})
        }
        // timestamps persian
        const createdAt=moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const updatedAt=moment().format("jYYYY/jMM/jDD HH:mm:ss")

        const banRes=await banModel.create({user:finduser._id,email:finduser.email,phone:finduser.phone,createdAt,updatedAt})
        res.send(banRes)
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}


exports.removeBan=async(req,res)=>{
    try{
        const {id}=req.params
        const HasBan=await banModel.findOneAndDelete({user:id})
        if(!HasBan){
            return res.status(404).send({message:"این کاربر در لیست بن شدگان وجود ندارد"})
        }

        res.send({message:"کاربر با موفقیت از بن خارج شد"})
    }catch(err){
        return res.status(400).send({message:"خطایی روی داده است"})
    }
}