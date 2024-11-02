import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CategoryFilter from "./components/CategoryFilter";
import MealCard from "./components/MealCard";
import Navbar from "./components/Navbar";
import MealDetails from "./components/MealDetails";
import Favourite from "./components/Favourite";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));


  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories) || []);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => setMeals(data.meals));
    }
  }, [selectedCategory]);

  // Fetch favorite recipes if logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn) return;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = response.data.favorites.map((fav) => fav.idMeal); // Replace '_id' with the correct key if different
        setFavoriteIds(ids);
        console.log("this is already added ids",response);
        
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);


  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CategoryFilter
                categories={categories}
                onCategorySelect={(category) => setSelectedCategory(category)}
                selectedCategory={selectedCategory}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} isFavorite={favoriteIds.includes(meal.idMeal)} allowToggle={true}/>
                ))}
              </div>
            </>
          }
        />
        <Route path="/favorites" element={<Favourite />} /> Add the Favorites
        route
        <Route path="/meal/:id" element={<MealDetails />} />
      </Routes>
    </div>
  );
}

export default App;
