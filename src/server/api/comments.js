const express = require('express');
const router = express.Router();
const  authenticateToken  = require('./users'); // Import your authentication middleware

const { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByReviewId } = require('../db/comments');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await getAllComments(); 
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//GET comment by review_id
router.get('/reviews/:review_id', async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    const comments = await getCommentsByReviewId(reviewId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET comment by ID
router.get('/:id', async (req, res) => { 
  try {
    const commentId = req.params.id;
    const comment = await getCommentById(commentId);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, review_id, user_id } = req.body;
    // Only content is required
    if (!content) {
      res.status(400).json({ message: 'Content is required' });
    } else {
      const newComment = await createComment({ content, review_id, user_id });
      res.status(201).json(newComment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH comment by ID
router.patch('/:id', authenticateToken, async (req, res) => { 
  try {
    const commentId = req.params.id;
    const { content, review_ID, user_ID } = req.body;
    // Only content is required
    if (!content) {
      res.status(400).json({ message: 'Content is required' });
    } else {
      const updatedComment = await updateComment(commentId, { content, review_ID, user_ID });
      if (updatedComment) {
        res.json(updatedComment);
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE comment by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await deleteComment(commentId);
    if (deletedComment) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;