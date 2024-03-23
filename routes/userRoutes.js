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
    .get(userControllers.getAll)

Router.route("/getMe")
    .get(checkTokken, checkId, userControllers.getMe)

Router.route("/login")
    .put(userControllers.login)

Router.route("/logout")
    .put(userControllers.logout)

Router.route("/:id")
    .put(checkTokken, checkId, checkAdmin, userControllers.Uplevel)
    .get(checkTokken, checkId, checkAdmin, userControllers.getOne)
    .delete(checkTokken, checkId, checkAdmin, userControllers.remove)


module.exports = Router