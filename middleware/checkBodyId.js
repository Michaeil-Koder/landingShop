const { mongoose } = require("../model/User")

const fsPromises = require('fs').promises;
const path = require('path');

deleteImg = async (req, res) => {
    if (req.file) {
        const imagePath = path.resolve(__dirname, '..', req.file.path);
        try {
            await fsPromises.unlink(`${imagePath}`);
        } catch (err) {
            console.log(err);
        }

    }
};

const checkBodyId = async(req, res, next) => {
    try {
        const { courseID, creator, category, mainCommentID, commentID, adminID } = req.body
        const { sessionID } = req.params
        if (courseID !== undefined && courseID !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(courseID)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "courseID Not Valid" })
            }
        } else if (creator !== undefined && creator !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(creator)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "creator Not Valid" })
            }
        } else if (category !== undefined && category !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(category)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "category Not Valid" })
            }
        } else if (sessionID !== undefined && sessionID !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(sessionID)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "sessionID Not Valid" })
            }
        } else if (mainCommentID !== undefined && mainCommentID !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(mainCommentID)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "mainCommentID Not Valid" })
            }
        } else if (commentID !== undefined && commentID !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(commentID)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "commentID Not Valid" })
            }
        } else if (adminID !== undefined && adminID !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(adminID)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "adminID Not Valid" })
            }
        }
        next()
    }
    catch (err) {
        return res.status(err.status || 400).send(err.message || { message: "مشکلی رخ داده" })
    }
}
module.exports = checkBodyId