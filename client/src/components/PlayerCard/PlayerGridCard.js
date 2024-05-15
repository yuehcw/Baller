import React from "react";
import "./PlayerGridCard.css";

const PlayerGridCard = ({ player }) => {
  return (
    <div className="player-grid-card">
      <img
        src={player.headshotUrl}
        alt={`${player.firstName} ${player.lastName}`}
      />
      <div className="player-info">
        <h3>
          {player.firstName} {player.lastName}
        </h3>
        <p>{player.price}</p>
      </div>
    </div>
  );
};

export default PlayerGridCard;
