import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import PlayerPerformanceChart from "../../components/PlayerPerformanceChart/PlayerPerformanceChart";
import PlayerPriceChart from "../../components/PlayerPriceChart/PlayerPriceChart";
import PlayerStatChart from "../../components/PlayerStatChart/PlayerStatChart";
import MyTeamToolbar from "../../components/Toolbar/MyTeamToolbar";
import { ToolbarContext } from "../../context/ToolbarContext";
import { UserContext } from "../../context/UserContext";
import "./PlayerPage.css";

const PlayerCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [toolbarMode, setToolbarMode] = useState("buy");
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedTransactionPlayerGC, setSelectedTransactionPlayerGC] =
    useState(null);
  const { selectedPlayer, setSelectedPlayer } = useContext(ToolbarContext);
  const { refreshUserData } = useContext(UserContext);

  const fetchPlayer = async () => {
    try {
      const response = await axios.get(`/nba/nba-Players/${id}`, {
        headers: { noAuth: true },
      });
      setPlayer(response.data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const handleTransactionComplete = async () => {
    await refreshUserData();
    await fetchPlayer();
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-card-page">
      <button
        onClick={() => {
          navigate("/myteam");
          setSelectedPlayer(null);
        }}
        className="back-button"
      >
        ← Back to my team
      </button>
      <div className="player-card-container">
        <div className="player-card-left">
          <PlayerInfo
            player={player}
            setToolbarMode={setToolbarMode}
            setTransactionId={setSelectedTransactionId}
            setTransactionPlayerGC={setSelectedTransactionPlayerGC}
          />
        </div>
        <div className="player-card-right">
          <div className="player-card-right-top">
            <PlayerPerformanceChart player={player} />
          </div>
          <div className="player-card-right-bottom">
            <PlayerPriceChart player={player} />
            <PlayerStatChart player={player} />
          </div>
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
            setSelectedPlayerId={() => {}}
            onTransactionComplete={handleTransactionComplete}
            onClose={() => {}}
            mode={toolbarMode}
            transactionId={selectedTransactionId}
            transactionPlayerGC={selectedTransactionPlayerGC}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
