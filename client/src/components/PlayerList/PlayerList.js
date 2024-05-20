import React, { useState } from "react";
import { Pagination } from "antd";
import PlayerListCard from "../PlayerCard/PlayerListCard";
import "./PlayerList.css";

const PlayerList = ({ players, selectedPlayer, setSelectedPlayer, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  const handleSelect = (id) => {
    setSelectedPlayer(id === selectedPlayer ? null : id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * playersPerPage;
  const selectedPlayers = players.slice(
    startIndex,
    startIndex + playersPerPage,
  );

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
          {selectedPlayers.map((player) => (
            <PlayerListCard
              key={player.id}
              player={player}
              selected={player.id === selectedPlayer}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={playersPerPage}
          total={players.length}
          onChange={handlePageChange}
          className="pagination"
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default PlayerList;
