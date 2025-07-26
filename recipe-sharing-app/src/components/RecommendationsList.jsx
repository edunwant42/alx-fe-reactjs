import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, Heart } from 'lucide-react';
import useRecipeStore from './recipeStore';
import '../assets/css/RecommendationsList.css';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const addFavorite = useRecipeStore(state => state.addFavorite);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length]);

  const handleAddToFavorites = (recipeId) => {
    addFavorite(recipeId);
  };

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>
          <Sparkles size={24} />
          Recommended for You
        </h2>
        <div className="no-recommendations">
          <Sparkles size={48} className="empty-sparkles" />
          <p>No recommendations yet.</p>
          <p>Add some recipes to your favorites to get personalized suggestions!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <h2>
        <Sparkles size={24} />
        Recommended for You
      </h2>
      <p className="recommendations-subtitle">
        Based on your favorite recipes, we think you'll love these:
      </p>
      
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-header">
              <h3 className="recommendation-title">{recipe.title}</h3>
              <button
                onClick={() => handleAddToFavorites(recipe.id)}
                className="add-favorite-btn"
                aria-label="Add to favorites"
                title="Add to favorites"
              >
                <Heart size={18} />
              </button>
            </div>
            
            <p className="recommendation-summary">{recipe.description?.summary}</p>
            
            <div className="recommendation-preview">
              <h4>Key Ingredients:</h4>
              <div className="ingredients-tags">
                {recipe.description?.ingredients?.slice(0, 3).map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">
                    {ingredient.split(' ').slice(0, 2).join(' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="recommendation-actions">
              <Link 
                to={`/recipe/${recipe.id}`} 
                className="view-recommendation-link"
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

export default RecommendationsList;
