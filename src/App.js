import React, { useState, useEffect } from 'react';
import './App.css';
import Popup from './components/Popup';
import RecipeItem from './components/RecipeItem';
import logo from './assets/1.png';
import menu from './assets/2.png';

const api_base_uri = 'http://localhost:3001/';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    const dataPrep = async () => {
      // GET ALL RECIPES
      const r_response = await fetch(api_base_uri + "recipes");
      const r_data = await r_response.json();
      setRecipes(r_data);

      // GET ALL SPECIALS
      const s_response = await fetch(api_base_uri + "specials");
      const s_data = await s_response.json();
      setSpecials(s_data);
    }
    dataPrep();
  },[]);

  const showRecipeHandler = (recipe) => {
    let updatedIngredients = [];
    // GET SPECIAL PER INGREDIENTS
    recipe.ingredients.forEach(ingredient => {
      const filteredSpecial = specials.find(specialItem => specialItem.ingredientId === ingredient.uuid);
      if(filteredSpecial) {
        updatedIngredients.push({
          ...ingredient,
          title: filteredSpecial.title,
          type: filteredSpecial.type,
          text: filteredSpecial.text
        });
      } else {
        updatedIngredients.push(ingredient);
      }
    });
    // UPDATE INGREDIENTS
    recipe.ingredients = updatedIngredients;
    // UPDATE SELECTED RECIPE
    setCurrentRecipe(recipe);
    setIsShowDetails(true);  
  }

  const togglePopup = () => {
    setIsShowDetails(prevState => !prevState);
  }

  return (
    <>
      {isShowDetails && 
        <Popup 
          togglePopup={togglePopup}
          recipe={currentRecipe}
          api_base_uri={api_base_uri}
      />}

      
      <div className="container">
        <header>
          <img src={logo}/>
        </header>


        <main>
          <div className="content-menu">

            <img src={menu} />
          </div>

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