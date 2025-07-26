import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import useRecipeStore from './recipeStore';
import '../assets/css/FavoritesList.css';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Get the actual recipe objects from favorite IDs
  const favoriteRecipes = favorites.map(id =>
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean); // Remove any undefined entries

  const handleRemoveFavorite = (recipeId) => {
    removeFavorite(recipeId);
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <div className="no-favorites">
          <Heart size={48} className="empty-heart" />
          <p>No favorite recipes yet.</p>
          <p>Start exploring and add some recipes to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>My Favorites ({favoriteRecipes.length})</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <div className="favorite-header">
              <h3 className="favorite-title">{recipe.title}</h3>
              <button
                onClick={() => handleRemoveFavorite(recipe.id)}
                className="remove-favorite-btn"
                aria-label="Remove from favorites"
                title="Remove from favorites"
              >
                <Heart size={20} fill="currentColor" />
              </button>
            </div>
            
            <p className="favorite-summary">{recipe.description?.summary}</p>
            
            <div className="favorite-preview">
              <h4>Ingredients Preview:</h4>
              <ul className="ingredients-preview">
                {recipe.description?.ingredients?.slice(0, 2).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
                {recipe.description?.ingredients?.length > 2 && (
                  <li className="more-items">... and {recipe.description.ingredients.length - 2} more</li>
                )}
              </ul>
            </div>

            <div className="favorite-actions">
              <Link 
                to={`/recipe/${recipe.id}`} 
                className="view-favorite-link"
              >
                <Eye size={16} />
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
