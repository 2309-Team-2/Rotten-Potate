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

            console.log(response.status);
            console.log(response.headers);

            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setUser(userData);
                setIsLoggedIn(true);
                setError(null);
            } else {
                console.error('Error fetching user data:', response.status);
                setIsLoggedIn(false);
                setError(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during user data fetch:', error);
            setIsLoggedIn(false);
            setError('Error fetching user data. Please try again.');
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token])

    const handleLogout = () => {
        setUser({});
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <div className='account'>
            {error ? (
                <p>{error}</p>
            ) : isLoggedIn ? (
                <>
                    <h2>Account Details</h2>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Not logged in. Please log in.</p>
            )}
        </div>
    );
}

export default Profile;
