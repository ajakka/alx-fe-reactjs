import React, { useEffect } from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FavoriteButton from "./FavoriteButton";

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, favorites } =
    useRecipeStore((state) => ({
      recommendations: state.recommendations,
      generateRecommendations: state.generateRecommendations,
      favorites: state.favorites,
    }));

  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  if (recommendations.length === 0) {
    return null; // Hide section if no recommendations
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((recipe) => (
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

export default RecommendationsList;
