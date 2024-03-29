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


Router.route("/product/:id/addBasket")
    .post(checkTokken, checkId, basketControllers.addToBasket)

Router.route("/:id")
    .delete(checkTokken, checkId, basketControllers.remove)
    .put(checkTokken, checkId, basketControllers.edit)

Router.route("/")
    .get(checkTokken, basketControllers.getBasket)

Router.route("/getAllBasket")
    .get(checkTokken, checkId, checkColeader, basketControllers.getAllBasket)

    Router.route("/user/:id")
    .get(checkTokken,checkId,checkColeader,basketControllers.getUserBasket)
    .delete(checkTokken,checkId,checkColeader,basketControllers.removeBasketUser)


module.exports = Router