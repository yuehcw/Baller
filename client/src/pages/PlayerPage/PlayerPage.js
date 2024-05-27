// PlayerCard.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import PlayerPerformanceChart from "../../components/PlayerPerformanceChart/PlayerPerformanceChart";
import PlayerPriceChart from "../../components/PlayerPriceChart/PlayerPriceChart";
import "./PlayerPage.css";
import PlayerStatChart from "../../components/PlayerStatChart/PlayerStatChart";

const PlayerCard = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

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

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-card-page">
      <button onClick={() => window.history.back()} className="back-button">
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
    </div>
  );
};

export default PlayerCard;
