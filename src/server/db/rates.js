const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../api/authenticateToken');
const db = require('./client');

// Assuming you have the updateMovieRating function defined
async function updateMovieRating(movieId) {
  try {
    const result = await db.query(
      "UPDATE movies SET rating = (SELECT AVG(rating) FROM reviews WHERE movie_id = $1) WHERE id = $1 RETURNING *;",
      [movieId]
    );
    console.log(`Rating updated for movie ID ${movieId}:`, result.rows[0]);
  } catch (err) {
    console.error(`Error updating rating for movie ID ${movieId}:`, err.stack);
  }
}

module.exports = { updateMovieRating }