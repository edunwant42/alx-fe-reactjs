import { create } from 'zustand'
// import recipesData from '../recipes/recipes.json'

const useRecipeStore = create((set) => ({
  // recipes: recipesData, // Load recipes from JSON file
  recipes: [],
  addRecipe: (newRecipe) => set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;
