import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ token, setToken }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        const checkAdminStatus = async () => {
            if (token) {
                await fetchUserData();
            }
        };

        checkAdminStatus(); // Call the function directly to check admin status on mount

        const fetchAllUsers = async () => {
            if (token && isAdmin) {
                setIsLoading(true);
                try {
                    const response = await fetch('/api/users', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const result = await response.json();
                    if (response.ok && result.users && Array.isArray(result.users)) {
                        setUsers(result.users);
                    } else {
                        console.error('Expected an array of users, but received:', result);
                        setUsers([]);
                    }
                } catch (error) {
                    console.error('Error fetching all users:', error);
                }
                setIsLoading(false);
            }
        };

        fetchAllUsers();
    }, [token, isAdmin]);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const availableRoles = ['admin', 'user', 'editor'];

    const changeUserRole = async (userId, newRole) => {
        try {
            const response = await fetch(`/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setUser({});
        setToken(null);
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <div className='admin-dashboard'>
            {isLoggedIn && isAdmin ? (
                <>
                    <h2>Admin Dashboard</h2>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.name}
                                <select onChange={(e) => changeUserRole(user.id, e.target.value)} defaultValue={user.role}>
                                    {availableRoles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
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
