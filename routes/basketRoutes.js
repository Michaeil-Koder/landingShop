const basketControllers = require("../controllers/basketControllers")
const exprees = require("express")
const Router = exprees.Router()
const uploader = require("multer")
const storage = require("../utils/uploader")

const checkAdmin = require("../middleware/checkAdmin")
const checkColeader = require("../middleware/checkColeader")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")


Router.route("/finlizeBasket")
    .post(checkTokken, checkId, checkBodyId, basketControllers.finlizeBasket)
Router.route("/payVerification")//test for pay
    .get(checkTokken, checkId, basketControllers.payVerification)

Router.route("/:id/cancel")
    .delete(checkTokken, checkId, basketControllers.CancelOrder)

Router.route("/order")
    .get(checkTokken, basketControllers.getOrder)

Router.route("/getAll")
    .get(checkTokken, checkId, checkColeader, basketControllers.getAll)

Router.route("/user/:id")
    .get(checkTokken, checkId, checkColeader, basketControllers.getUserBasket)
    .delete(checkTokken, checkId, checkColeader, basketControllers.removeBasketUser)


module.exports = Router