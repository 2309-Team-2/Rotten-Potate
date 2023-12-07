const db = require("./client");

const createComment = async (
  content,
  reviewId,
  userId,
  createdAt,
  updatedAt
) => {


  try {
    const { rows } = await db.query(
      `INSERT INTO comments (content, review_id, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [content, reviewId, userId, createdAt, updatedAt]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getCommentById = async (id) => {
  try {
    const { rows } = await db.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};
const  getCommentsByReviewId = async (reviewId) => {
  try {
    const { rows } = await db.query("SELECT * FROM comments WHERE reviews_id = $1", [
      id,
    ]);
    const comments = reviewId.result.rows;
    return comments;
  } catch (err) {
    throw new Error(`Error getting comments by review_id: ${err.message}`);
  }
}

const getAllComments = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM comments"); // Corrected table name
    return rows;
  } catch (error) {
    throw error;
  }
};
const updateComments = async (id, content, reviewId, updatedAt) => {
  try {
    const { rows } = await db.query(
      "UPDATE comments SET CONTENT = $2, review_id = $3, updated_at = $4 WHERE id = $1 RETURNING *",
      [id, content, reviewId, updatedAt]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentById,
  getAllComments,
  updateComments,
  getCommentsByReviewId,
};
