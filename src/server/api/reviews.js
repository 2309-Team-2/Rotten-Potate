const express = require('express');
const router = express.Router();
const { getAllReviews, getReviewById, createReview, updateReview, getReviewsByMovieId} = require('../db/reviews'); 
// const axios = require('axios');

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

// POST new review
router.post('/', async (req, res) => {
  try {
    const { users_id, movie_id, rating, comment } = req.body;
    // Validate input fields
    if (!users_id || !movie_id || !rating || !comment) {
      return res.status(400).json({ message: 'Users ID, movie ID, rating, and comment are required' });
    }
    // The data structure should match your database columns and datatypes
    const reviewData = { user_id, movie_id, rating, comment };
    // Directly insert the review into the database without external API call
    const newReview = await createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

// PATCH review by ID
router.patch('/:id', async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id); // Ensure the ID is an integer
    const { rating, comment } = req.body; // Only allow updating rating and comment
    // Validate input fields
    if (rating == null && comment == null) {
      return res.status(400).json({ message: 'Rating or comment is required to update a review' });
    }
    const updatedFields = { ...(rating && { rating }), ...(comment && { comment }) };
    // Update the review in the database
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

router.delete('/:id', async (req, res) => {   try {     const reviewId = parseInt(req.params.id);     const deletedReview = await deleteReview(reviewId);     if (deletedReview) {       res.json({ message: 'Review deleted successfully' });     } else {       res.status(404).json({ message: 'Review not found' });     }   } catch (error) {     res.status(500).json({ message: 'Internal server error', error: error.toString() });   } });  module.exports = router;

    module.exports = router;