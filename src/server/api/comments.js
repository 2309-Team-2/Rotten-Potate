const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./authenticateToken'); // Import your authentication middleware
const { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByReviewId} = require('../db/comments');
const { getReviewById } = require('../db/reviews')
// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await getAllComments(); 
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Call the getCommentById function
    const comment = await getCommentById(id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Send the comment as JSON response
    res.json(comment);
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
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


router.use(authenticateToken)
router.post('/reviews/:reviewId', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const { reviewId } = req.params;
    const userId = req.user.id;

    // Validate content
    if (!content) {
      return res.status(400).json({ error: 'Content is required for a comment' });
    }

    // Assuming you have a function to check if the reviewId exists
    // and get the associated movieId (for additional validation if needed)
    const reviewDetails = await getReviewById(reviewId);

    if (!reviewDetails) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Get current timestamp
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Your createComment function should handle inserting a comment into the database
    const comment = await createComment(content, reviewId, userId);

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error submitting comment:', error);
    console.error('Error details:', error);

    res.status(500).json({ error: 'Internal server error' });
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