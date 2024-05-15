import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  const handleItemClick = (key) => {
    setActiveItem(key);
    navigate(`/${key}`);
  };

  return (
    <div className="menu-container">
      <div className="menu-left">
        <img src="/path/to/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="menu-center">
        <div
          className={`menu-item ${activeItem === "home" ? "active" : ""}`}
          onClick={() => handleItemClick("home")}
        >
          Home
        </div>
        <div
          className={`menu-item ${activeItem === "myteam" ? "active" : ""}`}
          onClick={() => handleItemClick("myteam")}
        >
          My Team
        </div>
        <div
          className={`menu-item ${activeItem === "howtoplay" ? "active" : ""}`}
          onClick={() => handleItemClick("howtoplay")}
        >
          How to Play
        </div>
      </div>
      <div className="menu-right">
        <div className="menu-item" onClick={() => handleItemClick("signin")}>
          Sign In
        </div>
      </div>
    </div>
  );
};

export default Header;
