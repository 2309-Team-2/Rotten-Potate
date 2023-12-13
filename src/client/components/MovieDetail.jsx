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
      const response = await fetch(`/api/reviews/movies/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          rating: userRating,
          comment: newReview,
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
  
      // Update reviews state

      setReviews([...reviews, createdReview]);
      setNewReview('');
  
      // Update local storage with the new reviews
      localStorage.setItem('reviews', JSON.stringify([...reviews, createdReview]));
  
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
      // Check if a review is selected
      if (!selectedReviewId) {
        console.error("No review selected for comment.");
        return;
      }

      // Check if the new comment is not empty
      if (!newComment.trim()) {
        console.error("Comment cannot be empty.");
        return;
      }

      // Implement your logic to submit a comment for the selected review

      const response = await fetch(
        `/api/comments/reviews/${selectedReviewId}`,
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
        `Comment submitted successfully for review ID: ${selectedReviewId}, Comment: ${newComment}`
      );

      // Clear the comment textarea and reset selectedReviewId
      setNewComment("");
      setSelectedReviewId(null);

      // Fetch updated comments for the selected review
      const updatedCommentsResponse = await fetch(
        `/api/comments/reviews/${selectedReviewId}`
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

        if (Array.isArray(newComments[selectedReviewId])) {
          newComments[selectedReviewId] = [
            ...newComments[selectedReviewId],
            updatedCommentsData,
          ];
        } else {
          newComments[selectedReviewId] = [updatedCommentsData];
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

        // ... (previous code)
  
        console.log('Fetching movie details...');

        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          console.error(
            `Error fetching movie. Server returned: ${movieResponse.status} ${movieResponse.statusText}`
          );
          const responseText = await movieResponse.text();
          console.error("Response body:", responseText);
          throw new Error(
            `Error fetching movie. Server returned: ${movieResponse.status} ${movieResponse.statusText}`
          );
        }
        const movieData = await movieResponse.json();
        console.log('Movie details:', movieData);
        setMovie(movieData);
  
        // Check if reviews are stored in localStorage
        const storedReviews = localStorage.getItem('reviews');
        if (storedReviews) {
          console.log('Fetching reviews from localStorage...');
          setReviews(JSON.parse(storedReviews));
        } else {
          console.log('Fetching reviews from the server...');
          // Fetch reviews for the movie
          const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`);
          if (!reviewsResponse.ok) {
            throw new Error(`Error fetching reviews. Server returned: ${reviewsResponse.status} ${reviewsResponse.statusText}`);
          }
  
          const reviewsData = await reviewsResponse.json();
          console.log('Reviews from the server:', reviewsData);
          setReviews(reviewsData);
  
          // Store reviews in localStorage
          localStorage.setItem('reviews', JSON.stringify(reviewsData));
          console.log('Reviews stored in localStorage.');
        }
  
        // Fetch comments for each review
        const commentsData = await Promise.all(
          reviews.map(async (review) => {
            const commentsResponse = await fetch(`/api/comments/reviews/${review.id}`);

            if (!commentsResponse.ok) {
              throw new Error(
                `Error fetching comments. Server returned: ${commentsResponse.status} ${commentsResponse.statusText}`
              );
            }
            return await commentsResponse.json();
          })
        );

  
        console.log('Comments for each review:', commentsData);
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
  
    if (movieId && userToken) {
      console.log('Fetching movie and reviews...');
      fetchMovieAndReviews();
    }
  }, [movieId, userToken]);


  if (!movie) {
    return <div className="single-movie-container">Movie not found!</div>;
  }
  
return(
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
        <button type="submit" onClick={(event) => handleReviewSubmit(event)}>
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
                  <button onClick={(event) => handleCommentSubmit(event)}>Submit Comment</button>
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