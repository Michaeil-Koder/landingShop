const userModel = require("../model/User")
const banModel = require("../model/Ban")
const productModel = require("../model/Product")
const commentModel = require("../model/Comment")
const moment = require("moment-jalaali")
const check = require("../validator/commentValidator")

exports.newComment = async (req, res) => {
    try {
        const { user, body, score, isAnswer, mainCommentID } = req.body
        const createAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const updateAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        const checkComment = check({ body, score, isAnswer, mainCommentID })

        if (checkComment !== true) {
            return res.status(405).send(checkComment)
        }

        const product = await productModel.findOne({ href: req.params.href }, "_id -id")

        if (!product) {
            return res.status(404).send({ message: "این محصول یافت نشد" })
        }
        if (!isAnswer) {
            const resCreate = await commentModel.create({
                body,
                product,
                score,
                creator: user.id,
                updateAt,
                createAt
            })
            return res.status(201).send({
                _id: resCreate._id,
                body: resCreate.body,
                creator: resCreate.creator,
                ProductHref: resCreate.product.href,
                score: resCreate.score,
                isAnswer: resCreate.isAnswer
            })
        }
        const findComment = await commentModel.findById(mainCommentID)
        if (!findComment) {
            return res.status(404).send({ message: "این کامنت یافت نشد" })
        }
        const resCreate = await commentModel.create({
            body,
            product,
            score,
            creator: user.id,
            isAnswer,
            mainCommentID,
            updateAt,
            createAt
        })
        return res.status(201).send({
            _id: resCreate._id,
            body: resCreate.body,
            creator: resCreate.creator,
            ProductHref: resCreate.product.href,
            score: resCreate.score,
            isAnswer: resCreate.isAnswer,
            mainCommentID: resCreate.mainCommentID
        })

    } catch (err) {
        return res.status(err.status || 400).send(err)
    }
}


exports.getComments = async (req, res) => {
    try {
        const product = await productModel.findOne({ href: req.params.href })
        let AllComment = await commentModel.find({ product: product._id }).populate("creator", "username role").populate("product","title href").lean()
        if (!product) {
            return res.status(404).send({ message: "این صفحه یافت نشد" })
        }
        const newComment = []
        for (const comment of AllComment) {
            if(!comment.isAnswer){
                const allReplies = [];
                const directReplies = await commentModel.find({ mainCommentID: comment._id }).populate("creator","name username").exec();

                async function addReplies(reply) {
                    try {
                        allReplies.push(reply);
                        const subReplies = await commentModel.find({ mainCommentID: reply._id }).populate("creator","name username").exec();
                        for (const subReply of subReplies) {
                            await addReplies(subReply);
                        }
                    } catch (err) {
                        return res.status(400).send(err.message)
                    }
                }

                for (const directReply of directReplies) {
                    await addReplies(directReply);
                }
                newComment.push({ ...comment, answer: allReplies })
            }
        }
        res.send(newComment)

        // const CommentByAnswer = []
        // AllComment.forEach(comment => {
        //     const AnswerCommentArray = []
        //     AllComment.forEach(AnswerComment => {
        //         if (AnswerComment.isAnswer) {
        //             if (String(comment._id) === String(AnswerComment.mainCommentID._id)) {
        //                 AnswerCommentArray.push(AnswerComment)
        //             }
        //         }
        //     })
        //     if (!comment.isAnswer) {
        //         CommentByAnswer.push({...comment, AnswerComment: AnswerCommentArray})
        //     }
        // })
        // res.send(CommentByAnswer)
    } catch (err) {
        return res.status(err.status || 400).send(err.message)
    }
}


exports.AcceptComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(422).send({ message: "Comment Not Found" })
        } else if (comment.isAccept) {
            return res.status(422).send({ message: "This Comment Is Accept" })
        }
        const updateAt = moment().format("jYYYY/jMM/jDD HH:mm:ss")
        await commentModel.updateOne({ _id: id }, { isAccept: true, updateAt })
        res.send({ message: "Comment Is Accepted" })
    } catch (err) {
        return res.status(err.status || 400).send(err)
    }

}


exports.DelComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await commentModel.findByIdAndDelete(id)
        if (!comment) {
            return res.status(404).send({ message: "Comment Not Found" })
        }
        await commentModel.deleteMany({mainCommentID:comment._id})
        res.status(200).send({ message: "Delete Successfully" })

    } catch (err) {
        return res.status(err.status || 400).send(err)
    }

}
