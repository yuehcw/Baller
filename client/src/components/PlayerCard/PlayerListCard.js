import React from "react";
import { Button } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import "./PlayerListCard.css";

const PlayerListCard = ({ player, selected, onSelect }) => {
  return (
    <div className={`player-list-card ${selected ? "selected" : ""}`}>
      <div className="player-list-info">
        <img
          src={player.headshotUrl}
          alt={`${player.firstName} ${player.lastName}`}
          className="player-list-image"
        />
        <div className="player-list-details">
          <div className="player-list-name">{`${player.firstName} ${player.lastName}`}</div>
          <div className="player-list-stats">{`${player.stats} pts`}</div>
        </div>
      </div>
      <div className="player-list-club">{player.team}</div>
      <div className="player-list-price">{player.price}</div>
      <Button
        type="primary"
        shape="circle"
        icon={selected ? <CheckOutlined /> : <PlusOutlined />}
        onClick={() => onSelect(player.id)}
      />
    </div>
  );
};

export default PlayerListCard;
