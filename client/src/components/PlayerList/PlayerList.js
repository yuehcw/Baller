import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import PlayerListCard from "../PlayerCard/PlayerListCard";
import "./PlayerList.css";

const PlayerList = ({
  players,
  selectedPlayer,
  setSelectedPlayer,
  title,
  priceRange,
  positionFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const playersPerPage = 10;

  useEffect(() => {
    const filtered = players.filter((player) => {
      const inPriceRange =
        player.currentIndex >= priceRange[0] &&
        player.currentIndex < priceRange[1];
      let inPosition = true;
      if (positionFilter === "Guard") {
        inPosition = player.position && player.position.includes("G");
      } else if (positionFilter === "Forward") {
        inPosition = player.position && player.position.includes("F");
      } else if (positionFilter === "Center") {
        inPosition = player.position && player.position.includes("C");
      }
      return inPriceRange && inPosition;
    });
    setFilteredPlayers(filtered);
  }, [players, priceRange, positionFilter]);

  const handleSelect = (id) => {
    setSelectedPlayer(id === selectedPlayer ? null : id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * playersPerPage;
  const selectedPlayers = filteredPlayers.slice(
    startIndex,
    startIndex + playersPerPage,
  );

  return (
    <div className="player-list-all">
      <div className="player-list-title">
        <h5 className="player-list-title-player">Player</h5>
        <h5 className="player-list-title-team">Team</h5>
        <h5 className="player-list-title-price">GC</h5>
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
          total={filteredPlayers.length}
          onChange={handlePageChange}
          className="pagination"
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default PlayerList;
