import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import WelcomeScreen from './components/WelcomeScreen'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'

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

  if (showWelcome) {
    return (
      <div className="App">
        <WelcomeScreen fadeOut={fadeOut} />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <h1 className="app-title">
          <img src={logoImg} alt="Recipe Sharing App Logo" />
          Recipe Sharing Application
        </h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
