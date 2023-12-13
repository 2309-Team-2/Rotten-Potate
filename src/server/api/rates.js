
const express = require('express');
const router = express.Router();
const { updateMovieRating }= require('../db/rates')  

// /api/rates
router.put("/:id/update-rating", async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    // Call the updateMovieRating function to update the movie rating
    await updateMovieRating(movieId);

    // Respond with a success message or updated data if needed
    res.status(200).json({ message: "Movie rating updated successfully." });
  } catch (err) {
    console.error("Error updating movie rating:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post('/:movieId/update-rating', (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  const { rating } = req.body;

  // Validate input
  if (isNaN(movieId) || isNaN(rating) || rating < 1 || rating > 10) {
    return res.status(400).json({ error: 'Invalid movie ID or rating' });
  }

  // Find the movie by ID
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  // Update the movie rating
  movie.rating = rating;

  return res.json({ success: true, message: 'Movie rating updated successfully' });
});

module.exports = router