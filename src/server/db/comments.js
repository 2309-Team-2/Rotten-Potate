const db = require ('./client')

const createComment = async (content, reviewId, userId) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO comments (content, review_id, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content, reviewId, userId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createComment,
};