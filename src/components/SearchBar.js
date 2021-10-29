import React from 'react';

function SearchBar ({ searchFormData, handleChange }) {
    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Search item by name here"
                onChange={handleChange}
                value={searchFormData}
            />
        </div>
    );
}

export default SearchBar;