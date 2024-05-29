import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import PlayerPerformanceChart from "../../components/PlayerPerformanceChart/PlayerPerformanceChart";
import PlayerPriceChart from "../../components/PlayerPriceChart/PlayerPriceChart";
import PlayerStatChart from "../../components/PlayerStatChart/PlayerStatChart";
import { ToolbarContext } from "../../context/ToolbarContext";
import MyTeamToolbar from "../../components/Toolbar/MyTeamToolbar";
import "./PlayerPage.css";

const PlayerCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const { selectedPlayer, setSelectedPlayer } = useContext(ToolbarContext);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/nba/nba-Players/${id}`,
          { headers: { noAuth: true } },
        );
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayer();
  }, [id]);

  const handlePlayerUnavailable = () => {
    setPlayer({ ...player, available: false });
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
          <PlayerInfo player={player} />
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
            playerGC={selectedPlayer.currentIndex}
            playerId={selectedPlayer._id}
            onPlayerUnavailable={handlePlayerUnavailable}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
