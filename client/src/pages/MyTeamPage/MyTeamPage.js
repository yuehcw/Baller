import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayerGridList from "../../components/PlayerList/PlayerGridList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SearchPlayers from "../../components/SearchPlayer/SearchPlayers";
import { ToolbarContext } from "../../context/ToolbarContext";
import { UserContext } from "../../context/UserContext";
import MyTeamToolbar from "../../components/Toolbar/MyTeamToolbar";
import "./MyTeamPage.css";

const MyTeamPage = () => {
  const { user, refreshUserData } = useContext(UserContext);
  const [myPlayers, setMyPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const { selectedPlayer, setSelectedPlayer } = useContext(ToolbarContext);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [priceRange, setPriceRange] = useState([
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);
  const [positionFilter, setPositionFilter] = useState("");

  useEffect(() => {
    if (user) {
      setMyPlayers(user.myTeam);
    } else {
      refreshUserData();
    }
  }, [user, refreshUserData]);

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

  const availablePlayers = players.filter(
    (player) => player.available === true,
  );

  const guards = myPlayers.filter(
    (player) => player && player.position && player.position.includes("G"),
  );
  const forwards = myPlayers.filter(
    (player) => player && player.position && player.position.includes("F"),
  );
  const centers = myPlayers.filter(
    (player) => player && player.position && player.position.includes("C"),
  );

  return (
    <div className="myTeamPage-content">
      <div className="main-content">
        <div className="left-panel">
          <PlayerGridList title="Guards" players={guards} />
          <PlayerGridList title="Forwards" players={forwards} />
          <PlayerGridList title="Centers" players={centers} />
        </div>
        <div className="right-panel">
          <SearchPlayers
            players={players}
            setPriceRange={setPriceRange}
            setPositionFilter={setPositionFilter}
          />
          <PlayerList
            players={availablePlayers}
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
          <MyTeamToolbar
            playerGC={selectedPlayer.currentIndex}
            playerId={selectedPlayer._id}
            onPlayerUnavailable={() => {}}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;
