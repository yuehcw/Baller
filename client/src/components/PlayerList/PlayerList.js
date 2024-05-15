import React, { useState } from "react";
import PlayerListCard from "../PlayerCard/PlayerListCard";
import "./PlayerList.css";

const PlayerList = ({ players, title }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSelect = (id) => {
    setSelectedPlayer(id === selectedPlayer ? null : id);
  };

  return (
    <div className="player-list-all">
      <div className="player-list-title">
        <h5 className="player-list-title-player">Player</h5>
        <h5 className="player-list-title-team">Team</h5>
        <h5 className="player-list-title-price">Price,min</h5>
      </div>
      <div className="player-list">
        <h2>{title}</h2>
        <div className="player-list-cards">
          {players.map((player) => (
            <PlayerListCard
              key={player.id}
              player={player}
              selected={player.id === selectedPlayer}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
