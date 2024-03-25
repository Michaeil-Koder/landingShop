const sizeControllers = require("../controllers/sizeControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/create")
    .post(checkTokken,checkId,checkAdmin,sizeControllers.create)
Router.route("/:id/remove")
    .delete(checkTokken,checkId,checkAdmin,sizeControllers.remove)


module.exports = Router