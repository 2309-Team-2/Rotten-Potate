const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, createComment, updateComment, deleteComment } = require('../db');

// GET all comments
router.get('/comments', (req, res) => {
  const comments = getAllComments();
  res.json(comments);
});

// GET comment by ID
router.get('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const comment = getCommentById(commentId);
  
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// POST new comment
router.post('/comments', (req, res) => {
  const { content, review_ID, user_ID } = req.body;
  
  if (!content || !review_ID || !user_ID) {
    res.status(400).json({ message: 'Content, review ID, and user ID are required' });
  } else {
    const newComment = {
      id: generateUniqueId(), // You can use any method to generate a unique ID
      content,
      review_ID,
      user_ID
    };
  
    const createdComment = createComment(newComment);
    res.status(201).json(createdComment);
  }
});

// PATCH comment by ID
router.patch('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const { content, review_ID, user_ID } = req.body;
  
  if (!content && !review_ID && !user_ID) {
    res.status(400).json({ message: 'At least one field (content, review ID, or user ID) is required' });
  } else {
    const updatedFields = {
      content,
      review_ID,
      user_ID
    };
  
    const updatedComment = updateComment(commentId, updatedFields);
  
    if (updatedComment) {
      res.json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  }
});

// DELETE comment by ID
router.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const deletedComment = deleteComment(commentId);
  
  if (deletedComment) {
    res.json({ message: 'Comment deleted successfully' });
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

module.exports = router;