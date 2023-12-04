import React, { useState } from 'react';

const CategoryFilter = ({ categories, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onFilterChange(category);
    };

    return (
        <div>
            <h2>Filter by Category</h2>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;