import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
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
}));
