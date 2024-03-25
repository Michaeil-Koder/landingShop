const pageControllers = require("../controllers/pageControllers.js")
const exprees = require("express")
const Router = exprees.Router()
const uploader=require("multer")
const storage=require("../utils/uploader")

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/page/login")
    .get(pageControllers.login)
Router.route("/page/404")
    .get(pageControllers.notFound)


module.exports = Router