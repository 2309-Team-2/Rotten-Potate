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

  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const storedUserToken = localStorage.getItem('userToken');
      setUserToken(storedUserToken);
  
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
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
    }  catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ message: 'Internal server error', error: error.toString() });
    }
  }

  const handleCommentSubmit = async (reviewId) => {
    try {
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
      console.log('Submitting comment:', { content: newComment });
  
      // Submit comment with authentication
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: newComment,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      const commentResponseData = await response.json(); // Store the JSON data in a variable
      
      // Update comments state
      setComments((prevComments) => [
        ...prevComments,
        { reviewId: reviewId, comments: [commentResponseData] },
      ]);
      
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    
      // Check if there's a response object with details
      if (error.response) {
        console.error('Response details:', error.response);
      }
    }
  }
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
        const storedUserToken = localStorage.getItem('userToken');
        setUserToken(storedUserToken);
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          throw new Error('Movie not found');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`, {
          headers: userToken ? { 'Authorization': `Bearer ${userToken}` } : {},
        });
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        const userIds = reviewsData.map((review) => review.user_id);
        const usersResponse = await fetch(`/api/users/${userIds.join(',')}`);
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const commentsData = [];
        for (const review of reviewsData) {
          const commentResponse = await fetch(`/api/comments/reviews/${review.id}`, {
            headers: userToken ? { 'Authorization': `Bearer ${userToken}` } : {},
          });
          if (!commentResponse.ok) {
            throw new Error('Failed to fetch comments');
          }

          const commentData = await commentResponse.json().comments;;
          commentsData.push({ reviewId: review.id, comments: commentData });
        }

        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, users, or comments:', error);
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
  
      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
             <li key={review.id}>
              <p>{review.comment}</p>
  
              <h4>Comments:</h4>
    {comments &&
      comments
        .find((item) => item.reviewId === review.id)
        ?.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user}</p>
            <p>{comment.content}</p>
          </div>
        ))}
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
