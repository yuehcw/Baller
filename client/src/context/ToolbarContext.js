// ToolbarContext.js
import React, { createContext, useState } from "react";

export const ToolbarContext = createContext();

export const ToolbarProvider = ({ children }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <ToolbarContext.Provider value={{ selectedPlayer, setSelectedPlayer }}>
      {children}
    </ToolbarContext.Provider>
  );
};
