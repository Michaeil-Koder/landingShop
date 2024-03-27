const colorControllers = require("../controllers/colorControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkColeader = require("../middleware/checkColeader")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/")
    .get(checkTokken,checkId,checkBodyId,checkColeader,colorControllers.getAll)

Router.route("/create")
    .post(checkTokken,checkId,checkBodyId,checkAdmin,colorControllers.create)
Router.route("/:id")
    .delete(checkTokken,checkId,checkBodyId,checkAdmin,colorControllers.remove)
    .get(checkTokken,checkId,checkBodyId,checkColeader,colorControllers.getOne)
    .put(checkTokken,checkId,checkBodyId,checkAdmin,colorControllers.update)


module.exports = Router