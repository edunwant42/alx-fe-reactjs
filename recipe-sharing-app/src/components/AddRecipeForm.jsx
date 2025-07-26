import { useState } from 'react';
import { Plus } from 'lucide-react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = ({ onClose }) => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Base64 string
  const [imagePreview, setImagePreview] = useState(null);

  // Parse the description into summary, ingredients, instructions
  const parseDescription = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    let summary = '';
    let ingredients = [];
    let instructions = [];
    let currentSection = 'summary';
    for (let line of lines) {
      if (line.toLowerCase().includes('ingredients:')) {
        currentSection = 'ingredients';
        continue;
      } else if (line.toLowerCase().includes('instructions:')) {
        currentSection = 'instructions';
        continue;
      }
      if (currentSection === 'summary') {
        summary += (summary ? ' ' : '') + line;
      } else if (currentSection === 'ingredients') {
        const cleanIngredient = line.replace(/^[-•*]\s*/, '').trim();
        if (cleanIngredient) ingredients.push(cleanIngredient);
      } else if (currentSection === 'instructions') {
        const cleanInstruction = line.replace(/^\d+\.\s*/, '').trim();
        if (cleanInstruction) instructions.push(cleanInstruction);
      }
    }
    return {
      summary: summary || 'No description provided',
      ingredients: ingredients.length > 0 ? ingredients : ['No ingredients listed'],
      instructions: instructions.length > 0 ? instructions : ['No instructions provided']
    };
  };

  // Handle image file selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const parsed = parseDescription(description);
    addRecipe({
      id: Date.now(),
      title: title.trim(),
      description: parsed,
      image: image || null
    });
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    if (onClose) onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add New Recipe</h2>
        <label htmlFor="recipe-title" className="recipe-label">Recipe Title</label>
        <input
          className='recipe-title-input'
          id="recipe-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="Recipe Title"
        />
        <label htmlFor="recipe-description" className="recipe-label">Recipe Description</label>
        <textarea
          id="recipe-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={8}
          placeholder={
            'Write a summary, then Ingredients: and Instructions; Example:\n\n' +
            'Classic French Press Coffee\n' +
            '\nIngredients:\n' +
            '- 30g ground coffee\n' +
            '- 500ml hot water\n' +
            '\nInstructions:\n' +
            '1. Heat water to 200F\n' +
            '2. Add coffee to press\n' +
            '3. Pour water and steep 4 minutes\n' +
            '4. Press and serve'
          }
          style={{ minHeight: '200px', width: '100%' }}
        />
        <label htmlFor="recipe-image" className="recipe-label">Recipe Image (optional)</label>
        <input
          id="recipe-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '16px' }}
        />
        {imagePreview && (
          <div style={{ marginBottom: '16px' }}>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '8px' }} />
          </div>
        )}
        <div className="add-recipe-actions">
          <button type="submit">
            <Plus className='add-recipe-icon' size={16} />
            Add Recipe
          </button>
          {onClose && (
            <button type="button" className="close-btn" onClick={onClose}>Close</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
