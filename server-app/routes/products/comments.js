const router = require("express").Router();
const { validateComment, Comment } = require("../../models/comment");
const auth = require("../../middleware/auth");
const { Product } = require("../../models/product");

router.get("/:productId", async (req, res) => {
    const comments = await Comment
        .find({ productId: req.params.productId })
        .populate({ path: "userId", select: "username -_id" })
        .select("-__v");

    return res.send(comments);
});

router.post("/:productId", auth, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const { productId } = req.params;
    const { description } = req.body;

    const product = await Product.findOne({ _id: productId });
    if (!product)
        return res.status(403).send('Invalid product.')

    const comment = await new Comment({
        productId,
        description,
        userId: req.user._id,
    }).save();

    delete comment.___v;
    return res.send(comment);
});

router.put("/:id", auth, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const { id: _id } = req.params;
    const { description } = req.body;

    const comment = await Comment.find({ _id, userId: req.user._id });
    if (!comment)
        return res.status(403).send('Invalid comment id.')

    await Comment.findOneAndUpdate({ _id }, { description });
    return res.send(_id);
});

router.delete("/:id", auth, async (req, res) => {
    const { id: _id } = req.params;
    if (!_id)
        return res.status(403).send('Invalid comment id.')

    const comment = await Comment.find({ _id, userId: req.user._id });
    if (!comment)
        return res.status(403).send('Invalid comment id.')

    await Comment.findOneAndDelete({ _id });
    return res.send(_id);
});

module.exports = router;
