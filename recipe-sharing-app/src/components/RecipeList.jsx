import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import useRecipeStore from "./RecipeStore";
import "../assets/css/RecipeList.css";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>No recipes yet. Add your first recipe!</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3 className="recipe-title">{recipe.title}</h3>
              
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
