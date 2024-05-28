import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import "./MyTeamToolbar.css";
import axios from "axios";
import { ArrowRightOutlined } from "@ant-design/icons";

const MyTeamToolbar = ({ playerGC }) => {
  const [teamplayers, setTeamPlayers] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/profile`,
        );
        const user = response.data;
        setTeamPlayers(user.myTeam.length);
        setRemainingBudget(user.GC);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="toolbar">
      <Row justify="space-between" align="middle" className="toolbar-row">
        <Col className="toolbar-info-col">
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Players</div>
            <div className="toolbar-info-value">
              {teamplayers} / 20 &nbsp;
              <ArrowRightOutlined />
              &nbsp;{" "}
              <span className="toolbar-info-value-after">
                {teamplayers + 1} / 20{" "}
              </span>
            </div>
          </div>
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Remaining</div>
            <div className="toolbar-info-value">
              $ {remainingBudget} GC &nbsp;
              <ArrowRightOutlined />
              &nbsp;{" "}
              <span className="toolbar-info-value-after">
                $ {remainingBudget - playerGC} / 20{" "}
              </span>
            </div>
          </div>
        </Col>
        <Col className="toolbar-button-col">
          <Button type="primary" className="continue-button">
            Continue
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MyTeamToolbar;
