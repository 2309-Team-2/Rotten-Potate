import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection"; // Import CommentSection component

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const { movieId } = useParams();
  const [newReview, setNewReview] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleReviewSubmit = async (req, res) => {
    try {
        const storedUserToken = req.header('Authorization')?.slice(7);

        if (!storedUserToken) {
            console.error('User is not logged in');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedUserToken}`,
            },
            body: JSON.stringify({
                movie_id: movieId,
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

        res.status(201).json(createdReview); // Optionally, send a response back to the client
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error', error: error.toString() });
    }
};

const handleCommentSubmit = async (req, res) => {
    try {
        const storedUserToken = req.header('Authorization')?.slice(7);

        if (!storedUserToken) {
            console.error('User is not logged in');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedUserToken}`,
            },
            body: JSON.stringify({
                content: newComment,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit comment');
        }

        const commentResponseData = await response.json();

        // Update comments state
        setComments((prevComments) => [
            ...prevComments,
            { reviewId: review.id, comments: [commentResponseData] },
        ]);

        setNewComment('');

        res.status(201).json(commentResponseData); // Optionally, send a response back to the client
    } catch (error) {
        console.error('Error submitting comment:', error);

        // Check if there's a response object with details
        if (error.response) {
            console.error('Response details:', error.response);
        }

        res.status(500).json({ message: 'Internal server error', error: error.toString() });
    }
};
  const handleDeleteComment = async (reviewId, commentId) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
  
      // Update comments state
      setComments((prevComments) => {
        const updatedComments = prevComments.map((item) => {
          if (item.reviewId === reviewId) {
            const updatedComments = item.comments.filter((comment) => comment.id !== commentId);
            return { reviewId: reviewId, comments: updatedComments };
          }
          return item;
        });
        return updatedComments;
      });
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };
  
  const handleUpdateComment = async (reviewId, commentId, updatedText) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
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
        throw new Error('Failed to update comment');
      }
  
      const updatedComment = await response.json();
  
      // Update comments state
      setComments((prevComments) => {
        const updatedComments = prevComments.map((item) => {
          if (item.reviewId === reviewId) {
            const updatedComments = item.comments.map((comment) => {
              if (comment.id === commentId) {
                return { ...comment, content: updatedComment.content };
              }
              return comment;
            });
            return { reviewId: reviewId, comments: updatedComments };
          }
          return item;
        });
        return updatedComments;
      });
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };
  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
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
  
        // Fetch users for the reviews
        const userIds = reviewsData.map((review) => review.user_id);
        console.log('User IDs:', userIds);
  
        if (!userIds || userIds.length === 0) {
          console.error('No user IDs found in reviewsData');
          return;
        }
  
        const usersResponse = await fetch(`/api/users/${userIds.join(',')}`);
        if (!usersResponse.ok) {
          throw new Error(`Error fetching users. Server returned: ${usersResponse.status} ${usersResponse.statusText}`);
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);
        console.log('Reviews Data:', reviewsData);

        const commentIds = reviewsData.flatMap((review) => {
          if (review.id) {
            // Assuming comment has a review_id field linking it to the review
            return [review.id];
          } else {
            console.error('No review ID found in the review:', review);
            return [];
          }
        });
    
        console.log('Review IDs:', commentIds);
    
        if (!commentIds || commentIds.length === 0) {
          console.error('No review IDs found in reviewsData');
          return;
        }
    
        const commentsResponse = await fetch(`/api/comments/${commentIds.join(',')}`);
        if (!commentsResponse.ok) {
          throw new Error(`Error fetching comments. Server returned: ${commentsResponse.status} ${commentsResponse.statusText}`);
        }
    
        const commentsData = await commentsResponse.json();
        console.log('Comments Data:', commentsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, users, or comments:', error);
    
        // Log additional information about the caught error
        if (error.response) {
          console.error('Response details:', error.response);
        }
    
        // Log details about the network request, if available
        if (error.request) {
          console.error('Request details:', error.request);
        }
      }
    };
  
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
              <p>{review.comment}</p>

              <h4>Comments:</h4>
              {review.comments && Array.isArray(review.comments) && review.comments.length > 0 ? (
                review.comments.map((commentId) => {
                  const comment = comments.find((c) => c.id === commentId);
                  return (
                    <div key={commentId}>
                      <p>{comment ? comment.content : 'Comment not found'}</p>
                    </div>
                  );
                })
              ) : (
                <p>No comments available.</p>
              )}
              
              <textarea
                rows="4"
                cols="50"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleCommentSubmit(review.id)}>
                Submit Comment
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No reviews available.</p>
        </div>
      )}

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
    </div>
  );
};

export default MovieDetail;