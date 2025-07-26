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

// Utility functions for localStorage
const LS_RECIPES_KEY = 'recipeApp_recipes';
const LS_FAVORITES_KEY = 'recipeApp_favorites';

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const useRecipeStore = create((set, get) => ({
  recipes: loadFromStorage(LS_RECIPES_KEY, []),
  searchTerm: '',
  filteredRecipes: [],
  favorites: loadFromStorage(LS_FAVORITES_KEY, []),
  recommendations: [],
  
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    saveToStorage(LS_RECIPES_KEY, updatedRecipes);
    return {
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    saveToStorage(LS_RECIPES_KEY, updatedRecipes);
    return {
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    const updatedFavorites = state.favorites.filter(favId => favId !== id);
    saveToStorage(LS_RECIPES_KEY, updatedRecipes);
    saveToStorage(LS_FAVORITES_KEY, updatedFavorites);
    return {
      recipes: updatedRecipes,
      filteredRecipes: filterRecipesByTerm(updatedRecipes, state.searchTerm),
      favorites: updatedFavorites
    };
  }),
  
  setRecipes: (recipes) => set((state) => {
    saveToStorage(LS_RECIPES_KEY, recipes);
    return {
      recipes,
      filteredRecipes: filterRecipesByTerm(recipes, state.searchTerm)
    };
  }),
  
  setSearchTerm: (term) => set((state) => ({
    searchTerm: term,
    filteredRecipes: filterRecipesByTerm(state.recipes, term)
  })),
  
  // Favorites functionality
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      const updatedFavorites = [...state.favorites, recipeId];
      saveToStorage(LS_FAVORITES_KEY, updatedFavorites);
      return { favorites: updatedFavorites };
    }
    return state;
  }),

  removeFavorite: (recipeId) => set((state) => {
    const updatedFavorites = state.favorites.filter(id => id !== recipeId);
    saveToStorage(LS_FAVORITES_KEY, updatedFavorites);
    return { favorites: updatedFavorites };
  }),
  
  // Check if a recipe is favorited
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Generate recommendations based on favorites and ingredients
  generateRecommendations: () => set((state) => {
    console.log('🔍 Generating recommendations...');
    console.log('📊 Total recipes:', state.recipes.length);
    console.log('❤️ Favorites:', state.favorites);
    
    if (state.favorites.length === 0) {
      console.log('❌ No favorites yet - no recommendations');
      return { recommendations: [] };
    }
    
    // Get favorite recipes
    const favoriteRecipes = state.recipes.filter(recipe => 
      state.favorites.includes(recipe.id)
    );
    
    console.log('📝 Favorite recipes:', favoriteRecipes.map(r => r.title));
    
    // Extract common ingredients from favorites
    const favoriteIngredients = new Set();
    // Common measurement words to exclude
    const measurementWords = new Set(['tsp', 'tbsp', 'cup', 'cups', 'oz', 'lb', 'lbs', 'ml', 'grams', 'kg', 'ounce', 'ounces', 'pound', 'pounds', 'teaspoon', 'tablespoon', 'powder', 'salt', 'pepper']);
    
    favoriteRecipes.forEach(recipe => {
      console.log(`🥘 Processing ingredients for "${recipe.title}":`, recipe.description?.ingredients);
      recipe.description?.ingredients?.forEach(ingredient => {
        // Extract key words from ingredients (first 2 words usually)
        const keyWords = ingredient.toLowerCase().split(' ').slice(0, 3); // Get 3 words for better matching
        keyWords.forEach(word => {
          // Only add meaningful ingredient words (not measurements)
          if (word.length > 3 && !measurementWords.has(word) && !word.match(/^\d/)) {
            favoriteIngredients.add(word);
          }
        });
      });
    });
    
    console.log('🔑 Key ingredients extracted:', Array.from(favoriteIngredients));
    
    // Find recipes with similar ingredients (not already favorited)
    const candidateRecipes = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id));
      
    console.log('🎯 Candidate recipes for recommendations:', candidateRecipes.map(r => r.title));
    
    const recommendations = candidateRecipes
      .map(recipe => {
        let score = 0;
        const matchedIngredients = [];
        recipe.description?.ingredients?.forEach(ingredient => {
          const ingredientWords = ingredient.toLowerCase().split(' ');
          ingredientWords.forEach(word => {
            // Apply same filtering for scoring
            if (word.length > 3 && !measurementWords.has(word) && !word.match(/^\d/) && favoriteIngredients.has(word)) {
              score++;
              matchedIngredients.push(word);
            }
          });
        });
        console.log(`📊 Recipe "${recipe.title}" scored: ${score}, matched ingredients: [${matchedIngredients.join(', ')}]`);
        return { recipe, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3) // Top 3 recommendations
      .map(item => item.recipe);
    
    console.log('✨ Final recommendations:', recommendations.map(r => r.title));
    return { recommendations };
  })
}));

export default useRecipeStore;
