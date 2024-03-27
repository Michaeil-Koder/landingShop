const banControllers = require("../controllers/banControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkColeader = require("../middleware/checkColeader")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")


Router.route("/user/:id")
    .post(checkTokken,checkId,checkColeader,banControllers.ban)
    .delete(checkTokken,checkId,checkColeader,banControllers.removeBan)


module.exports = Router