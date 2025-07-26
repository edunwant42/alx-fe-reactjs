import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import useRecipeStore from "./recipeStore";
import "../assets/css/RecipeList.css";

const RecipeList = () => {
  const [page, setPage] = useState(1);
  const RECIPES_PER_PAGE = 6;
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Use filtered recipes if there's a search term, otherwise use all recipes
  const displayedRecipes = searchTerm.trim() ? filteredRecipes : recipes;
  const totalPages = Math.ceil(displayedRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = displayedRecipes.slice((page - 1) * RECIPES_PER_PAGE, page * RECIPES_PER_PAGE);

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
        <div>
          <div className="recipe-grid">
            {paginatedRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Recipe Image */}
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title + ' image'}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: 0,
                        display: 'block'
                      }}
                    />
                  )}
                  <h3 className="recipe-title" style={{ margin: 0 }}>{recipe.title}</h3>
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
          {/* Compact Pagination Bar */}
          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                className="pagination-btn"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>
              {/* Page numbers with ellipsis */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Show first, last, current, and neighbors; ellipsis for gaps
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - page) <= 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn${pageNum === page ? ' active' : ''}`}
                      onClick={() => setPage(pageNum)}
                      aria-current={pageNum === page ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                }
                // Ellipsis before/after current page
                if (
                  (pageNum === page - 2 && page > 3) ||
                  (pageNum === page + 2 && page < totalPages - 2)
                ) {
                  return <span key={pageNum} className="pagination-ellipsis">…</span>;
                }
                return null;
              })}
              <button
                className="pagination-btn"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
