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
        const { colorID, user } = req.body
        if (colorID === undefined || colorID.length === 0) {
            return res.status(405).send({ message: "لطفا آیدی رنگ را وارد کنید" })
        }
        // check number send
        for (const id of colorID) {
            try {
                const Number = Object.values(id)[0]
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
        const findColorProduct = []
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
                findColor.price = findColor.price * Object.values(id)
                findColorProduct.push(findColor)
            } catch (err) {
                return new Error(err.message);
            }
        }
        //      Total price For pay
        let TotalPrice = 0
        findColorProduct.forEach(product => {
            TotalPrice += product.price
        })
        const paymentRequest = {
            Amount: TotalPrice,
            CallbackURL: `${process.env.BASE_URL}/landing/basket/payVerification`,
            Description: 'A Payment from Node.JS',
            Email:user.email,
            Mobile:user.phone,
        };
        const createPay = await zarinpal.PaymentRequest(paymentRequest)
        if (createPay.status === 100) {
            await basketModel.create({ TotalPrice, createPay, Order: colorID ,creator:user._id})
            res.redirect(createPay.url)
        } else {
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
        const findOrder = await basketModel.findOne({ "createPay.authority": Authority })
        if (!findOrder) {
            return res.status(403).send({ message: "تراکنش با خطا مواجه شده است" })
        }
        const payVerifi = await zarinpal.PaymentVerification({
            Amount: findOrder.TotalPrice, // In Tomans
            Authority: findOrder.createPay.authority,
        })
        if (payVerifi.status !== 100) {
            await basketModel.deleteOne({ _id: findOrder._id })
            return res.status(400).send({ message: "مشکلی در پرداخت وجود دارد در صورت کسر وجه مبلغ پرداختی تا 72 ساعت به حساب بر میگردد" })
        }

        findOrder.Order.forEach(async (order) => {
            try {
                const findColor = await colorModel.findByIdAndUpdate(Object.keys(order), { $inc: { remaining: -(Object.values(order)) }, updatedAt: new Date(), RefID: payVerifi.RefID })
            } catch (err) {
                return res.status(400).send({ message: "خطایی وجود دارد" })
            }
        })

        res.status(201).send({
            RefID:payVerifi.RefID,
            id:findOrder._id
        })

    } catch (err) {
        return res.status(400 || err.status).send(err.message || { message: "خطایی روی داده است" })
    }
}




exports.CancelOrder = async (req, res) => {
    try {
        const {id}=req.params
        const findBasket=await basketModel.findById(id)
        if(!findBasket){
            return res.status(404).send({message:"Basket Not Found"})
        }else if(Date.parse(findBasket.createdAt)+(24*60*60*1000)<new Date()){
            return res.status(403).send({message:"مهلت شما برای لغو تمام شده است"})
        }else if(findBasket.status==="cancel"){
            return res.status(403).send({message:"سفارش قبلا لغو شده است"})
        }

        findBasket.Order.forEach(async (order) => {
            try {
                const findColor = await colorModel.findByIdAndUpdate(Object.keys(order), { $inc: { remaining: +(Object.values(order)) }, updatedAt: new Date()})
                if(!findColor){
                    return res.status(404).send({message:"Tihs Product Not Found"})
                }
            } catch (err) {
                return res.status(400).send({ message: "خطایی وجود دارد" })
            }
        })

        await basketModel.updateOne({_id:id},{status:"cancel",updatedAt:new Date()})

        return res.status(200).send({message:"سفارش لغو شد مبلغ پرداختی به حساب شما تا 24 ساعت برمیگردد"})


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