import { useState } from 'react';
import { Plus } from 'lucide-react';
import useRecipeStore from './recipeStore';



const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        // Remove only bullet points and dashes at the start, keep quantities
        const cleanIngredient = line.replace(/^[-•*]\s*/, '').trim();
        if (cleanIngredient) {
          ingredients.push(cleanIngredient);
        }
      } else if (currentSection === 'instructions') {
        // Remove only step numbers at the start (like "1. " or "2. ")
        const cleanInstruction = line.replace(/^\d+\.\s*/, '').trim();
        if (cleanInstruction) {
          instructions.push(cleanInstruction);
        }
      }
    }
    
    return {
      summary: summary || 'No description provided',
      ingredients: ingredients.length > 0 ? ingredients : ['No ingredients listed'],
      instructions: instructions.length > 0 ? instructions : ['No instructions provided']
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      const structuredDescription = parseDescription(description);
      addRecipe({ 
        id: Date.now(), 
        title, 
        description: structuredDescription 
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Recipe description with ingredients and instructions:

Classic French Press Coffee

Ingredients:
- 30g ground coffee
- 500ml hot water

Instructions:
1. Heat water to 200°F
2. Add coffee to press
3. Pour water and steep 4 minutes
4. Press and serve`}
            style={{ minHeight: '200px', width: '100%' }}
            required
          />
        </div>
        <button type="submit">
          <Plus className='add-recipe-icon' size={16} />
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
