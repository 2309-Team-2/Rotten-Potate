import React, { useEffect, useState } from 'react';

const Profile = ({ token, setToken }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
      try {
          const response = await fetch('/api/users', {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
  
          console.log('Full server response:', response);
  
          if (response.ok) {
              const userData = await response.json();
              console.log('Parsed User Data:', userData);
  
              const currentUser = userData.users.find(user => user.email.trim() === token.trim());
  
              console.log('Current User:', currentUser);
  
              if (currentUser) {
                  setUser(currentUser);
                  setIsLoggedIn(true);
              } else {
                  console.error('User not found in the response data.');
                  setIsLoggedIn(false);
              }
          } else {
              console.error('Error fetching user data:', response.statusText);
              setIsLoggedIn(false);
          }
      } catch (error) {
          console.error('Error during user data fetch:', error);
          setIsLoggedIn(false);
      }
  }

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogout = () => {
        setUser({});
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
      <div className='account'>
        {isLoggedIn ? ( 
          <>
            <h2>Account Details</h2>
            <p>Email: {user.email}</p>
            <p>First Name: {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
             
          </>
        ) : (
          <p>Not logged in. Please log in.</p>
        )}
      </div>
    );
  }

export default Profile;
