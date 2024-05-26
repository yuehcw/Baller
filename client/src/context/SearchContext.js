import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const resetSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, resetSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
