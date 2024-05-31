import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const refreshPlayersData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/nba/nba-Players`,
        { headers: { noAuth: true } },
      );
      console.log("Fetched players data:", response.data);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        refreshPlayersData,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
