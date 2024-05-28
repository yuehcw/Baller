import React, { useContext } from "react";
import "./PlayerGridCard.css";
import { ToolbarContext } from "../../context/ToolbarContext";
import { useNavigate } from "react-router-dom";

const PlayerGridCard = ({ player }) => {
  const navigate = useNavigate();
  const { setSelectedPlayer } = useContext(ToolbarContext);
  const handleNavigate = () => {
    setSelectedPlayer(null);
    navigate(`/player/${player.id}`);
  };

  return (
    <div className="player-grid-card" onClick={handleNavigate}>
      <img
        src={player.image.replace("260x190", "520x380")}
        alt={`${player.firstName} ${player.lastName}`}
      />
      <div className="player-grid-info">
        {`${player.firstName} ${player.lastName}`} <br />
        <span className="player-grid-card-currentIndex">{`${player.currentIndex} GC`}</span>
      </div>
    </div>
  );
};

export default PlayerGridCard;
