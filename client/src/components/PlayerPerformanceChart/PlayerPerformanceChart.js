// PlayerPerformanceChart.js
import React from "react";
import "./PlayerPerformanceChart.css";

const PlayerPerformanceChart = ({ player }) => {
  return (
    <div className="performance-chart">
      <h3>Performance</h3>
      {/* 使用图表库显示表现图表 */}
      <div className="chart">Chart goes here</div>
    </div>
  );
};

export default PlayerPerformanceChart;
