import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MealCard from "./MealCard";
import CategoryFilter from "./CategoryFilter";

function Favourite() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteIds = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Extract only the recipe IDs from the response data
      const ids = response.data.favorites.map((fav) => fav.idMeal); // Adjust key if different
      setFavoriteIds(ids);
      
      console.log("response is :", response);
      console.log("Extracted favorite IDs:", ids);
        
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteIds();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (favoriteIds.length === 0) return;
  
      try {
        const recipeDetails = await Promise.all(
          favoriteIds.map(async (recipeId) => {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
            return response.data.meals[0];
          })
        );
  
        setFavoriteRecipes(recipeDetails);
        console.log("Fetched recipe details:", recipeDetails);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
  
    fetchFavoriteRecipes();
  }, [favoriteIds]);

  if (!isLoggedIn) {
    return <p>You need to log in to view your favorite recipes.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      
      <CategoryFilter /> {/* Optional if you want to allow filtering within favorites */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {favoriteRecipes.map((recipe) => (
          <MealCard key={recipe.idMeal} isFavorite={true} meal={recipe} allowToggle={false}/>
        ))}
      </div>
    </div>
  );
}

export default Favourite;
