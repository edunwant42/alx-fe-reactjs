import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import useRecipeStore from './recipeStore';
import '../assets/css/DeleteRecipeButton.css';

const DeleteRecipeButton = ({ recipeId, recipeName }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipeName}"?`)) {
      deleteRecipe(recipeId);
      navigate('/'); // Navigate back to home page after deletion
    }
  };

  return (
    <button 
      className="delete-button" 
      onClick={handleDelete}
      aria-label={`Delete ${recipeName}`}
    >
      <Trash2 size={16} />
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
