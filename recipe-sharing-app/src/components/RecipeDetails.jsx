import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) => state.getRecipeById(Number(id)));

  if (!recipe) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-red-500">Recipe not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Return to recipes
        </button>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{recipe.title}</CardTitle>
        {recipe.prepTime}
        <div className="text-sm text-gray-500">
          Prep Time: {recipe.prepTime} mins | Cook Time: {recipe.cookTime} mins
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {recipe.instructions}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeDetails;
