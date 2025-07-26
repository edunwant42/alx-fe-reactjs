import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import WelcomeScreen from './components/WelcomeScreen'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

import logoImg from './assets/img/icons/recipe-book-64.png';

import './assets/css/App.css'

import { useState, useEffect } from 'react';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowWelcome(false);
      }, 500);
    }, 3000);
    return () => clearTimeout(timer);
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
        <nav style={{ marginBottom: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <NavLink to="/recommended" className="nav-link">Recommended</NavLink>
          <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
          <NavLink to="/recipes" className="nav-link">All Recipes</NavLink>
        </nav>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/recommended" element={<RecommendationsList />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recipes" element={
              <>
                <SearchBar />
                <button className="main-action-btn" style={{marginBottom: '20px'}} onClick={() => setShowAddForm(true)}>
                  + Add New Recipe
                </button>
                {showAddForm && (
                  <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <AddRecipeForm onClose={() => setShowAddForm(false)} />
                    </div>
                  </div>
                )}
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/" element={
              <>
                <SearchBar />
                <button className="main-action-btn" style={{marginBottom: '20px'}} onClick={() => setShowAddForm(true)}>
                  + Add New Recipe
                </button>
                {showAddForm && (
                  <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <AddRecipeForm onClose={() => setShowAddForm(false)} />
                    </div>
                  </div>
                )}
                <RecipeList />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
