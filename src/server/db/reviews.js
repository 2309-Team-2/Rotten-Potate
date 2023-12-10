const db = require("./client"); // Adjust the path as necessary to point to your database client setup.

// Function to get all reviews
async function getAllReviews() {
  const result = await db.query("SELECT * FROM reviews");
  return result.rows;
}

// Function to get a single review by ID
async function getReviewById(id) {
  const result = await db.query("SELECT * FROM reviews WHERE id = $1", [id]);
  return result.rows[0]; // Return the first row (review) or undefined if not found
}

// Function to create a new review
async function createReview(reviewData) {
  const { user_id, comment } = reviewData;
  const createdAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const result = await db.query(
    "INSERT INTO reviews (user_id, comment, rating, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, comment, 0, createdAt] // Use 0 as a default rating value (adjust as needed)
  );

  return result.rows[0];
}

// Function to update a review
async function updateReview(id, reviewData) {
  const { rating, comment } = reviewData;
  const updatedAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const result = await db.query(
    "UPDATE reviews SET rating = $2, comment = $3 , updated_at = $4 WHERE id = $1 RETURNING *",
    [id, rating, comment, updatedAt]
  );
  return result.rows[0]; // Return the updated review
}

// Function to delete a review
async function deleteReview(id) {
  const result = await db.query(
    "DELETE FROM reviews WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0]; // Return the deleted review
}

async function getReviewsByMovieId(movieId) {
  try {
    const query = "SELECT * FROM reviews WHERE movie_id = $1";
    const values = [movieId];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteReviewsByMovieId(movieId) {
  try {
    const query = "DELETE FROM reviews WHERE movie_id = $1";
    const values = [movieId];

    const result = await db.query(query, values);
    return result.rowCount; // Returns the number of deleted rows
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByMovieId,
  deleteReviewsByMovieId,
};
