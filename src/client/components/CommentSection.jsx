import React, { useState } from 'react';

const CommentSection = ({ comments, onAddComment, onDeleteComment, onUpdateComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    const handleDeleteComment = (commentId) => {
        onDeleteComment(commentId);
    };

    const handleUpdateComment = (commentId, updatedText) => {
        onUpdateComment(commentId, updatedText);
    };

    return (
        <div>
            <h2>Comments</h2>
            <div>
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            <button
                                onClick={() => {
                                    const updatedText = prompt('Update your comment:', comment.text);
                                    if (updatedText !== null) {
                                        handleUpdateComment(comment.id, updatedText);
                                    }
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentSection;