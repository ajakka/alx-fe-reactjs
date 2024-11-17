import React from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FavoriteButton from "./FavoriteButton";

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites
      .map((id) => state.recipes.find((recipe) => recipe.id === id))
      .filter(Boolean)
  );

  if (favorites.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded">
        <p>No favorite recipes yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <CardTitle className="text-xl pr-10">{recipe.title}</CardTitle>
                <div className="absolute top-4 right-4">
                  <FavoriteButton recipeId={recipe.id} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">
                  {recipe.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
