import React, { useEffect } from "react";
import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No recipes found matching your search.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredRecipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{recipe.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
