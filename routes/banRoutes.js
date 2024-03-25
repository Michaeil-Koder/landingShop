const banControllers = require("../controllers/banControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")


Router.route("/user/:id")
    .post(checkTokken,checkId,checkAdmin,banControllers.ban)
    .delete(checkTokken,checkId,checkAdmin,banControllers.removeBan)


module.exports = Router