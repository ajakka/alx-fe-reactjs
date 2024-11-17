import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AddRecipeForm } from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import { RecipeDetails } from "./components/RecipeDetails";
import { EditRecipeForm } from "./components/EditRecipeForm";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link
            to="/"
            className="text-3xl font-bold hover:text-blue-500 transition-colors"
          >
            Recipe Sharing App
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/recipe/:id/edit" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
