import React from 'react';

const AdminDashboard = ({ categories, movies, reviews, users }) => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <section>
                <h3>Categories</h3>
                {/* Display and manage categories */}
            </section>
            <section>
                <h3>Movies</h3>
                {/* Display and manage movies */}
            </section>
            <section>
                <h3>Reviews</h3>
                {/* Display and manage reviews */}
            </section>
            <section>
                <h3>Users</h3>
                {/* Display and manage users */}
            </section>
        </div>
    );
};

export default AdminDashboard;