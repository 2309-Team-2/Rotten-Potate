import React, { useEffect, useState } from "react";

const Profile = ({ token, setToken }) => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        console.error(
          "Error fetching user data:",
          response.status,
          response.statusText,
          errorData
        );
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during user data fetch:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userReviewsData = await response.json();
        setUserReviews(userReviewsData);
      } else {
        console.error(
          "Error fetching user reviews:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during user reviews fetch:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserReviews();
    }
  }, [token, user.id]);

  const handleLogout = () => {
    setUser({});
    setToken(null);
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newUsername || user.name,
          email: newEmail || user.email,
        }),
      });

      if (response.ok) {
        await fetchUserData();
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error(
          "Error updating user data:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error during user data update:", error);
    }
  };

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setUpdatedComment("");
    setUpdatedRating("");
  };

  const handleUpdateReview = async (updatedComment, updatedRating) => {
    try {
      const response = await fetch(`/api/reviews/${editingReviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: updatedComment,
          rating: updatedRating,
        }),
      });

      if (response.ok) {

        fetchUserReviews();
        setEditingReviewId(null);
        setUpdatedComment("");
        setUpdatedRating("");

      } else {
        const errorData = await response.json();
        console.error(
          "Error updating review:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error during review update:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/user/${user.id}/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUserReviews();
      } else {
        const errorData = await response.json();
        console.error(
          "Error deleting review:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error during review deletion:", error);
    }
  };

  return (
    <div className="account">
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <>
          <div className="account-details">
            <h2>Account Details</h2>
            <p>Email: {user.email}</p>
            <p>Full Name: {user.name}</p>
            {!isEditing && (
              <button id="update-button" onClick={() => setIsEditing(true)}>
                Update
              </button>
            )}
            {isEditing && (
              <>
                <label>
                  New Username:
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </label>
                <label>
                  New Email:
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </label>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="user-reviews-box">
            <h2>User Reviews</h2>
            {userReviews.map((review) => (
              <div key={review.id}>
                {editingReviewId === review.id ? (
                  <>
                    <label>
                      Updated Review:
                      <input
                        type="text"
                        value={
                          updatedComment !== ""
                            ? updatedComment
                            : review.comment
                        }
                        onChange={(e) => setUpdatedComment(e.target.value)}
                      />
                    </label>
                    <label>
                      Updated Rating:
                      <input
                        type="number"
                        step="0.1"
                        placeholder="1-10"
                        min="1"
                        max="10"
                        value={
                          updatedRating !== "" ? updatedRating : review.rating
                        }
                        onChange={(e) => setUpdatedRating(e.target.value)}
                      />
                    </label>
                    <button
                      onClick={() =>
                        handleUpdateReview(updatedComment, updatedRating)
                      }
                    >
                      Save Changes
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>{review.comment}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Movie: {review.movie_name}</p>
                    <button onClick={() => handleEditReview(review.id)}>
                      Edit Review
                    </button>
                    <button onClick={() => handleDeleteReview(review.id)}>
                      Delete Review
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Not logged in. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
