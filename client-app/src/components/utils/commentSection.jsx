import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createComment, removeCommentById, updateCommentById } from "../../services/userService";
import Joi from "joi-browser";

function CommentSection({ data, user }) {

    const [comments, setComments] = useState([]);
    const history = useHistory();
    const { id: productId } = useParams();

    useEffect(() => setComments(data), [data]);

    async function handleSave(commentId, newDescription) {
        if (newDescription === "") {
            setComments(comments.filter(c => c.description !== ""));
            return;
        }
        try {
            if (commentId !== null)
                await updateCommentById(commentId, newDescription);
            else {
                await createComment(productId, newDescription);
                window.location.reload(true);
            }
        } catch (ex) {
            console.log(ex.response.data);
        }
    }

    async function handleDelete(commentId) {
        setComments(comments.filter(c => c._id !== commentId));
        await removeCommentById(commentId);
    }

    async function handleCreate() {
        if (user == null) {
            history.push("/login");
            return;
        }
        const newComment = {
            _id: null,
            userId: { username: user.username },
            productId,
            description: "",
            initEditState: true
        };
        setComments([...comments, newComment]);
    }

    return (
        <div className="comment-section">
            {
                comments.length === 0 &&
                <p style={{ alignSelf: "flex-start", marginBottom: "0" }}>Be the first one to comment this product.</p>
            }
            {
                comments.length !== 0 &&
                comments.map(c => (
                    <Comment
                        key={c._id}
                        data={c}
                        user={user}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                    />
                ))}
            <button className="btn btn-primary" onClick={handleCreate} style={{ alignSelf: "flex-end" }}>
                Add Comment
            </button>
        </div>
    )
}

function Comment({ data, user, handleSave, handleDelete }) {
    const [comment, setComment] = useState(data.description);
    const [inEditState, setInEditState] = useState(data.initEditState);
    const [errors, setErrors] = useState({});

    function validateProperty({ name, value }) {
        const schema = {
            [name]: Joi.string().min(10).max(100).required().label("Comment")
        };

        const obj = { [name]: value };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    function handleChange({ currentTarget: input }) {
        const errorMsg = validateProperty(input);
        setComment(input.value);
        if (errorMsg) errors[input.name] = errorMsg;
        else delete errors[input.name];

        setErrors(errors);
    };

    function handleFocus({ currentTarget: input }) {
        input.setSelectionRange(comment.length, comment.length);
    }

    function handleCancel() {
        window.location.reload(true);
    }

    async function toggleEditState() {
        setInEditState(!inEditState);
        if (inEditState)
            await handleSave(data._id, comment);
    }

    const renderEditText = () => {
        return (inEditState)
            ? (
                <textarea label="Comment" name="textarea" id={data._id} value={comment}
                    autoFocus onFocus={handleFocus}
                    onChange={handleChange}
                />
            )
            : (<p style={{ padding: "1rem" }} >{comment}</p>);
    }

    function getDateTime() {
        const dt = new Date(data.timestamp);
        const format = num => ("0" + num).slice(-2);
        const date = `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
        const time = `${format(dt.getHours())}:${format(dt.getMinutes())}`;
        return `${date} ${time}`;
    }

    return (
        <div className="comment">
            <div className="comment-borders">
                <div className="comment-body">
                    {renderEditText(comment)}
                </div>
                <div className="comment-footer">
                    {
                        <div>
                            <span style={{ color: "yellow", paddingRight: "0.5rem" }}>{data.userId.username}</span>
                            <span>{data.timestamp && getDateTime()}</span>
                        </div>
                    }
                    {
                        user && user.username === data.userId.username &&
                        <div className="comment-options">
                            <button
                                disabled={errors["textarea"]}
                                onClick={toggleEditState}>
                                {!inEditState ? "Edit" : "Save"}
                            </button>
                            {
                                !inEditState &&
                                <button
                                    disabled={errors["textarea"]}
                                    onClick={() => handleDelete(data._id)}>
                                    Delete
                                </button>
                            }
                            {
                                inEditState &&
                                <button onClick={() => handleCancel(data._id)}>Cancel</button>
                            }
                        </div>
                    }
                </div>
            </div>
            {errors["textarea"] && <div className="alert alert-danger">{errors["textarea"]}</div>}
        </div>
    )
}


export default CommentSection
