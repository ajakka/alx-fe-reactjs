import React from "react";
import { useRecipeStore } from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleSearch}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
