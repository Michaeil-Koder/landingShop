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

deleteImg = async (req, res) => {
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
        let { title, href, price,sizes, description, disCount, category, remaining, information, option, user } = req.body
        price = Number(price)
        disCount = Number(disCount)
        remaining = Number(remaining)
        information = JSON.parse(information)
        sizes = JSON.parse(sizes)
        option = JSON.parse(option)

        const check = productCheck({ title,sizes, href, price, description, disCount: disCount ? disCount : 0, category, remaining, information, option })
        if (check !== true) {
            await deleteImg(req, res)
            return res.status(405).send(check)
        }
        const covers = []
        req.files.forEach((file) => {
            covers.push(`/products/covers/${file.filename}`)
        })
        const createdAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const updatedAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const newProduct = await productModel.create({ title, href, price, covers, description, disCount: disCount ? disCount : 0, category, remaining, information, option, sizes ,creator: user._id, createdAt, updatedAt })
        res.status(201).send(newProduct)
    } catch (err) {
        await deleteImg(req, res)
        return res.status(400).send(err.message || { message: "خطایی روی داده است" })
    }
}

exports.balhbalh = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).send({ message: "خطایی روی داده است" })
    }
}