import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col, Input, notification } from "antd";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { PlayersContext } from "../../context/PlayersContext";
import { CloseCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./MyTeamToolbar.css";

const MyTeamToolbar = ({
  playerImage,
  playerFirstName,
  playerLastName,
  playerGC,
  player_Id,
  playerId,
  playerShares,
  setSelectedPlayer,
  setSelectedPlayerId,
  onTransactionComplete,
  onClose,
  mode,
  transactionId, // Add this line
}) => {
  const { user, refreshUserData } = useContext(UserContext);
  const { refreshPlayersData } = useContext(PlayersContext);
  const [teamPlayers, setTeamPlayers] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [buyShareAmount, setBuyShareAmount] = useState("");
  const [sellShareAmount, setSellShareAmount] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [placeholder, setPlaceholder] = useState(`Max: ${playerShares}`);

  const playerInTeamDetails =
    user && user.myTeam.find((teamPlayer) => teamPlayer.playerId === playerId);

  const totalShares = playerInTeamDetails
    ? playerInTeamDetails.transactions.reduce((total, transaction) => {
        return total + transaction.shares;
      }, 0)
    : 0;

  const transactionDetails =
    transactionId &&
    playerInTeamDetails?.transactions.find(
      (transaction) => transaction._id === transactionId,
    );

  useEffect(() => {
    if (mode === "buy") {
      setPlaceholder(`Max: ${playerShares}`);
    } else if (mode === "sell" && transactionDetails) {
      setPlaceholder(`Shares: ${transactionDetails.shares}`);
    }
  }, [mode, playerShares, playerInTeamDetails, transactionDetails]);

  useEffect(() => {
    if (user) {
      setTeamPlayers(user.myTeam.length);
      setRemainingBudget(user.GC);
    }
  }, [user]);

  const handleShareAmountChange = (e) => {
    const value = e.target.value;
    if (mode === "buy") {
      if (value > playerShares) {
        setBuyShareAmount(playerShares);
      } else if (value < 1) {
        setBuyShareAmount(null);
      } else {
        setBuyShareAmount(value);
      }
    } else if (mode === "sell") {
      if (transactionDetails && value > transactionDetails.shares) {
        setSellShareAmount(transactionDetails.shares);
      } else if (value < 1) {
        setSellShareAmount(null);
      } else {
        setSellShareAmount(value);
      }
    }
  };

  const handleAddToTeam = async () => {
    if (!buyShareAmount) {
      notification.error({
        message: "Error",
        description: "Input value can't be empty",
        placement: "top",
      });
      return;
    }
    try {
      const updateSharesResponse = await axios.put(
        `${process.env.REACT_APP_API_URL}/nba/nba-players/updateShares`,
        {
          playerId: player_Id,
          newShares: -Number(buyShareAmount),
        },
      );

      if (updateSharesResponse.status !== 200) {
        throw new Error("Failed to update player shares");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/addToMyTeam`,
        {
          playerId: playerId,
          playerGC: playerGC,
          playerPrice: playerGC * Number(buyShareAmount),
          playerShares: Number(buyShareAmount),
        },
      );
      if (response.status === 200) {
        await refreshPlayersData();
        await refreshUserData();
        if (onTransactionComplete) {
          onTransactionComplete();
        }
        setIsAnimating(true);
        setTimeout(() => {
          setIsVisible(false);
          setSelectedPlayer(null);
          setSelectedPlayerId(null); // Ensure player ID is also deselected
          onClose(); // Close the toolbar
        }, 500); // Match the duration of the CSS animation
      }
    } catch (error) {
      console.error(
        `Error ${mode === "buy" ? "adding" : "removing"} player: `,
        error,
      );
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
          placement: "top",
        });
      } else {
        notification.error({
          message: "Error",
          description: `An error occurred while ${mode === "buy" ? "adding the player to" : "removing the player from"} the team.`,
          placement: "top",
        });
      }
    }
    if (!playerId) {
      return <div>Loading...</div>;
    }
  };

  const handleSellShares = async () => {
    if (!sellShareAmount) {
      notification.error({
        message: "Error",
        description: "Input value can't be empty",
        placement: "top",
      });
      return;
    }
    try {
      const updateSharesResponse = await axios.put(
        `${process.env.REACT_APP_API_URL}/nba/nba-players/updateShares`,
        {
          playerId: player_Id,
          newShares: Number(sellShareAmount),
        },
      );

      if (updateSharesResponse.status !== 200) {
        throw new Error("Failed to update player shares");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/sellFromMyTeam`,
        {
          playerId: playerId,
          playerShares: Number(sellShareAmount),
          playerPrice: playerGC * Number(sellShareAmount),
          transactionId,
        },
      );
      if (response.status === 200) {
        await refreshPlayersData();
        await refreshUserData();
        if (onTransactionComplete) {
          onTransactionComplete();
        }
        setIsAnimating(true);
        setTimeout(() => {
          setIsVisible(false);
          setSelectedPlayer(null);
          setSelectedPlayerId(null);
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Error selling player shares: ", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notification.error({
          message: "Error",
          description: error.response.data.message,
          placement: "top",
        });
      } else {
        notification.error({
          message: "Error",
          description: "An error occurred while selling the player shares.",
          placement: "top",
        });
      }
    }
    if (!playerId) {
      return <div>Loading...</div>;
    }
  };

  const remainingAfterAddition = (
    remainingBudget -
    playerGC * buyShareAmount
  ).toFixed(1);

  const balanceAfterSale = (
    remainingBudget +
    playerGC * sellShareAmount
  ).toFixed(1);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setSelectedPlayer(null);
      setSelectedPlayerId(null); // Ensure player ID is also deselected
      onClose();
    }, 500); // Delay to match animation duration
  };

  return (
    isVisible && (
      <div className={`toolbar ${isAnimating ? "slide-out" : ""}`}>
        <div className="toolbar-close">
          <CloseCircleOutlined onClick={handleClose} />
        </div>
        <Row justify="space-between" align="middle" className="toolbar-row">
          <Col className="toolbar-info-col">
            <img
              src={playerImage.replace("260x190", "520x380")}
              alt={`${playerFirstName} ${playerLastName}`}
              className="player-list-image"
            />
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">Player GC</div>
              <div className="toolbar-info-value">
                <span
                  className="toolbar-info-value-after"
                  style={{
                    color: "#1677FF",
                  }}
                >
                  {playerGC}
                </span>
              </div>
            </div>
            <span className="toolbar-info-symbol">x</span>
            <div className="toolbar-info-value">
              <Input
                type="number"
                className="share-input"
                value={mode === "buy" ? buyShareAmount : sellShareAmount}
                onChange={handleShareAmountChange}
                placeholder={placeholder}
                min="1"
                max={
                  mode === "buy"
                    ? playerShares
                    : transactionDetails?.shares || 0
                }
                style={{ marginRight: "10px" }}
                onMouseEnter={() => setPlaceholder("")}
                onMouseLeave={
                  mode === "buy"
                    ? () => setPlaceholder(`Max: ${playerShares}`)
                    : () =>
                        setPlaceholder(
                          transactionDetails
                            ? `Shares: ${transactionDetails.shares}`
                            : `Shares: 0`,
                        )
                }
              />
            </div>
            <span className="toolbar-info-symbol">=</span>
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">
                {mode === "buy" ? "Remaining" : "Balance"}
              </div>
              <div className="toolbar-info-value">
                {mode === "buy" ? (
                  <span
                    className="toolbar-info-value-after"
                    style={{
                      color: remainingAfterAddition < 0 ? "red" : "#1677FF",
                    }}
                  >
                    {remainingAfterAddition} GC{" "}
                  </span>
                ) : (
                  <span
                    className="toolbar-info-value-after"
                    style={{
                      color: "#1677FF",
                    }}
                  >
                    {balanceAfterSale} GC{" "}
                  </span>
                )}
              </div>
            </div>
          </Col>
          <Col className="toolbar-button-col">
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">Players</div>
              <div className="toolbar-info-value">
                {mode === "buy" ? (
                  teamPlayers + 1 > 50 ? (
                    <span className="toolbar-info-value-after">Max</span>
                  ) : (
                    <>
                      {teamPlayers} / 50 &nbsp;
                      {!playerInTeamDetails && (
                        <>
                          <CaretRightOutlined />
                          &nbsp;{" "}
                          <span className="toolbar-info-value-after">
                            {teamPlayers + 1} / 50{" "}
                          </span>
                        </>
                      )}
                    </>
                  )
                ) : (
                  <>
                    {teamPlayers} / 50 &nbsp;
                    {playerInTeamDetails &&
                      Number(sellShareAmount) === totalShares && (
                        <>
                          <CaretRightOutlined />
                          &nbsp;{" "}
                          <span className="toolbar-info-value-after">
                            {teamPlayers - 1} / 50{" "}
                          </span>
                        </>
                      )}
                  </>
                )}
              </div>
            </div>
            <div className="toolbar-info-block">
              <Button
                type="primary"
                className="continue-button"
                onClick={mode === "buy" ? handleAddToTeam : handleSellShares}
                disabled={teamPlayers + 1 > 60}
              >
                {mode === "buy" ? "Buy" : "Sell"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default MyTeamToolbar;
