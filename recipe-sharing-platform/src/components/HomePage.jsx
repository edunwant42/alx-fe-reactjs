import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipesData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load mock data into state
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Recipe Sharing Platform</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-48 object-contain object-center"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{recipe.title}</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{recipe.summary}</p>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium text-sm mt-auto self-center"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
