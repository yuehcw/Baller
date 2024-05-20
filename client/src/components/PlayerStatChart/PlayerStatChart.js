import React from "react";
import "./PlayerStatChart.css";

const PlayerStatChart = ({ player }) => {
  return (
    <div className="stat-chart">
      <h3>Statistics</h3>
      {/* 使用图表库显示价格图表 */}
      <div className="chart">Chart goes here</div>
    </div>
  );
};

export default PlayerStatChart;
