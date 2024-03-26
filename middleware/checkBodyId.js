const mongoose=require("mongoose")

const fsPromises = require('fs').promises;
const path = require('path');

const deleteImg = async (req, res) => {
    if (req.file) {
        const imagePath = path.resolve(__dirname, '..', req.file.path);
        try {
            await fsPromises.unlink(`${imagePath}`);
        } catch (err) {
            console.log(err);
        }

    } else if (req.files) {
        req.files.forEach(async(file) => {
            try {
                const imagePath = path.resolve(__dirname, '..', file.path);
                await fsPromises.unlink(`${imagePath}`);
            } catch (err) {
                console.log(err);
            }
        })
    }
};

const checkBodyId = async(req, res, next) => {
    try {
        const { product, creator, category, mainCommentID, commentID, adminID , size} = req.body
        const { sessionID } = req.params
        if (product !== undefined && product !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(product)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "product Not Valid" })
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
        }else if (size !== undefined && size !== "") {
            const checkID = mongoose.Types.ObjectId.isValid(size)
            if (!checkID) {
                await deleteImg(req)
                return res.status(423).send({ message: "size Not Valid" })
            }
        }
        next()
    }
    catch (err) {
        return res.status(err.status || 400).send(err.message || { message: "مشکلی رخ داده" })
    }
}
module.exports = checkBodyId