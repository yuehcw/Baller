import React, { useState } from "react";
import "./SearchBox.css";
import { SearchOutlined } from "@ant-design/icons";

const SearchBox = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div
      className={`search-box ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {!isActive && <SearchOutlined className="search-icon" />}
      {isActive && (
        <input
          type="text"
          className="search-input"
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchBox;
