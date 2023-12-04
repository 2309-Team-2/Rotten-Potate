const db = require ('./client')

async function getAllComments() {
  try {
    const result = await db.query(`SELECT * FROM comments;`);
    return result.rows;
  } catch (err) {
    console.error('Error retrieving comments:', err.stack);
    throw err;
  }
}
async function processComments() {
  try {
    const comments = await getAllComments();
    console.log('All Comments:', comments);
    // Process the comments array as needed
  } catch (err) {
    // Handle error
    console.error('Error processing comments:', err.stack);
  }
}

// Call the function
processComments();

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
  getAllComments
};