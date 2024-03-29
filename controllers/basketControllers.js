const productModel = require("../model/Product")
const colorModel = require("../model/Colors")
const basketModel = require("../model/Basket")
const moment = require("moment-jalaali")
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const url = require("url")




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
        const findColorProduct = await colorModel.findById(colorID).populate([{
            path: "size",
            select: "name"
        }, {
            path: "product",
            select: "title href disCount"
        }])
        if (!findColorProduct) {
            return res.status(404).send({ message: "این رنگ یافت نشد" })
        } else if (Number > findColorProduct.remaining) {
            return res.status(405).send({ message: "این تعداد از محصول در انبار موجود نیست" })
        }
        const paymentRequest = {
            Amount: findColorProduct.price * Number,
            CallbackURL: 'http://localhost:5000/landing/basket/payVerification',
            Description: 'پرداخت آزمایشی',
            Email,
            Mobile,
        };
        const createPay = await zarinpal.PaymentRequest(paymentRequest)

        if (createPay.status === 100) {
            res.redirect(createPay.url)
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