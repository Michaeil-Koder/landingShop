const categoryControllers = require("../controllers/categoryControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/")
    .get(categoryControllers.getAll)
Router.route("/:id")
    .put(checkTokken, checkId, checkAdmin, categoryControllers.update)

Router.route("/new")
    .post(checkTokken, checkId, checkAdmin, categoryControllers.newCat)

Router.route("/:id/remove")
    .delete(checkTokken, checkId, checkAdmin, categoryControllers.remove)


Router.route("/:href")
    .get(categoryControllers.product_cat)


module.exports = Router