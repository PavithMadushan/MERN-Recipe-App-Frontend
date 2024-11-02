import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MealDetails() {
  const { id } = useParams(); // Get the meal ID from the URL
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    // Fetch meal details by ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
      });
  }, [id]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded-lg mb-4" />
      <h2 className="text-lg font-semibold">Instructions:</h2>
      <p className="my-4">{meal.strInstructions}</p>
      <h2 className="text-lg font-semibold">Ingredients:</h2>
      <ul className="list-disc pl-6 my-4">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          return (
            ingredient && (
              <li key={i}>
                {measure} {ingredient}
              </li>
            )
          );
        })}
      </ul>
      {meal.strYoutube && (
        <div className="my-4">
          <h2 className="text-lg font-semibold">Video Tutorial:</h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default MealDetails;
