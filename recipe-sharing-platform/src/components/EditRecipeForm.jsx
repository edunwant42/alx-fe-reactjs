import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get recipe from localStorage
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      try {
        const recipes = JSON.parse(storedRecipes);
        const foundRecipe = recipes.find(r => r.id === id);
        setRecipe(foundRecipe);
        
        if (foundRecipe) {
          setFormData({
            title: foundRecipe.title,
            summary: foundRecipe.summary,
            ingredients: Array.isArray(foundRecipe.ingredients) 
              ? foundRecipe.ingredients.join('\n') 
              : foundRecipe.ingredients,
            instructions: Array.isArray(foundRecipe.instructions) 
              ? foundRecipe.instructions.join('\n') 
              : foundRecipe.instructions,
            image: foundRecipe.image
          });
        }
      } catch (error) {
        console.error('Error parsing stored recipes:', error);
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    // Summary validation
    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe summary is required";
    }

    // Ingredients validation
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = "Please add at least 2 ingredients (one per line)";
      }
    }

    // Instructions validation
    if (!formData.instructions.trim()) {
      newErrors.instructions = "Preparation steps are required";
    } else {
      const instructionsList = formData.instructions.split('\n').filter(item => item.trim());
      if (instructionsList.length < 2) {
        newErrors.instructions = "Please add at least 2 preparation steps (one per line)";
      }
    }

    // Image URL validation
    if (!formData.image.trim()) {
      newErrors.image = "Recipe image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      const updatedRecipe = {
        id: id,
        title: formData.title,
        summary: formData.summary,
        image: formData.image,
        ingredients: formData.ingredients.split('\n').filter(item => item.trim()),
        instructions: formData.instructions.split('\n').filter(item => item.trim())
      };

      // Update recipe in localStorage
      try {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
          const recipes = JSON.parse(storedRecipes);
          const recipeIndex = recipes.findIndex(r => r.id === id);
          if (recipeIndex !== -1) {
            recipes[recipeIndex] = updatedRecipe;
            localStorage.setItem('recipes', JSON.stringify(recipes));
            console.log("Recipe Updated:", updatedRecipe);
          }
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
      }

      setIsSubmitting(false);
      
      // Redirect to recipe detail page
      navigate(`/recipe/${id}`);
    }, 1000);
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Recipe Button */}
        <Link
          to={`/recipe/${id}`}
          className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Recipe
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Recipe</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.title 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Enter recipe title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Recipe Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Summary *
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
                    errors.summary 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Brief description of your recipe"
                />
                {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
              </div>

              {/* Recipe Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.image 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="https://example.com/recipe-image.jpg"
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              </div>

              {/* Ingredients */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients * <span className="text-gray-500 text-xs">(one per line, minimum 2)</span>
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
                    errors.ingredients 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
                />
                {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
              </div>

              {/* Instructions */}
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                  Preparation Steps * <span className="text-gray-500 text-xs">(one per line, minimum 2)</span>
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 resize-vertical ${
                    errors.instructions 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Preheat oven to 350°F&#10;Mix dry ingredients in a bowl&#10;Add wet ingredients and stir&#10;Bake for 25-30 minutes"
                />
                {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-6 rounded-md font-medium text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    'Update Recipe'
                  )}
                </button>
                
                <Link
                  to={`/recipe/${id}`}
                  className="flex-1 sm:flex-initial py-3 px-6 border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeForm;
