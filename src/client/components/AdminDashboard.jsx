import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ token }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUserData = async () => {
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
                setIsAdmin(userData.role === 'admin');
            } else {
                console.error('Error fetching user data:', response.statusText);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error during user data fetch:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
        }
    }, [token]);

    return (
        <div className='admin-dashboard'>
            {isLoggedIn && isAdmin ? (
                <>
                    <h2>Admin Dashboard</h2>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                </>
            ) : isLoggedIn ? (
                <p>You do not have admin privileges. Please log in as an admin.</p>
            ) : (
                <p>Not logged in. Please log in.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
