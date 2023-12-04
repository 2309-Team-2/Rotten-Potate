import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h2>Your Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <p>{review.text}</p>
                            <p>Rating: {review.rating}</p>
                            {/* Add other relevant information about the review */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;