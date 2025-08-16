import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Find the recipe with the matching ID
    const foundRecipe = recipesData.find((recipe) => recipe.id === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Recipe Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-80 object-contain object-center bg-white"
            />
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {recipe.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Ingredients Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 border-b border-gray-100 pb-2"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex text-gray-700">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <span className="pt-1 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
