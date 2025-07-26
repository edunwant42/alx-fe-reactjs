import { useState } from 'react';
import { Save, X } from 'lucide-react';
import useRecipeStore from './recipeStore';
import '../assets/css/EditRecipeForm.css';

const EditRecipeForm = ({ recipe, onSave, onCancel }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  
  const [title, setTitle] = useState(recipe.title);
  const [summary, setSummary] = useState(recipe.description.summary);
  const [ingredients, setIngredients] = useState(
    recipe.description.ingredients.join('\n')
  );
  const [instructions, setInstructions] = useState(
    recipe.description.instructions.join('\n')
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!title.trim() || !summary.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const updatedRecipe = {
      ...recipe,
      title: title.trim(),
      description: {
        summary: summary.trim(),
        ingredients: ingredients.split('\n').map(ing => ing.trim()).filter(ing => ing),
        instructions: instructions.split('\n').map(inst => inst.trim()).filter(inst => inst)
      }
    };

    updateRecipe(updatedRecipe);
    onSave();
  };

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief description of the recipe"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line):</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients, one per line"
            rows="8"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one per line):</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions, one per line"
            rows="8"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            <Save size={16} />
            Save Changes
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
