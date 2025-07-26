import { create } from 'zustand'
// import recipesData from '../assets/recipes/recipes.json'

// Helper function outside the store to avoid infinite loops
const filterRecipesByTerm = (recipes, term) => {
  if (!term.trim()) return recipes;
  
  const searchTerm = term.toLowerCase();
  return recipes.filter(recipe => {
    // Search in recipe title
    const titleMatch = recipe.title.toLowerCase().includes(searchTerm);
    
    // Search in recipe summary
    const summaryMatch = recipe.description?.summary?.toLowerCase().includes(searchTerm);
    
    // Search in ingredients
    const ingredientsMatch = recipe.description?.ingredients?.some(ingredient =>
      ingredient.toLowerCase().includes(searchTerm)
    );
    
    // Search in instructions
    const instructionsMatch = recipe.description?.instructions?.some(instruction =>
      instruction.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || summaryMatch || ingredientsMatch || instructionsMatch;
  });
};

const useRecipeStore = create((set) => ({
  // recipes: recipesData, // Load recipes from JSON file
  recipes: [], // Initialize with an empty array
  searchTerm: '',
  filteredRecipes: [], // This will be updated when recipes change
  
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return { 
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: filterRecipesByTerm(recipes, state.searchTerm)
  })),
  
  setSearchTerm: (term) => set((state) => ({
    searchTerm: term,
    filteredRecipes: filterRecipesByTerm(state.recipes, term)
  }))
}));

export default useRecipeStore;
