import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

export const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId);
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
    >
      Delete Recipe
    </button>
  );
};
