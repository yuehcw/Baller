import React, { useContext, useEffect, useState } from "react";
import PlayerGridList from "../../components/PlayerList/PlayerGridList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SearchPlayers from "../../components/SearchPlayer/SearchPlayers";
import MyTeamToolbar from "../../components/Toolbar/MyTeamToolbar";
import adding from "../../image/adding.png";
import { ToolbarContext } from "../../context/ToolbarContext";
import { UserContext } from "../../context/UserContext";
import { PlayersContext } from "../../context/PlayersContext";
import { Empty } from "antd";
import "./MyTeamPage.css";
import axios from "axios";

const MyTeamPage = () => {
  const { user, refreshUserData } = useContext(UserContext);
  const { players, setPlayers, refreshPlayersData } =
    useContext(PlayersContext);
  const { selectedPlayer, setSelectedPlayer } = useContext(ToolbarContext);
  const [myPlayers, setMyPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [positionFilter, setPositionFilter] = useState("");
  const [priceRange, setPriceRange] = useState([
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);

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
  }, [players]);

  const guards = myPlayers.filter(
    (player) => player && player.position && player.position.includes("G"),
  );
  const forwards = myPlayers.filter(
    (player) => player && player.position && player.position.includes("F"),
  );
  const centers = myPlayers.filter(
    (player) => player && player.position && player.position.includes("C"),
  );

  const [toolbarOpen, setToolbarOpen] = useState(false);

  const isEmpty =
    guards.length === 0 && forwards.length === 0 && centers.length === 0;

  const onCloseToolbar = () => {
    setSelectedPlayerId(null);
    setSelectedPlayer(null);
    setToolbarOpen(false);
  };

  const handleSelectPlayer = (id, player) => {
    setSelectedPlayerId(id);
    setSelectedPlayer(player);
    setToolbarOpen(true);
  };

  return (
    <div className="myTeamPage-content">
      <div className="main-content">
        <div className="left-panel">
          {isEmpty ? (
            <div className="empty-container">
              <Empty
                image={adding}
                imageStyle={{
                  height: 300,
                  width: 300,
                  color: "#333",
                  borderRadius: "50%",
                }}
                description={false}
              />
            </div>
          ) : (
            <>
              {guards.length > 0 && (
                <PlayerGridList title="Guards" players={guards} />
              )}
              {forwards.length > 0 && (
                <PlayerGridList title="Forwards" players={forwards} />
              )}
              {centers.length > 0 && (
                <PlayerGridList title="Centers" players={centers} />
              )}
            </>
          )}
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
            toolbarOpen={toolbarOpen}
            handleSelectPlayer={handleSelectPlayer}
          />
        </div>
      </div>
      {selectedPlayer && (
        <div>
          <MyTeamToolbar
            playerGC={selectedPlayer.currentIndex}
            player_Id={selectedPlayer._id}
            playerId={selectedPlayer.id}
            playerShares={selectedPlayer.shares}
            setSelectedPlayer={setSelectedPlayer}
            onTransactionComplete={refreshPlayersData}
            onClose={onCloseToolbar}
          />
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;
