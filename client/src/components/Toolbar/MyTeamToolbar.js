import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { ArrowRightOutlined } from "@ant-design/icons";
import { notification } from "antd";
import "./MyTeamToolbar.css";

const MyTeamToolbar = ({
  playerGC,
  playerId,
  onPlayerUnavailable,
  setSelectedPlayer,
}) => {
  const { user, refreshUserData } = useContext(UserContext);
  const [teamPlayers, setTeamPlayers] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    if (user) {
      setTeamPlayers(user.myTeam.length);
      setRemainingBudget(user.GC);
    }
  }, [user]);

  const handleAddToTeam = async () => {
    if (user.myTeam.includes(playerId)) {
      notification.error({
        message: "Error",
        description: "Player already in the team.",
        placement: "top",
      });
      return;
    }

    console.log("Adding player to team:", { playerId, playerGC });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/addToMyTeam`,
        { playerId: playerId, playerGC: playerGC },
      );
      if (response.status === 200) {
        await handleSetUnavailable();
        await refreshUserData();
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

  const handleSetUnavailable = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/nba/nba-players/unavailable`,
        { playerId: playerId },
      );
      if (response.status === 200) {
        console.log("Player set to unavailable");
        onPlayerUnavailable();
      }
    } catch (error) {
      console.error("Error setting player to unavailable: ", error);
    }
  };

  const remainingAfterAddition = (remainingBudget - playerGC).toFixed(1);

  return (
    <div className="toolbar">
      <Row justify="space-between" align="middle" className="toolbar-row">
        <Col className="toolbar-info-col">
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Players</div>
            <div className="toolbar-info-value">
              {teamPlayers} / 20 &nbsp;
              <ArrowRightOutlined />
              &nbsp;{" "}
              <span className="toolbar-info-value-after">
                {teamPlayers + 1} / 20{" "}
              </span>
            </div>
          </div>
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Remaining</div>
            <div className="toolbar-info-value">
              $ {remainingBudget.toFixed(1)} GC &nbsp;
              <ArrowRightOutlined />
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
        </Col>
        <Col className="toolbar-button-col">
          <Button
            type="primary"
            className="continue-button"
            onClick={handleAddToTeam}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MyTeamToolbar;
