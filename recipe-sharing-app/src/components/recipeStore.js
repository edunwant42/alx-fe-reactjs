import { create } from 'zustand'
// import recipesData from '../assets/recipes/recipes.json'

const useRecipeStore = create((set) => ({
  // recipes: recipesData, // Load recipes from JSON file
  recipes: [], // Initialize with an empty array
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;
