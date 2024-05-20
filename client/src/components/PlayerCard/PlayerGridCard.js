import React from "react";
import "./PlayerGridCard.css";

const PlayerGridCard = ({ player, onRemove }) => {
  return (
    <div className="player-grid-card">
      <img src={player.image} alt={`${player.firstName} ${player.lastName}`} />
      <div className="player-grid-info">
        <h3>
          {player.firstName} {player.lastName}
        </h3>
        <p>{player.currentIndex}</p>
      </div>
    </div>
  );
};

export default PlayerGridCard;
