const db = require('./client'); // Adjust the path as necessary to point to your database client setup.

// Function to get all reviews
async function getAllReviews() {
  const result = await db.query('SELECT * FROM reviews');
  return result.rows;
}

// Function to get a single review by ID
async function getReviewById(id) {
  const result = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
  return result.rows[0]; // Return the first row (review) or undefined if not found
}

// Function to create a new review
async function createReview(reviewData) {
  const { user_id, movie_id, rating, comment } = reviewData;
  const result = await db.query(
    'INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, movie_id, rating, comment]
  );
  return result.rows[0]; // Return the new review
}

// Function to update a review
async function updateReview(id, reviewData) {
  const { rating, comment } = reviewData;
  const result = await db.query(
    'UPDATE reviews SET rating = $2, comment = $3 WHERE id = $1 RETURNING *',
    [id, rating, comment]
  );
  return result.rows[0]; // Return the updated review
}

// Function to delete a review
async function deleteReview(id) {
  const result = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
  return result.rows[0]; // Return the deleted review
}

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};