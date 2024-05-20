import React from "react";
import { Button, Divider, Row, Col } from "antd";
import "./MyTeamToolbar.css";

const MyTeamToolbar = ({ players, remainingBudget }) => {
  return (
    <div className="toolbar">
      <Row justify="space-between" align="middle" className="toolbar-row">
        <Col className="toolbar-info-col">
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Players</div>
            <div className="toolbar-info-value">{players}/20</div>
          </div>
          <div className="toolbar-info-block">
            <div className="toolbar-info-title">Remaining</div>
            <div className="toolbar-info-value">€ {remainingBudget} mln</div>
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
