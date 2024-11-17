import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // Existing actions
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
    })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  getRecipeById: (id) => get().recipes.find((recipe) => recipe.id === id),
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // New actions for favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
      recommendations: [], // Reset recommendations when favorites change
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
      recommendations: [], // Reset recommendations when favorites change
    })),
  isFavorite: (recipeId) => get().favorites.includes(recipeId),

  // Recommendations based on ingredients from favorite recipes
  generateRecommendations: () =>
    set((state) => {
      const favoriteRecipes = state.favorites
        .map((id) => state.recipes.find((recipe) => recipe.id === id))
        .filter(Boolean);

      // Get all ingredients from favorite recipes
      const favoriteIngredients = favoriteRecipes
        .flatMap((recipe) => recipe.ingredients || [])
        .reduce((acc, ingredient) => {
          acc[ingredient] = (acc[ingredient] || 0) + 1;
          return acc;
        }, {});

      // Find recipes that share ingredients with favorites
      const recommendations = state.recipes
        .filter((recipe) => !state.favorites.includes(recipe.id)) // Exclude favorites
        .map((recipe) => {
          const score = (recipe.ingredients || []).reduce(
            (sum, ingredient) => sum + (favoriteIngredients[ingredient] || 0),
            0
          );
          return { recipe, score };
        })
        .sort((a, b) => b.score - a.score) // Sort by matching ingredients
        .slice(0, 3) // Get top 3 recommendations
        .map(({ recipe }) => recipe);

      return { recommendations };
    }),
}));
