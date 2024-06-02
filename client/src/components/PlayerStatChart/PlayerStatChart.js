import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faChessKing,
  faChessQueen,
  faHands,
  faHandshakeAngle,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import "./PlayerStatChart.css";

const PlayerStatChart = ({ player }) => {
  const stats = player.seasonAverages;

  return (
    <div className="stat-chart">
      <h2>Season Statistics</h2>
      <div className="stat-item">
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faBasketballBall} className="icon" /> Points
          </div>
          <span>{stats.points}</span>
        </div>
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faChessKing} className="icon" /> Oreb
          </div>
          <span>{stats.offReb}</span>
        </div>
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faChessQueen} className="icon" /> Dreb
          </div>
          <span>{stats.defReb}</span>
        </div>
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faHandshakeAngle} className="icon" /> Assists
          </div>
          <span>{stats.assists}</span>
        </div>
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faHands} className="icon" /> Steals
          </div>
          <span>{stats.steals}</span>
        </div>
        <div className="stat-row">
          <div>
            <FontAwesomeIcon icon={faShield} className="icon" /> Blocks
          </div>
          <span>{stats.blocks}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatChart;
