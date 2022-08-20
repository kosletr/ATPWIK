const mongoose = require("mongoose");

const Comment = mongoose.model(
    "comment",
    new mongoose.Schema({
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
            required: true,
        },
        description: {
            type: String,
            minlength: 10,
            maxlength: 100,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true
        }
    })
);

function deleteComment(commentId) {
    return Comment.findOneAndDelete({ _id: commentId });
}

function updateComment(commentId, description) {
    return Comment.findOneAndUpdate({ _id: commentId }, { description });
}

function getCommentById(commentId) {
    return Comment.find({ _id: commentId });
}

function getCommentsByProductId(productId) {
    return Comment
        .find({ productId })
        .populate({ path: "userId", select: "username -_id" })
        .select("-__v");
}

function createComment(commentInfo) {
    return new Comment(commentInfo).save();
}

module.exports = {
    deleteComment,
    updateComment,
    getCommentById,
    getCommentsByProductId,
    createComment
};
