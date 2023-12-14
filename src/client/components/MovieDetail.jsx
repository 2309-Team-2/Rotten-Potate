import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [newReview, setNewReview] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [userRating, setUserRating] = useState(5); // Default user rating

  const handleReviewSubmit = async () => {
    try {
      // Ensure movieId is accessible within the closure
      const currentMovieId = movieId;
  
      const response = await fetch(`/api/reviews/movies/${currentMovieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          rating: userRating,
          comment: newReview,
          movieId: parseInt(currentMovieId, 10), // Convert to number if needed
        }),
      });
  
      if (!response.ok) {
        console.error(
          "Failed to submit review. Server returned:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to submit review");
      }
  
      const createdReview = await response.json();
  
      // Update reviews state using the functional form of setReviews
      setReviews((prevReviews) => {
        const updatedReviews = [...prevReviews, { ...createdReview, movieId: currentMovieId }];
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        return updatedReviews;
      });
  
      setNewReview("");
  
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const handleReplyButtonClick = (reviewId) => {
    // Set the selected review ID when the "Reply" button is clicked
    setSelectedReviewId(reviewId);
  };
  const handleCommentSubmit = async () => {
    try {
      // Ensure reviewId is accessible within the closure
      const currentReviewId = selectedReviewId;
  
      // Check if a review is selected
      if (!currentReviewId) {
        console.error("No review selected for comment.");
        return;
      }
  
      // Check if the new comment is not empty
      if (!newComment.trim()) {
        console.error("Comment cannot be empty.");
        return;
      }
  
      const response = await fetch(
        `/api/comments/reviews/${currentReviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
            // Include any additional headers or authentication tokens if needed
          },
          body: JSON.stringify({
            content: newComment,
            // Add any other required fields for comment creation
          }),
        }
      );
  
      if (!response.ok) {
        console.error(
          `Error submitting comment. Server returned: ${response.status} ${response.statusText}`
        );
        // Optionally handle specific error scenarios
        return;
      }
  
      console.log(
        `Comment submitted successfully for review ID: ${currentReviewId}, Comment: ${newComment}`
      );
  
      // Clear the comment textarea and reset selectedReviewId
      setNewComment("");
      setSelectedReviewId(null);
  
      // Fetch updated comments for the selected review
      const updatedCommentsResponse = await fetch(
        `/api/comments/reviews/${currentReviewId}`
      );
      if (!updatedCommentsResponse.ok) {
        throw new Error(
          `Error fetching updated comments. Server returned: ${updatedCommentsResponse.status} ${updatedCommentsResponse.statusText}`
        );
      }
  
      const updatedCommentsData = await updatedCommentsResponse.json();
  
      // Update comments state for the selected review only
      setComments((prevComments) => {
        const newComments = { ...prevComments };
  
        if (Array.isArray(newComments[currentReviewId])) {
          newComments[currentReviewId] = [
            ...newComments[currentReviewId],
            updatedCommentsData,
          ];
        } else {
          newComments[currentReviewId] = [updatedCommentsData];
        }
  
        return newComments;
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Optionally handle specific error scenarios
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        console.error(
          "Failed to delete comment. Server returned:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to delete comment");
      }

      // Update comments state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: updatedText,
        }),
      });

      if (!response.ok) {
        console.error(
          "Failed to update comment. Server returned:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to update comment");
      }

      const updatedComment = await response.json();

      // Update comments state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: updatedComment.content }
            : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  const handleUpdateRating = async () => {
    try {
      const response = await fetch(`/api/rates/${movieId}/update-rating`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          rating: userRating,
        }),
      });

      if (!response.ok) {
        console.error(
          "Failed to update movie rating. Server returned:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to update movie rating");
      }

      // Optionally, fetch and update the movie details after updating the rating
      const updatedMovieResponse = await fetch(`/api/movies/${movieId}`);
      if (updatedMovieResponse.ok) {
        const updatedMovieData = await updatedMovieResponse.json();
        setMovie(updatedMovieData);
      }

      console.log("Movie rating updated successfully.");
    } catch (error) {
      console.error("Error updating movie rating:", error.message);
    }
  };

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          // Handle error for movie details
          console.error('Error fetching movie details:', movieResponse.status, movieResponse.statusText);
          return;
        }
        
        const movieData = await movieResponse.json();
        console.log('Movie details:', movieData);
        setMovie(movieData);
  
        // Check if reviews are stored in localStorage
        const storedReviews = localStorage.getItem('reviews');
        if (storedReviews) {
          console.log('Fetching reviews from localStorage...');
          const storedReviewsData = JSON.parse(storedReviews);
  
          // Update reviews state with locally stored reviews
          setReviews(storedReviewsData);
          
          // Fetch comments for each review
          const commentsData = await Promise.all(
            storedReviewsData.map(async (review) => {
              const commentsResponse = await fetch(`/api/comments/reviews/${review.id}`);
              
              if (!commentsResponse.ok) {
                throw new Error(
                  `Error fetching comments. Server returned: ${commentsResponse.status} ${commentsResponse.statusText}`
                );
              }
              
              return await commentsResponse.json();
            })
          );
  
          // Log commentsData to check the structure
          console.log('Comments for each review:', commentsData);
          
          // Update comments state for the selected review only
          setComments(commentsData);
  
          // Exit the function here to avoid fetching reviews from the server unnecessarily
          return;
        }
  
        console.log('Fetching reviews from the server...');
        // Fetch reviews for the movie
        const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`);
        if (!reviewsResponse.ok) {
          // Handle error for reviews
          console.error('Error fetching reviews:', reviewsResponse.status, reviewsResponse.statusText);
          return;
        }
  
        const reviewsData = await reviewsResponse.json();
        console.log('Reviews from the server:', reviewsData);
        setReviews(reviewsData);
  
        // Update localStorage with the newly fetched reviews
        localStorage.setItem('reviews', JSON.stringify(reviewsData));
  
        // Fetch comments for each review
        const commentsData = await Promise.all(
          reviewsData.map(async (review) => {
            const commentsResponse = await fetch(`/api/comments/reviews/${review.id}`);
            
            if (!commentsResponse.ok) {
              throw new Error(
                `Error fetching comments. Server returned: ${commentsResponse.status} ${commentsResponse.statusText}`
              );
            }
            
            return await commentsResponse.json();
          })
        );
  
        // Log commentsData to check the structure
        console.log('Comments for each review:', commentsData);
        
        // Update comments state for the selected review only
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, or comments:', error);
  
        if (error.response) {
          console.error("Response details:", error.response);
        }
  
        if (error.request) {
          console.error("Request details:", error.request);
        }
      }
    };
  
    if (movieId) {
      console.log('Fetching movie and reviews...');
      fetchMovieAndReviews();
    }
  }, [movieId, userToken]);


  if (!movie) {
    return <div className="single-movie-container">Movie not found!</div>;
  }
  return (
    <div className='single-movie-container'>
      <h2>{movie.title}</h2>
      <img src={movie.image_url} alt={movie.title} />
      <p>Genre: {movie.genre}</p>
      <p>Release Year: {movie.release_year}</p>
      <p>Rating: {movie.rating}</p>
{movie.averageRating && <p>Average Rating: {movie.averageRating}</p>}
      <p>Description: {movie.description}</p>
      <label>
        Your Rating:
        <input
          type="number"
          min="1"
          max="10"
          value={userRating}
          onChange={(e) => setUserRating(parseInt(e.target.value, 10))}
        />
      </label>
      <button onClick={handleUpdateRating}>Update Rating</button>

      <h3>Leave a Review:</h3>
        <textarea
          rows="4"
          cols="50"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}/>
             <button type="submit" onClick={handleReviewSubmit}>
          Submit Review
        </button>
        <h3>Reviews:</h3>
{reviews.length > 0 ? (
  <ul>
    {reviews
      .filter((review) => review.movieId === movieId) // Filter reviews by movieId
      .map((review) => (
        <li key={review.id}>
          <p>{review.comment}</p>
          <h4>Comments:</h4>
              {comments[review.id] && comments[review.id].length > 0 ? (
  <ul>
    {comments[review.id].map((comment) => (
      <li key={`${review.id}-${comment.id}`}>
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
  );
};

export default MovieDetail;