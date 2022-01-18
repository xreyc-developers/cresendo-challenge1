import React, { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/Popup';
import RecipeItem from './components/RecipeItem';
const api_base_uri = 'http://localhost:3001/';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(api_base_uri + "recipes");
      const data = await response.json();
      setRecipes(data);
    }
    getRecipes();
  },[]);

  const showRecipeHandler = (recipe) => {
    setCurrentRecipe(recipe);
    setIsShowDetails(true);  
  }

  const togglePopup = () => {
    setIsShowDetails(prevState => !prevState);
  }

  return (
    <>
      {isShowDetails && <Popup togglePopup={togglePopup} recipe={currentRecipe} api_base_uri={api_base_uri}/>}
      <div className="container">
        <header>
          RECIPES
        </header>
        <main>
          <div className="row">
            {recipes.map(recipe => <RecipeItem 
              key={recipe.uuid} 
              recipe={recipe} 
              onClick={() => showRecipeHandler(recipe)}
              api_base_uri={api_base_uri}
            />)}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
