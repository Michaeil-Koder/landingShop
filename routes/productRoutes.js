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
    .post(checkTokken,checkId,checkAdmin,uploader({storage,limits:{fileSize:1024*1024*5}}).array("cover"),checkTokken,productControllers.create)


module.exports = Router