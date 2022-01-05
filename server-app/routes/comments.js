const router = require("express").Router();
const { validateComment, Comment } = require("../models/comment");
const auth = require("../middleware/auth");
const { Product } = require("../models/product");

router.get("/:productId", async (req, res) => {
    // #swagger.tags = ['Products', 'Comments']
    const comments = await Comment.find({ productId: req.params.productId });

    return res.send(comments);
});

router.post("/:productId", auth, async (req, res) => {
    // #swagger.tags = ['Products', 'Users', 'Comments']
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const { productId } = req.params;
    const { description } = req.body;

    const product = await Product.findOne({ _id: productId });
    if (!product || req.user._id !== product.owner.toHexString())
        return res.status(403).send('Invalid product.')

    const comment = await new Comment({
        productId,
        description,
        userId: req.user._id,
    }).save();

    return res.send(comment._id);
});

router.put("/", auth, async (req, res) => {
    // #swagger.tags = ['Products', 'Users', 'Comments']
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const { commentId, description } = req.body;

    const comment = await Comment.find({ _id: commentId, userId: req.user._id });
    if (!comment)
        return res.status(403).send('Invalid comment id.')

    await Comment.findOneAndUpdate({ _id: commentId }, { description });

    return res.send(commentId);
});

router.delete("/", auth, async (req, res) => {
    // #swagger.tags = ['Products', 'Users', 'Comments']
    const { commentId } = req.body;
    if (!commentId)
        return res.status(403).send('Invalid comment id.')

    const comment = await Comment.find({ _id: commentId, userId: req.user._id });
    if (!comment)
        return res.status(403).send('Invalid comment id.')

    await Comment.findOneAndDelete({ _id: commentId });

    return res.send(commentId);
});

module.exports = router;
