const userControllers = require("../controllers/userControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")


Router.route("/register")
    .post(userControllers.create)


Router.route("/getAll")
    .get(checkTokken, checkId, checkAdmin, userControllers.getAll)

Router.route("/getMe")
    .get(checkTokken, checkId, userControllers.getMe)

Router.route("/login")
    .post(checkTokken, checkId,userControllers.login)

Router.route("/logout")
    .post(checkTokken, checkId,userControllers.logout)

Router.route("/:id/Downgrade")
    .put(checkTokken,checkId,checkAdmin,userControllers.Downgrade)


Router.route("/:id")
    .put(checkTokken, checkId, checkAdmin, userControllers.Uplevel)
    .get(checkTokken, checkId, checkAdmin, userControllers.getOne)
    .delete(checkTokken, checkId, checkAdmin, userControllers.remove)


module.exports = Router