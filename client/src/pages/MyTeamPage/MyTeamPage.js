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
  const [myPositionFilter, setMyPositionFilter] = useState("");
  const [priceRange, setPriceRange] = useState([
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const isEmpty = myPlayers.length === 0;

  const [toolbarOpen, setToolbarOpen] = useState(false);

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

  const handlePositionChange = (position) => {
    if (position === "All") {
      setMyPositionFilter("");
    } else {
      setMyPositionFilter(position);
    }
  };

  const filteredPlayers = myPlayers.filter((player) =>
    player.position.includes(myPositionFilter),
  );

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
              <PlayerGridList
                title="My Players"
                players={filteredPlayers}
                onPositionChange={handlePositionChange}
              ></PlayerGridList>
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
            setSelectedPlayerId={setSelectedPlayerId} // Pass this prop
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
            playerImage={selectedPlayer.image}
            playerFirstName={selectedPlayer.firstName}
            playerLastName={selectedPlayer.lastName}
            playerGC={selectedPlayer.currentIndex}
            player_Id={selectedPlayer._id}
            playerId={selectedPlayer.id}
            playerShares={selectedPlayer.shares}
            setSelectedPlayer={setSelectedPlayer}
            setSelectedPlayerId={setSelectedPlayerId}
            onTransactionComplete={refreshPlayersData}
            onClose={onCloseToolbar}
            mode={"buy"}
            transactionId={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;
