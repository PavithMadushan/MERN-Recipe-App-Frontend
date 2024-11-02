import React, { useState } from "react";

function CategoryFilter({ categories=[], onCategorySelect, selectedCategory }) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Limit the categories to the first 5 when showAllCategories is false
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      {visibleCategories.map((category) => (
        <button
          key={category.idCategory}
          onClick={() => onCategorySelect(category.strCategory)}
          className={`px-4 py-2 border rounded-full transition ${
            selectedCategory === category.strCategory
              ? "bg-rose-500 text-white border-rose-500"
              : "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
          }`}
        >
          {category.strCategory}
        </button>
      ))}

      {/* "+more" or "Show less" button */}
      {categories.length > 5 && (
        <button
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="px-4 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition"
        >
          {showAllCategories ? "Show less" : "+more"}
        </button>
      )}
    </div>
  );
}

export default CategoryFilter;
