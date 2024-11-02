import React, { useState,useEffect }  from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart } from "react-icons/fa";

function MealCard({ meal,isFavorite: initialFavoriteStatus,allowToggle = true }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Set initial favorite status from prop
    setIsFavorite(initialFavoriteStatus);
  }, [initialFavoriteStatus]);

  const handleFavoriteClick = async () => {
    if (!allowToggle) return;
    console.log("the fav status is",isFavorite);
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to add favorites!");
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      const response=await axios.post(
        "https://mern-recipe-app-backend-production.up.railway.app/api/user/add",
        { recipeId: meal.idMeal },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in headers
          },
        }
      );

      if (response.data.message === "Recipe added to favorites") {
        setIsFavorite(true); // Change icon color to red on success
      }
      alert("Recipe added to favorites!");
    } catch (error) {
      console.error(error);
      alert("Already added as a favorite recipe.");
    }
  };


  return (
    
      <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4">
        <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-lg" />
        </Link>
        
        
        <div className="mt-2">
          <div className="flex justify-center">
          <p className="text-sm text-gray-500 mr-2">Soups</p>
          <button onClick={handleFavoriteClick}>
          {/* <span style={{ color: isFavorite ? "red" : "gray" }}>***</span> */}
          <span><FaHeart style={{color: isFavorite ? "red" : "gray"}}/></span>
          </button>
          </div>
          
          <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
        </div>
      </div>
    
  );
}

export default MealCard;
