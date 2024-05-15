import React from "react";
import PlayerGridCard from "../PlayerCard/PlayerGridCard";
import "./PlayerGridList.css";

const PlayerGridList = ({ players, title }) => {
  return (
    <div className="player-grid-list">
      <h2>{title}</h2>
      <div className="player-grid-cards">
        {players.map((player) => (
          <PlayerGridCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayerGridList;
