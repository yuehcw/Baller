import React from "react";
import "./FlagContainer.css";

const FlagContainer = ({ flagSrc, text }) => {
  return (
    <div className="flag-container">
      <img src={flagSrc} alt={text} className="flag-image" />
      <span className="flag-text">{text}</span>
    </div>
  );
};

export default FlagContainer;
