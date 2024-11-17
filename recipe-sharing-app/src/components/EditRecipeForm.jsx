import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

export const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) => state.getRecipeById(Number(id)));
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
  });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipe) return;

    updateRecipe(recipe.id, formData);
    navigate(`/recipe/${recipe.id}`);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded h-24"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder={`Ingredient ${index + 1}`}
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-500 hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Prep Time (mins)
          </label>
          <input
            type="number"
            value={formData.prepTime}
            onChange={(e) =>
              setFormData({ ...formData, prepTime: Number(e.target.value) })
            }
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Cook Time (mins)
          </label>
          <input
            type="number"
            value={formData.cookTime}
            onChange={(e) =>
              setFormData({ ...formData, cookTime: Number(e.target.value) })
            }
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
