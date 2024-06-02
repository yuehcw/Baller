import React, { useContext } from "react";
import { ToolbarContext } from "../../context/ToolbarContext";
import { useNavigate } from "react-router-dom";
import { Badge, Statistic } from "antd";
import { UserContext } from "../../context/UserContext";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import "./PlayerGridCard.css";

const PlayerGridCard = ({ player }) => {
  const navigate = useNavigate();
  const { setSelectedPlayer } = useContext(ToolbarContext);
  const { user } = useContext(UserContext);
  const handleNavigate = () => {
    setSelectedPlayer(null);
    navigate(`/player/${player.playerId}`);
  };

  const getPriceComparisonClass = (currentPrice, previousPrice) => {
    const priceComparison = Math.round(
      ((currentPrice - previousPrice) / previousPrice) * 100,
    );

    if (priceComparison > 0) {
      return { class: "player-price-increased", comparison: priceComparison };
    } else if (priceComparison < 0) {
      return { class: "player-price-dropped", comparison: priceComparison };
    } else {
      return { class: "player-price-neutral", comparison: priceComparison };
    }
  };

  const playerInTeam = user.myTeam.find(
    (teamPlayer) => teamPlayer.playerId === player.playerId,
  );

  let priceComparisonClass = "";
  let priceComparison = 0;
  let totalShares = 0;

  if (playerInTeam) {
    totalShares = playerInTeam.transactions.reduce(
      (total, transaction) => total + transaction.shares,
      0,
    );

    let mostProfitableTransaction = playerInTeam.transactions.reduce(
      (maxTransaction, currentTransaction) => {
        const profitCurrent = player.currentIndex - currentTransaction.price;
        const profitMax = player.currentIndex - maxTransaction.price;
        return profitCurrent > profitMax ? currentTransaction : maxTransaction;
      },
      playerInTeam.transactions[0],
    );

    const { class: comparisonClass, comparison } = getPriceComparisonClass(
      player.currentIndex,
      mostProfitableTransaction.price,
    );
    priceComparisonClass = comparisonClass;
    priceComparison = comparison;
  }

  return (
    <div className="player-grid-card" onClick={handleNavigate}>
      <Badge
        count={totalShares > 999 ? "999+" : totalShares}
        overflowCount={999}
        style={{
          background: "linear-gradient(180deg, #1049c4 0%, #00CFFF 100%)",
          color: "#fff",
          borderRadius: "100%",
          border: "none",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          padding: "0 6px",
          lineHeight: "20px",
          height: "30px",
          minWidth: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        offset={[-10, 10]}
      >
        {player.headshotUrl ? (
          <img
            src={player.headshotUrl.replace("260x190", "520x380")}
            alt={`${player.firstName} ${player.lastName}`}
          />
        ) : (
          <div className="player-grid-placeholder">No Image Available</div>
        )}
      </Badge>
      <div className="player-grid-info">
        <div className="player-name">{`${player.firstName} ${player.lastName}`}</div>
      </div>
      <div className="player-grid-price">
        <span className="player-grid-card-currentIndex">{`${player.currentIndex.toFixed(1)} GC`}</span>
        {playerInTeam && (
          <div className={`player-price ${priceComparisonClass}`}>
            {priceComparisonClass === "player-price-increased" ? (
              <Statistic
                value={priceComparison}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            ) : priceComparisonClass === "player-price-dropped" ? (
              <Statistic
                value={priceComparison}
                valueStyle={{
                  color: "#cf1322",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            ) : priceComparisonClass === "player-price-neutral" ? (
              <Statistic
                value={priceComparison}
                valueStyle={{
                  color: "#60616d",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
                prefix={<MinusOutlined />}
                suffix="%"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerGridCard;
