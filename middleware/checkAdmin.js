const { userModel } = require("../model/User")
const isAdmin = async (req, res, next) => {
    try {
        const { id } = req.body
        const resRole = await userModel.findById(id)
        if (!resRole) {
            return res.status(404).send({ message: "This User Not Found" })
        }
        if (resRole.role === "ADMIN") {
            next()
        } else {
            return res.status(422).send({ message: "This API Protect" })
        }
    }
    catch (err) {
        res.status(420).send(err)
    }
}

module.exports = isAdmin