import { useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';
import '../assets/css/RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="not-found">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Recipes
        </Link>
        <div className="recipe-actions">
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={16} />
            {isEditing ? 'Cancel' : 'Edit Recipe'}
          </button>
          <DeleteRecipeButton 
            recipeId={recipe.id} 
            recipeName={recipe.title}
          />
        </div>
      </div>

      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="recipe-content">
          <h1 className="recipe-title">{recipe.title}</h1>
          
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title + ' image'}
              style={{
                maxWidth: '100%',
                maxHeight: '320px',
                borderRadius: '12px',
                marginBottom: '24px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
          )}

          <div className="recipe-summary">
            <p>{recipe.description.summary}</p>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.description.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">Instructions</h3>
            <ol className="instructions-list">
              {recipe.description.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
