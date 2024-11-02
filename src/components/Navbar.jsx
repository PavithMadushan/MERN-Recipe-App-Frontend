import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function Navbar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Home") {
      navigate("/"); // Navigate to the home page
    } else if (tab === "Favourite") {
      navigate("/favorites"); // Navigate to the favorite page
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        
        <span className="text-2xl font-bold text-pink-500">coek</span>
      </div>
      <div className="flex space-x-6 text-lg font-semibold">
        <span
          onClick={() => handleTabClick("Home")}
          className={`cursor-pointer ${
            activeTab === "Home" ? "underline text-rose-500" : ""
          }`}
        >
          Home
        </span>
        <span
          onClick={() => handleTabClick("Favourite")}
          className={`cursor-pointer ${
            activeTab === "Favourite" ? "underline text-rose-500" : ""
          }`}
        >
          Favourite
        </span>
      </div>
      
      <button className="cursor-pointer" onClick={() => navigate("/signup")}>

      <FaSignInAlt className="w-6 h-6 cursor-pointer" />

      </button>
    </div>
  );
}

export default Navbar;
