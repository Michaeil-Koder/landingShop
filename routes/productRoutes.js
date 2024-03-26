const productControllers = require("../controllers/productControllers")
const exprees = require("express")
const Router = exprees.Router()
const uploader=require("multer")
const storage=require("../utils/uploader")

const checkAdmin = require("../middleware/checkAdmin")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/create")
    .post(checkTokken,checkId,checkAdmin,uploader({storage,limits:{fileSize:1024*1024*5}}).array("cover"),checkTokken,checkBodyId,productControllers.create)
Router.route("/getAll")
    .get(checkTokken,checkId,checkBodyId,checkAdmin,productControllers.getAll)

Router.route("/popular").get(productControllers.popularProduct)

Router.route("/:href/relatedProduct").get(productControllers.RelatedProduct)

Router.route("/:id").delete(checkTokken, checkAdmin, checkId, productControllers.remove)

Router.route("/:href")
    .get(productControllers.getOne)


module.exports = Router