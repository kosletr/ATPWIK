import { useEffect, useState } from "react";
import { removeCommentById, updateCommentById } from "../../services/userService";

function CommentSection({ data, user }) {

    console.log(data);
    const [comments, setComments] = useState([]);


    useEffect(() => setComments(data), [data]);

    async function handleSave(commentId, newComment) {
        try {
            await updateCommentById(commentId, newComment);
        } catch (ex) {
            console.log(ex.response.data);
        }
    }

    async function handleDelete(commentId) {
        setComments(comments.filter(c => c._id !== commentId));
        await removeCommentById(commentId);
    }

    async function handleCreate() {
        alert('Not implemented yet.');
    }

    return (
        <div className="comment-section">
            {comments.map(c => (
                <Comment key={c._id} data={c} user={user} handleSave={handleSave} handleDelete={handleDelete} />
            ))}
            <button className="btn btn-primary" onClick={handleCreate} style={{ alignSelf: "flex-end" }}>
                Add Comment
            </button>
        </div>
    )
}

function Comment({ data, user, handleSave, handleDelete }) {
    const [comment, setComment] = useState(data.description);
    const [inEditState, setInEditState] = useState(false);

    function handleChange({ currentTarget: input }) {
        setComment(input.value);
    };

    function handleFocus({ currentTarget: input }) {
        input.setSelectionRange(comment.length, comment.length);
    }

    async function toggleEditState() {
        setInEditState(!inEditState);
        if (inEditState)
            await handleSave(data._id, comment);
    }

    const renderEditText = () => {
        return (inEditState)
            ? (
                <textarea id={data._id} value={comment}
                    autoFocus onFocus={handleFocus}
                    onChange={handleChange}
                />
            )
            : (<p style={{ padding: "1rem" }} >{comment}</p>);
    }

    return (
        <div className="comment">
            <div className="comment-borders">
                <div className="comment-body">
                    {renderEditText(comment)}
                </div>
                <div className="comment-footer">
                    <span>{data.userId.username}</span>
                    {
                        user.username === data.userId.username &&
                        <div className="comment-options">
                            <button onClick={toggleEditState}>
                                {!inEditState ? "Edit" : "Save"}
                            </button>
                            <button onClick={() => handleDelete(data._id)}>Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default CommentSection
