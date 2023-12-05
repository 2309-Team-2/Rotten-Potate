const db = require ('./client')

const createComment = async (content, reviewsId, userId) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO comments (content, reviews_id, users_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content, reviewsId, userId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

const getCommentById = async (id) => {
  try {
     const { rows } = await 
     db.query('SELECT * FROM comments WHERE id = $1',[id]);
     return rows [0];
  } catch (error) {
    throw error;
  }
}
const getAllComments = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM comments'); // Corrected table name
    return rows;
  } catch (error) {
    throw error;
  }
};
const updateComments = async (id, content, reviewsId) => {
  try {
    const { rows } = await db.query(
      'UPDATE comments SET CONTENT = $2, review_id = $3 WHERE id = $1 RETURNING *', [id, content, reviewsId]
    );
    return rows [0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
createComment,
getCommentById,
getAllComments,
updateComments
};