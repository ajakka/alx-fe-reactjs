import React from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Heart } from "lucide-react";

const FavoriteButton = ({ recipeId }) => {
  const { addFavorite, removeFavorite, isFavorite } = useRecipeStore(
    (state) => ({
      addFavorite: state.addFavorite,
      removeFavorite: state.removeFavorite,
      isFavorite: state.isFavorite,
    })
  );

  const isFav = isFavorite(recipeId);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when used in a link
    if (isFav) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFav
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-500"
      }`}
    >
      <Heart className={`h-6 w-6 ${isFav ? "fill-current" : ""}`} />
    </button>
  );
};

export default FavoriteButton;
