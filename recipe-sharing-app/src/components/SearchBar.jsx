import React from 'react';
import { Search, X } from 'lucide-react';
import useRecipeStore from './recipeStore';
import '../assets/css/SearchBar.css';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search recipes by title, ingredients, or instructions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="clear-search-btn"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
