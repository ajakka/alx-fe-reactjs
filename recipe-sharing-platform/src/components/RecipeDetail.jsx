import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, ChevronLeft, Scale } from "lucide-react";
import data from "../data.json";

// Extended mock data with more details
const recipeData = {
  1: {
    id: 1,
    title: "Spaghetti Carbonara",
    summary:
      "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    image: "/api/placeholder/800/400",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 4,
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano, grated",
      "100g Parmigiano-Reggiano, grated",
      "2 cloves garlic, minced",
      "Black pepper, freshly ground",
      "Salt, to taste",
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Cook spaghetti according to package instructions.",
      "While pasta cooks, heat a large pan over medium heat. Add pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.",
      "Reserve 1 cup of pasta water before draining. Return pasta to pot.",
      "Working quickly, add the egg mixture to the pasta, stirring constantly. Add pancetta and its rendered fat.",
      "Add pasta water as needed to create a creamy sauce. Serve immediately with extra cheese and black pepper.",
    ],
    tips: [
      "Use room temperature eggs for the smoothest sauce",
      "Don't let the eggs scramble - remove the pan from heat when mixing",
      "Serve immediately while the pasta is hot",
    ],
  },
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setRecipe(recipeData[id]);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Recipe not found</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with hero image */}
      <div className="relative h-96">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200"
        >
          <ChevronLeft className="mr-1" />
          Back to Recipes
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              {recipe.title}
            </h1>
            <p className="text-xl text-gray-200">{recipe.summary}</p>
          </div>
        </div>
      </div>

      {/* Recipe content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-4">
              <Clock className="mr-2" />
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="font-semibold">
                  {parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Users className="mr-2" />
              <div>
                <p className="text-sm text-gray-600">Servings</p>
                <p className="font-semibold">{recipe.servings} people</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Scale className="mr-2" />
              <div>
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="font-semibold">Intermediate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingredients */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <Card>
            <CardContent className="p-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Instructions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">
                      {index + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Pro Tips</h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
