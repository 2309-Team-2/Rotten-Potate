import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const { movieId } = useParams();
  const [newReview, setNewReview] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: movieId,
          comment: newReview,
          // You may include other relevant data in the request body
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Assuming the server responds with the created review data
      const createdReview = await response.json();

      // Update the state with the new review
      setReviews([...reviews, createdReview]);

      // Clear the review input
      setNewReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleCommentSubmit = async (reviewId) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: reviewId,
          content: newComment,
          // You may include other relevant data in the request body
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Assuming the server responds with the created comment data
      const createdComment = await response.json();

      // Update the state with the new comment
      setComments((prevComments) => [
        ...prevComments,
        { reviewId: reviewId, comments: [createdComment] },
      ]);

      // Clear the comment input
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchMovieAndReviews = async () => {
    try {
      // Fetch movie details
      const movieResponse = await fetch(`/api/movies/${movieId}`);
      if (!movieResponse.ok) {
        throw new Error('Movie not found');
      }
      const movieData = await movieResponse.json();
      setMovie(movieData);

      // Fetch reviews for the movie
      const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`);
      if (!reviewsResponse.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);

      // Fetch users for the reviews
      const userIds = reviewsData.map((review) => review.user_id);
      const usersResponse = await fetch(`/api/users/${userIds.join(',')}`);
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch comments for each review
      const commentsData = [];
      for (const review of reviewsData) {
        const commentsResponse = await fetch(`/api/comments/reviews/${review.id}`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const reviewComments = await commentsResponse.json();
        commentsData.push({ reviewId: review.id, comments: reviewComments });
      }
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching movie details, reviews, users, or comments:', error);
    }
  };

  useEffect(() => {
    fetchMovieAndReviews();
  }, [movieId]);

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

      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{users.find((user) => user.id === review.user_id)?.name}</p>
              <p>{review.comment}</p>
              {/* Add other relevant review information */}
              
           {/* Review Box */}

{/* Display comments for this review */}
<h4>Comments:</h4>
{comments &&
  comments
    .find((item) => item.review_id === review.id)
    ?.comments.map((comment) => (
      <div key={comment.id}>
        {/* Display comment information */}
        <p>{comment.user}</p>
        <p>{comment.content}</p>
        {/* Add other relevant comment information */}
      </div>
    ))}
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
</div>

{/* Comment Box */}
<div>
  <h3>Leave a Comment:</h3>
  <textarea
    rows="4"
    cols="50"
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />
  <button onClick={() => handleCommentSubmit(review.id)}>
    Submit Comment for Review {review.id}
  </button>
</div>
                  
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieDetail;