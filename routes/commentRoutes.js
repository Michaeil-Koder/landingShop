const commentControllers = require("../controllers/commentControllers")
const exprees = require("express")
const Router = exprees.Router()

const checkAdmin = require("../middleware/checkAdmin")
const checkColeader = require("../middleware/checkColeader")
const checkBodyId = require("../middleware/checkBodyId")
const checkId = require("../middleware/checkId")
const checkTokken = require("../middleware/checkTokken")

Router.route("/:href")
    .post(checkTokken,checkId,commentControllers.newComment)
    .get(checkTokken,checkId,checkColeader,commentControllers.getComments)

Router.route("/:id")
    .put(checkTokken,checkId,checkColeader,commentControllers.AcceptComment)
    .delete(checkTokken,checkId,checkColeader,commentControllers.DelComment)

module.exports = Router