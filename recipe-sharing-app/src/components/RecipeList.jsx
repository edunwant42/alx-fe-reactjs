import useRecipeStore from "./RecipeStore";
import "./RecipeList.css";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>No recipes yet. Add your first recipe!</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3 className="recipe-title">{recipe.title}</h3>
``
              {/* Summary */}
              <p className="recipe-summary">{recipe.description.summary}</p>

              {/* Ingredients */}
              <div className="recipe-section">
                <h4 className="section-title">Ingredients</h4>
                <ul className="ingredients-list">
                  {recipe.description.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="recipe-section">
                <h4 className="section-title">Instructions</h4>
                <ol className="instructions-list">
                  {recipe.description.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
