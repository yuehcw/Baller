import React from "react";
import { Button } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./PlayerListCard.css";

const PlayerListCard = ({ player, selected, onSelect }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/player/${player.id}`);
  };

  return (
    <div
      className={`player-list-card ${selected ? "selected" : ""}`}
      onClick={handleNavigate}
    >
      <div className="player-list-info">
        <img
          src={player.image}
          alt={`${player.firstName} ${player.lastName}`}
          className="player-list-image"
        />
        <div className="player-list-details">
          <div className="player-list-name">{`${player.firstName} ${player.lastName}`}</div>
        </div>
      </div>
      <div className="player-list-team">{player.team}</div>
      <div className="player-list-price">{player.currentIndex}</div>
      <Button
        type="primary"
        shape="circle"
        icon={selected ? <CheckOutlined /> : <PlusOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(player.id);
        }}
      />
    </div>
  );
};

export default PlayerListCard;
