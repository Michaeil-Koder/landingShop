const userControllers = require("../controllers/userControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkColeader = require("../middleware/checkColeader")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")


Router.route("/register")
    .post(userControllers.create)


Router.route("/getAll")
    .get(checkTokken, checkId, checkColeader, userControllers.getAll)

Router.route("/getMe")
    .get(checkTokken, checkId, userControllers.getMe)

Router.route("/login")
    .post(userControllers.login)

Router.route("/logout")
    .post(checkTokken, checkId,userControllers.logout)

Router.route("/:id/Downgrade")
    .put(checkTokken,checkId,checkColeader,userControllers.Downgrade)


Router.route("/:id")
    .put(checkTokken, checkId, checkAdmin, userControllers.Uplevel)
    .get(checkTokken, checkId, checkColeader, userControllers.getOne)
    .delete(checkTokken, checkId, checkColeader, userControllers.remove)


module.exports = Router