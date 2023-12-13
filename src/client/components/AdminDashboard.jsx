import React, { useEffect, useState } from "react";
import AddMovieForm from "./AddMovies";

const AdminDashboard = ({ token, setToken }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUserNameId, setEditingUserNameId] = useState(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  const fetchUserData = async () => {
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
        setIsAdmin(userData.role === "admin");
      } else {
        console.error("Error fetching user data:", response.statusText);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during user data fetch:", error);
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    if (token) {
      fetchUserData();
    }

    const fetchAllUsers = async () => {
      if (token && isAdmin) {
        setIsLoading(true); // Ensure loading state is set while fetching
        try {
          const response = await fetch("/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (response.ok && result.users && Array.isArray(result.users)) {
            setUsers(result.users);
          } else {
            // Handle cases where users is not present or not an array
            console.error("Expected an array of users, but received:", result);
            setUsers([]); // Reset users to an empty array to avoid errors in rendering
          }
        } catch (error) {
          console.error("Error fetching all users:", error);
        }
        setIsLoading(false); // Set loading state to false after fetching
      }
    };
    fetchAllUsers(); // Fetch all users when isAdmin state is determined
  }, [token, isAdmin]); // Dependency array includes isAdmin to refetch when it changes

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        // Handle error
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const availableRoles = ["admin", "user", "editor"]; // Adjust based on your roles

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");

    setUser({});
    setToken(null);

    // Clear token from localStorage
    localStorage.removeItem("userToken");

    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleMovieAdded = (newMovie) => {
    // Logic to handle after a new movie is added
    // For example, you might want to refresh the movies list
    setMovies((prevMovies) => [...prevMovies, newMovie]);
    console.log("New movie added:", newMovie);
  };

  const handleMovieDeleted = (deletedMovieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== deletedMovieId)
    );
    console.log("Movie deleted:", deletedMovieId);
  };

  const handleEditUserName = (userId) => {
    setEditingUserNameId(userId);
    setEditedUserName(users.find((user) => user.id === userId).name);
    setIsEditingUserName(true);
  };

  const handleSaveUserName = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editedUserName }),
      });

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, name: editedUserName } : user
          )
        );
        setEditingUserNameId(null);
        setIsEditingUserName(false);
      } else {
        console.error("Failed to update user name");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelEditUserName = () => {
    setEditingUserNameId(null);
    setIsEditingUserName(false);
  };

  return (
    <div className="admin-dashboard">
      {isLoggedIn && isAdmin ? (
        <div className="admin-container">
          <div className="admin-box">
            <h2>Admin Dashboard</h2>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="user-actions-box">
            <h2>Add a Movie</h2>
            <AddMovieForm
              onMovieAdded={handleMovieAdded}
              onMovieDeleted={handleMovieDeleted}
            />
            <div>
              <h3>Movies</h3>
              {isLoading ? (
                <p>Loading movies...</p>
              ) : (
                <ul>
                  {movies.map((movie) => (
                    <li key={movie.id}>
                      {movie.title} - {movie.genre}
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="users-list-box">
            <h3>Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <div className="user-info">
                    {user.name} ({user.email})
                  </div>
                  <div className="user-actions">
                    {!isEditingUserName && (
                      <>
                        <select
                          onChange={(e) =>
                            changeUserRole(user.id, e.target.value)
                          }
                          defaultValue={user.role}
                        >
                          {availableRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditUserName(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="dlt-btn"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {user.id === editingUserNameId && (
                      <div>
                        <input
                          type="text"
                          value={editedUserName}
                          onChange={(e) => setEditedUserName(e.target.value)}
                        />
                        <button onClick={() => handleSaveUserName(user.id)}>
                          Save
                        </button>
                        <button onClick={handleCancelEditUserName}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : isLoggedIn ? (
        <p>You do not have admin privileges. Please log in as an admin.</p>
      ) : (
        <p>Not logged in. Please log in.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
