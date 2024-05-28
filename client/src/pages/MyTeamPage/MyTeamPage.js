import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayerGridList from "../../components/PlayerList/PlayerGridList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SearchPlayers from "../../components/SearchPlayer/SearchPlayers";
import { ToolbarContext } from "../../context/ToolbarContext";
import MyTeamToolbar from "../../components/Toolbar/MyTeamToolbar";
import "./MyTeamPage.css";

const MyTeamPage = () => {
  const [players, setPlayers] = useState([]);
  const { selectedPlayer, setSelectedPlayer } = useContext(ToolbarContext);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [priceRange, setPriceRange] = useState([
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);
  const [positionFilter, setPositionFilter] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/nba/nba-Players`,
          { headers: { noAuth: true } },
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="myTeamPage-content">
      <div className="main-content">
        <div className="left-panel">
          <PlayerGridList title="Guards" players={players.slice(0, 3)} />
          <PlayerGridList title="Forwards" players={players.slice(3, 6)} />
          <PlayerGridList title="Centers" players={players.slice(6, 9)} />
        </div>
        <div className="right-panel">
          <SearchPlayers
            players={players}
            setPriceRange={setPriceRange}
            setPositionFilter={setPositionFilter}
          />
          <PlayerList
            players={players}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            selectedPlayerId={selectedPlayerId}
            setSelectedPlayerId={setSelectedPlayerId}
            priceRange={priceRange}
            positionFilter={positionFilter}
          />
        </div>
      </div>
      {selectedPlayer && (
        <div>
          <MyTeamToolbar playerGC={selectedPlayer.currentIndex} />
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;
