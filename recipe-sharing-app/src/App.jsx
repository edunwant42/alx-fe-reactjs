import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import WelcomeScreen from './components/WelcomeScreen'

import logoImg from './assets/img/icons/recipe-book-64.png';

import './assets/css/App.css'

import { useState, useEffect } from 'react';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowWelcome(false);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="App">
      {showWelcome ? (
        <WelcomeScreen fadeOut={fadeOut} />
      ) : (
        <>
          <h1 className="app-title">
            <img src={logoImg} alt="Recipe Sharing App Logo" />
            Recipe Sharing Application
          </h1>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <AddRecipeForm />
            <RecipeList />
          </div>
        </>
      )}
    </div>
  )
}

export default App
