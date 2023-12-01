const express = require('express');
const router = express.Router();
const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require('../db');
const axios = require('axios');

// GET all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET review by ID
router.get('/reviews/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await getReviewById(reviewId);
  
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST new review
router.post('/reviews', async (req, res) => {
  try {
    const { user_Id, movie_id, rating, comment } = req.body;
  
    if (!user_Id || !movie_id || !rating || !comment) {
      res.status(400).json({ message: 'User ID, movie ID, rating, and comment are required' });
    } else {
      const commentPayload = {
        content: comment,
        review_ID: generateUniqueId(),
        user_ID: user_Id
      };
  
      const createdComment = await axios.post('http://your-comments-api-url/comments', commentPayload);
  
      const newReview = {
        id: generateUniqueId(),
        user_Id,
        movie_id,
        rating,
        comment_ID: createdComment.data.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
  
      const createdReview = await createReview(newReview);
      res.status(201).json(createdReview);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH review by ID
router.patch('/reviews/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user_Id, movie_id, rating, comment } = req.body;
  
    if (!user_Id && !movie_id && !rating && !comment) {
      res.status(400).json({ message: 'At least one field (user ID, movie ID, rating, or comment) is required' });
    } else {
      const updatedFields = {
        user_Id,
        movie_id,
        rating,
        updated_at: new Date().toISOString()
      };
  
      if (comment) {
        const commentPayload = {
          content: comment,
          review_ID: generateUniqueId(),
          user_ID: user_Id
        };
  
        const createdComment = await axios.post('http://your-comments-api-url/comments', commentPayload);
        updatedFields.comment_ID = createdComment.data.id;
      }
  
      const updatedReview = await updateReview(reviewId, updatedFields);
  
      if (updatedReview) {
        res.json(updatedReview);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })}})