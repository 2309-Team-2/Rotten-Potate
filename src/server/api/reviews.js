const express = require('express');
const router = express.Router();
const { getAllReviews, getReviewById, createReview, updateReview, getReviewsByMovieId, getUserReviews, deleteReview } = require('../db/reviews'); 
const { authenticateToken } = require('./authenticateToken');
// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});
// GET review by movie_id
router.get('/movies/:movie_id', async (req, res) => {
  try {
    const reviewByMovieId = parseInt(req.params.movie_id);
    const reviewByMovie = await getReviewsByMovieId(reviewByMovieId);
    
    if (reviewByMovie) {
      res.json(reviewByMovie);
    } else {
      res.status(500).json({ message: "No reviews for that movie" });
    }
  } catch (err) {
    res.status(404).json({ message: 'Couldn\'t find reviews for that movie', error: err.toString() });
  }
});

// GET review by ID
router.get('/:id', async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id); // Ensure the ID is an integer
    const review = await getReviewById(reviewId);
    
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

router.use(authenticateToken)
router.post('/movies/:movieId', authenticateToken, async (req, res) => {
  try {
    const { comment } = req.body;
    const { movieId } = req.params;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const user_id = req.user_id; // Assuming the user ID is available in req.user

    // Additional validation for movieId can be done here...

    // Create a new review associated with the specified movie ID
    const newReview = await createReview({ user_id, movie_id: movieId, comment });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// POST new review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const user_id = req.user_id; // Assuming the user ID is available in req.user

    const newReview = await createReview({ user_id, comment });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const { comment, rating } = req.body;

    if (comment == null && rating == null) {
      return res.status(400).json({ message: 'Comment or rating is required to update a review' });
    }

    const updatedFields = { ...(comment && { comment }), ...(rating && { rating }) };

    const updatedReview = await updateReview(reviewId, updatedFields);
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);
    const deletedReview = await deleteReview(reviewId);
    if (deletedReview) {
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userReviews = await getUserReviews(userId);
    res.json(userReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/user/:userId/:reviewId', authenticateToken, async (req, res) => {
  try {
    const { userId, reviewId } = req.params;
    const deletedReview = await deleteReview(reviewId);

    if (deletedReview) {
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

module.exports = router;