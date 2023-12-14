import React, { useEffect, useState } from 'react';

const Profile = ({ token, setToken }) => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        console.error('Error fetching user data:', response.status, response.statusText, errorData);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during user data fetch:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleLogout = () => {
    setUser({});
    setToken(null);
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newUsername || user.name,
          email: newEmail || user.email
        })
      });

      if (response.ok) {
        await fetchUserData(); 
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error('Error updating user data:', response.status, response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error during user data update:', error);
    }
  };


  return (
    <div className='account'>
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <>
          <div className="account-details">
          <h2>Account Details</h2>
          <p>Email: {user.email}</p>
          <p>Full Name: {user.name}</p>
          {!isEditing && (
            <button id="update-button" onClick={() => setIsEditing(true)}>Update</button>
          )}
          {isEditing && (
            <>
              <label>
                New Username:
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              </label>
              <label>
                New Email:
                <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </label>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p>Not logged in. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;