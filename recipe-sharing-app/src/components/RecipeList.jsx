import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import useRecipeStore from "./recipeStore";
import "../assets/css/RecipeList.css";

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Use filtered recipes if there's a search term, otherwise use all recipes
  const displayedRecipes = searchTerm.trim() ? filteredRecipes : recipes;

  const handleToggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      
      {/* Show search results info */}
      {searchTerm.trim() && (
        <div className="search-results-info">
          <p>
            {displayedRecipes.length === 0 
              ? `No recipes found for "${searchTerm}"` 
              : `Found ${displayedRecipes.length} recipe${displayedRecipes.length !== 1 ? 's' : ''} for "${searchTerm}"`
            }
          </p>
        </div>
      )}
      
      {displayedRecipes.length === 0 && !searchTerm.trim() ? (
        <div className="no-recipes">
          <p>No recipes yet. Add your first recipe!</p>
        </div>
      ) : displayedRecipes.length === 0 && searchTerm.trim() ? (
        <div className="no-search-results">
          <p>Try adjusting your search terms or browse all recipes.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {displayedRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-header">
                <h3 className="recipe-title">{recipe.title}</h3>
                <button
                  onClick={() => handleToggleFavorite(recipe.id)}
                  className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                  aria-label={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                  title={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart 
                    size={18} 
                    fill={favorites.includes(recipe.id) ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>
              
              {/* Summary */}
              <p className="recipe-summary">{recipe.description.summary}</p>

              {/* Ingredients */}
              <div className="recipe-section">
                <h4 className="section-title">Ingredients</h4>
                <ul className="ingredients-list">
                  {recipe.description.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                  {recipe.description.ingredients.length > 3 && (
                    <li className="more-items">... and {recipe.description.ingredients.length - 3} more</li>
                  )}
                </ul>
              </div>

              {/* View Details Link */}
              <div className="recipe-actions">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="view-details-link"
                >
                  <Eye size={16} />
                  View Full Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
