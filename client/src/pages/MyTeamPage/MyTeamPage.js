import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerGridList from "../../components/PlayerList/PlayerGridList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SearchPlayers from "../../components/SearchPlayer/SearchPlayers";
import "./MyTeamPage.css";
import MyTeamToolbar from "../../components/MyTeamToolbar/MyTeamToolbar";

const MyTeamPage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/nba/nba-Players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="myteampage-content">
      <div className="main-content">
        <div className="left-panel">
          <PlayerGridList title="Guards" players={players.slice(0, 3)} />
          <PlayerGridList title="Forwards" players={players.slice(3, 6)} />
          <PlayerGridList title="Centers" players={players.slice(6, 9)} />
        </div>
        <div className="right-panel">
          <SearchPlayers />
          <PlayerList
            players={players}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>
      </div>
      {selectedPlayer && (
        <div className="myteampage-toolbar">
          <MyTeamToolbar players={17} remainingBudget={97.5} />
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;