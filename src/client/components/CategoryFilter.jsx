import React, { useState, useEffect } from 'react';
import  moviesSeedData  from '../../server/db/moviesSeedData';


const CategoryFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    

    useEffect(() => {
        // Use moviesSeedData directly
        const fetchGenres = () => {
            try {
                const allGenres = moviesSeedData.reduce((acc, movie) => {
                    if (movie.genre) {
                        // Split genres by comma and trim spaces
                        const movieGenres = movie.genre.split(',').map(genre => genre.trim());
                        movieGenres.forEach((genre) => {
                            if (!acc.includes(genre)) {
                                acc.push(genre);
                            }
                        });
                    }
                    return acc;
                }, []);

                const sortedGenres = allGenres.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

                setCategories(['All', ...sortedGenres]);
            } catch (error) {
                console.error('Error fetching genres:', error.message);
            }
        };

        fetchGenres();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onFilterChange(category);
    };

    return (
        <div>
            <h2>Filter by Category</h2>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
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