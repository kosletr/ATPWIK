const router = require("express").Router();
const validateComment = require("../../routes/validation/validateComment");
const db = require("../../startup/db");
const auth = require("../../middleware/auth");

router.get("/:productId", async (req, res) => {
    const { productId } = req.params;
    const comments = await db.getCommentsByProductId(productId);
    return res.send(comments);
});

router.post("/:productId", auth, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const { productId } = req.params;
    const { description } = req.body;

    const product = await db.getProductById(productId);
    if (!product) return res.status(403).send('Invalid product for the given id.')

    const commentInfo = { productId, description, userId: req.user._id };
    const comment = await db.createComment(commentInfo);

    return res.send(comment._id);
});

router.put("/:id", auth, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.message);

    const commentId = req.params.id;
    const { description } = req.body;

    const comment = await db.getCommentById(commentId);
    if (!comment) return res.status(404).send('Comment not found for this id.')

    await db.updateComment(commentId, description);
    return res.send(commentId);
});

router.delete("/:id", auth, async (req, res) => {
    const commentId = req.params.id;
    if (!commentId) return res.status(404).send('Comment not found for this id.')

    const comment = await db.getCommentById(commentId);
    if (!comment) return res.status(404).send('Comment not found for this id.')

    await db.deleteComment(commentId);
    return res.send(commentId);
});

module.exports = router;
