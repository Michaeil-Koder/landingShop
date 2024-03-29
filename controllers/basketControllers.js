const productModel = require("../model/Product")
const colorModel = require("../model/Colors")
const basketModel = require("../model/Basket")
const moment = require("moment-jalaali")
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const url = require("url")
require("dotenv").config()




exports.finlizeBasket = async (req, res) => {
    try {
        const { colorID, Email, Mobile } = req.body
        if (colorID === undefined || colorID.length === 0) {
            return res.status(405).send({ message: "لطفا آیدی رنگ را وارد کنید" })
        }
        // check number send
        for (const id of colorID) {
            try {
                const Number=Object.values(id)[0]
                if (typeof (Number) !== "number" || Number.length === 0 || Number === undefined) {
                    return res.status(405).send({ message: "لطفا تعداد را وارد کنید" })
                } else if (Number <= 0 || Number > 5) {
                    return res.status(405).send({ message: "این مقدار قابل قبول نمی باشد" })
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }
//      findProductColor
        const findColorProduct=[]
        for (const id of colorID) {
            try {
                const findColor = await colorModel.findById(Object.keys(id)[0]).populate([{
                    path: "size",
                    select: "name"
                }, {
                    path: "product",
                    select: "title href disCount"
                }])
                if (!findColor) {
                    return res.status(404).send({ message: "این رنگ یافت نشد" })
                } else if (Object.values(id)[0] > findColor.remaining) {
                    return res.status(405).send({ message: `این تعداد رنگ ${findColor.name} از محصول ${findColor.product.title} یافت نشد` })
                }
                findColor.price=findColor.price*Object.values(id)
                findColorProduct.push(findColor)
            } catch (err) {
                return new Error(err.message);
            }
        }
//      Total price For pay
        let TotalPrice=0
        findColorProduct.forEach(product=>{
            TotalPrice+=product.price
        })
        const paymentRequest = {
            Amount: TotalPrice,
            CallbackURL: `${process.env.BASE_URL}/landing/basket/payVerification`,
            Email,
            Mobile,
        };
        const createPay = await zarinpal.PaymentRequest(paymentRequest)
        
        if (createPay.status === 100) {
            await basketModel.create({TotalPrice,createPay})
            res.redirect(createPay.url)
        }else{
            throw new Error(createPay)
        }
    } catch (err) {
        return res.status(400).send(err.message || { message: "خطایی روی داده است" })
    }
}

exports.payVerification = async (req, res) => {
    try {
        const paramsurl = url.parse(req.url).query.split("&")
        const Authority = paramsurl[0].split("=")[1]
        const Status = paramsurl[1].split("=")[1]
        const payVerifi = await zarinpal.PaymentVerification({
            Amount: '1050000', // In Tomans
            Authority,
        })
        res.send(payVerifi)
    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}




exports.remove = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}




exports.edit = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}






exports.getOrder = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}








exports.getAll = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}





exports.getUserBasket = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}






exports.removeBasketUser = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}