const productModel = require("../model/Product")
const moment = require("moment-jalaali")
const jwt = require("jsonwebtoken")
const productCheck = require("../validator/productValidator")
require("dotenv").config()
const bcrypt = require("bcrypt")
const cookie = require("cookie")
const nodemailer = require("nodemailer")
const fsPromises = require('fs').promises;
const path = require('path');

const deleteImg = async (req, res) => {
    if (req.file) {
        const imagePath = path.resolve(__dirname, '..', req.file.path);
        try {
            await fsPromises.unlink(`${imagePath}`);
        } catch (err) {
            console.log(err);
        }

    } else if (req.files) {
        req.files.forEach(async (file) => {
            try {
                const imagePath = path.resolve(__dirname, '..', file.path);
                await fsPromises.unlink(`${imagePath}`);
            } catch (err) {
                console.log(err);
            }
        })
    }
};


exports.create = async (req, res) => {
    try {
        let {title, href, description, disCount, category, information, option, user} = req.body
        disCount = Number(disCount)
        information = JSON.parse(information)
        option = JSON.parse(option)

        const check = productCheck({
            title,
            href,
            description,
            disCount: disCount ? disCount : 0,
            category,
            information,
            option
        })
        const uniqueHref = await productModel.findOne({href})
        const uniqueTitle = await productModel.findOne({title})
        if (check !== true) {
            await deleteImg(req, res)
            return res.status(405).send(check)
        } else if (uniqueHref) {
            await deleteImg(req, res)
            return res.status(403).send({message: "این لینک وجود دارد"})
        } else if (uniqueTitle) {
            await deleteImg(req, res)
            return res.status(403).send({message: "این عنوان وجود دارد"})
        }
        const covers = []
        req.files.forEach((file) => {
            covers.push(`/${file.filename}`)
        })
        const createdAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const updatedAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const newProduct = await productModel.create({
            title,
            href,
            covers,
            description,
            disCount: disCount ? disCount : 0,
            category,
            information,
            option,
            creator: user._id,
            createdAt,
            updatedAt
        })
        res.status(201).send(newProduct)
    } catch (err) {
        await deleteImg(req, res)
        return res.status(400).send(err.message || {message: "خطایی روی داده است"})
    }
}

exports.getAll = async (req, res) => {
    try {
        const findAll=await productModel.find({}).populate([{
            path:"ColorSize",
            select:"name remaining price size",
            populate: {path: "size",select:"name"}
        },{path:"category",select:"title href"},{path:"creator",select: "name username email"}])
        if (findAll.length===0){
            return  res.status(404).send({message:"محصولی یافت نشد"})
        }
        res.send(findAll)
    } catch (err) {
        return res.status(400).send(err.message||{message: "خطایی روی داده است"})
    }
}

exports.popularProduct = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}
exports.RelatedProduct = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}
exports.remove = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}
exports.getOne = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).send({message: "خطایی روی داده است"})
    }
}