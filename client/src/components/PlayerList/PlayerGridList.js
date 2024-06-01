import React from "react";
import PlayerGridCard from "../PlayerCard/PlayerGridCard";
import "./PlayerGridList.css";
import { Radio } from "antd";

const PlayerGridList = ({ players, title, onPositionChange }) => {
  return (
    <div className="player-grid-list">
      <h2>{title}</h2>
      <div className="player-grid-radio-group-container">
        <Radio.Group
          className="player-grid-radio-group"
          onChange={(e) => onPositionChange(e.target.value)}
          defaultValue="All"
        >
          <Radio.Button value="All">All</Radio.Button>
          <Radio.Button value="G">G</Radio.Button>
          <Radio.Button value="F">F</Radio.Button>
          <Radio.Button value="C">C</Radio.Button>
        </Radio.Group>
      </div>
      <div className="player-grid-cards">
        {players.map((player) => (
          <PlayerGridCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayerGridList;
