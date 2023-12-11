import React, { useEffect, useState } from 'react';

const Profile = ({ token, setToken }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            console.log('Fetching user data with token:', token);
            const response = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Server response:', response);
    
            if (response.ok) {
                const userData = await response.json();
                console.log('User data fetched successfully:', userData);
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
        }finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogout = () => {
        console.log('Logging out...');
    
        setUser({});
        setToken(null);
    
        // Clear token from localStorage
        localStorage.removeItem('userToken');
    
        setIsLoggedIn(false);
    };

    return (
        <div className='account'>
            {isLoading ? (
                <p>Loading...</p>
            ) : isLoggedIn ? (
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
};

export default Profile;
