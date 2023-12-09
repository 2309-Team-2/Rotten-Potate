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
      // Fetch user token
      const storedUserToken = localStorage.getItem('userToken');
      setUserToken(storedUserToken);

      if (!userToken) {
        console.error('User is not logged in');
        return;
      }

      // Submit review with authentication
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          users_id: movieId,
          movie_id: movieId,
          rating: 0,
          comment: newReview,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const createdReview = await response.json();

      // Update reviews state
      setReviews([...reviews, createdReview]);
      setNewReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }

      // Fetch comments with authentication
      const commentResponse = await fetch(`/api/comments/${comments.id}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (!commentResponse.ok) {
        throw new Error('Failed to fetch comment');
      }

      const commentData = await commentResponse.json();
      const { review_id } = commentData;

      // Submit comment with authentication
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          reviewId: review_id,
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const createdComment = await response.json();

      // Update comments state
      setComments((prevComments) => [
        ...prevComments,
        { reviewId: review_id, comments: [createdComment] },
      ]);

      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error.message);
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
              <p>{users.find((user) => user.id === review.user_id)?.name}</p>
              <p>{review.comment}</p>
  
              <h4>Comments:</h4>
{comments &&
  comments
    .find((item) => item.reviewId === review.id)
    ?.comments.map((commentId) => {
      const commentDataItem = comments.find((data) => data.commentId === commentId);
      if (commentDataItem) {
        return (
          <div key={commentDataItem.commentId}>
            <p>{commentDataItem.comment.user}</p>
            <p>{commentDataItem.comment.content}</p>
          </div>
        );
      }
      return null;
    })}
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
  
      <div>
        <h3>Leave a Comment:</h3>
        <textarea
          rows="4"
          cols="50"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
