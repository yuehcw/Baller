import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col, Input } from "antd";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { PlayersContext } from "../../context/PlayersContext";
import { RightCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import "./MyTeamToolbar.css";

const MyTeamToolbar = ({
  playerGC,
  player_Id,
  playerId,
  playerShares,
  setSelectedPlayer,
  onTransactionComplete,
  onClose,
}) => {
  const { user, refreshUserData } = useContext(UserContext);
  const { refreshPlayersData } = useContext(PlayersContext);
  const [teamPlayers, setTeamPlayers] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [buyShareAmount, setBuyShareAmount] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (user) {
      setTeamPlayers(user.myTeam.length);
      setRemainingBudget(user.GC);
    }
  }, [user]);

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
          playerGC: playerGC * Number(buyShareAmount),
          playerShares: Number(buyShareAmount),
        },
      );
      if (response.status === 200) {
        await refreshPlayersData();
        await refreshUserData();
        if (onTransactionComplete) {
          onTransactionComplete();
        }
      }
      setSelectedPlayer(null);
    } catch (error) {
      console.error("Error adding player to team: ", error);
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
          description: "An error occurred while adding the player to the team.",
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

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setSelectedPlayer(null);
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
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">Players</div>
              <div className="toolbar-info-value">
                {teamPlayers} / 60 &nbsp;
                <RightCircleOutlined />
                &nbsp;{" "}
                <span className="toolbar-info-value-after">
                  {teamPlayers + 1} / 60{" "}
                </span>
              </div>
            </div>
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">Remaining</div>
              <div className="toolbar-info-value">
                $ {remainingBudget.toFixed(1)} GC &nbsp;
                <RightCircleOutlined />
                &nbsp;{" "}
                <span
                  className="toolbar-info-value-after"
                  style={{
                    color: remainingAfterAddition < 0 ? "red" : "inherit",
                  }}
                >
                  $ {remainingAfterAddition} GC{" "}
                </span>
              </div>
            </div>
            <div className="toolbar-info-block">
              <div className="toolbar-info-title">Shares</div>
              <div className="toolbar-info-value">
                <Input
                  type="number"
                  className="share-input"
                  value={buyShareAmount}
                  onChange={(e) => setBuyShareAmount(e.target.value)}
                  placeholder={`Max: ${playerShares}`}
                  min="1"
                  max={playerShares}
                  style={{ marginRight: "10px" }}
                />
              </div>
            </div>
          </Col>
          <Col className="toolbar-button-col">
            <Button
              type="primary"
              className="continue-button"
              onClick={handleAddToTeam}
              disabled={teamPlayers + 1 > 60}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </div>
    )
  );
};

export default MyTeamToolbar;
