// PlayerPriceChart.js
import React from "react";
import "./PlayerPriceChart.css";

const PlayerPriceChart = ({ player }) => {
  return (
    <div className="price-chart">
      <h3>Price chart</h3>
      {/* 使用图表库显示价格图表 */}
      <div className="chart">Chart goes here</div>
    </div>
  );
};

export default PlayerPriceChart;
