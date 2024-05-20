// Statistics.js
import React from "react";
import "./PlayerStatistics.css";

const Statistics = ({ stats }) => {
  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <p>Match played: {stats.matchPlayed}</p>
      <p>Minutes played: {stats.minutesPlayed}</p>
      <p>Goals: {stats.goals}</p>
      <p>Was replaced: {stats.wasReplaced}</p>
      <p>Starting lineup: {stats.startingLineup}</p>
      <p>Yellow cards: {stats.yellowCards}</p>
    </div>
  );
};

export default Statistics;
