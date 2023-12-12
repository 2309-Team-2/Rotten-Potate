import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [newReview, setNewReview] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`/api/reviews/movies/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          rating: 0,
          comment: newReview,
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit review. Server returned:', response.status, response.statusText);
        throw new Error('Failed to submit review');
      }

      const createdReview = await response.json();

      // Update reviews state
      setReviews([...reviews, createdReview]);
      setNewReview('');

    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

 const handleReplyButtonClick = (reviewId) => {
  // Set the selected review ID when the "Reply" button is clicked
  setSelectedReviewId(reviewId);
};

const handleCommentSubmit = async () => {
  try {
    // Check if a review is selected
    if (!selectedReviewId) {
      console.error('No review selected for comment.');
      return;
    }

    // Check if the new comment is not empty
    if (!newComment.trim()) {
      console.error('Comment cannot be empty.');
      return;
    }

    // Implement your logic to submit a comment for the selected review
    const response = await fetch(`/api/comments/reviews/${selectedReviewId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        // Include any additional headers or authentication tokens if needed
      },
      body: JSON.stringify({
        content: newComment,
        // Add any other required fields for comment creation
      }),
    });
    if (!response.ok) {
      console.error(`Error submitting comment. Server returned: ${response.status} ${response.statusText}`);
      // Optionally handle specific error scenarios
      return;
    }

    console.log(`Comment submitted successfully for review ID: ${selectedReviewId}, Comment: ${newComment}`);

    // Clear the comment textarea and reset selectedReviewId
    setNewComment('');
    setSelectedReviewId(null);

    // Optionally, fetch and update the reviews and comments to reflect the new comment
    // You can update state, refetch data, or perform any other necessary actions here
  } catch (error) {
    console.error('Error submitting comment:', error);
    // Optionally handle specific error scenarios
  }
};

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to delete comment. Server returned:', response.status, response.statusText);
        throw new Error('Failed to delete comment');
      }

      // Update comments state
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));

    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: updatedText,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update comment. Server returned:', response.status, response.statusText);
        throw new Error('Failed to update comment');
      }

      const updatedComment = await response.json();

      // Update comments state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content: updatedComment.content } : comment
        )
      );

    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // Convert movieId to an integer
        const id = parseInt(movieId, 10);
    
        if (isNaN(id)) {
          console.error('Invalid movie ID:', movieId);
          return;
        }
    
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          console.error(`Error fetching movie. Server returned: ${movieResponse.status} ${movieResponse.statusText}`);
          const responseText = await movieResponse.text();
          console.error('Response body:', responseText);
          throw new Error(`Error fetching movie. Server returned: ${movieResponse.status} ${movieResponse.statusText}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);
    
        // Fetch reviews for the movie
        const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`);
        if (!reviewsResponse.ok) {
          throw new Error(`Error fetching reviews. Server returned: ${reviewsResponse.status} ${reviewsResponse.statusText}`);
        }
    
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
    
        // Fetch comments for each review
        const commentsData = await Promise.all(
          reviewsData.map(async (review) => {
            const commentsResponse = await fetch(`/api/comments/reviews/${review.id}`);
            if (!commentsResponse.ok) {
              throw new Error(`Error fetching comments. Server returned: ${commentsResponse.status} ${commentsResponse.statusText}`);
            }
            return await commentsResponse.json();
          })
        );
    
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, or comments:', error);
    
        if (error.response) {
          console.error('Response details:', error.response);
        }
    
        if (error.request) {
          console.error('Request details:', error.request);
        }
      }
    };

    fetchMovieAndReviews();
  }, [movieId, userToken]);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className='single-movie-container'>
      <h2>{movie.title}</h2>
      <img src={movie.image_url} alt={movie.title} />
      <p>Genre: {movie.genre}</p>
      <p>Release Year: {movie.release_year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Description: {movie.description}</p>
      <div>
        <h3>Leave a Review:</h3>
        <textarea
          rows="4"
          cols="50"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          />
        <button type="submit" onClick={handleReviewSubmit}>
          Submit Review
        </button>
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
  <ul>
    {reviews.map((review) => (
      <li key={review.id}>
        <p>{review.comment}</p>
        <h4>Comments:</h4>
        {comments.length > 0 && Array.isArray(comments[0]) && comments[0].length > 0 ? (
          <ul>
            {comments[0].map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                {/* Uncomment these lines to include delete and update buttons */}
                {/* <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                <button onClick={() => handleUpdateComment(comment.id, prompt('Enter updated text:', comment.content))}>
                  Update
                </button> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments available.</p>
        )}
        {selectedReviewId === review.id ? (
          <div>
            <textarea
              rows="4"
              cols="50"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
          </div>
        ) : (
          <button onClick={() => handleReplyButtonClick(review.id)}>Reply</button>
        )}
      </li>
    ))}
  </ul>
) : (
  <div>
    <p>No reviews available.</p>
  </div>
)}
    </div>
</div>
)}
export default MovieDetail;