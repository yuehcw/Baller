import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Radio } from "antd";
import "./PlayerPerformanceChart.css";

const PlayerPerformanceChart = ({ player }) => {
  const [statType, setStatType] = useState("points");

  // Ensure games array is defined
  const games = player.last10Games || [];

  const chartData = {
    backgroundColor: "#1a1b1e",
    xAxis: {
      type: "category",
      data: games.map((game) =>
        new Date(game.gameDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      ),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        fontSize: 16,
        color: "#ffffff",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 25,
        fontSize: 16,
        color: "#ffffff",
      },
    },
    series: [
      {
        data: games.map((game) => game[statType]),
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#00CFFF" }, // top color
              { offset: 1, color: "#1049c4" }, // bottom color
            ],
            global: false, // false by default
          },
          borderRadius: [10, 10, 0, 0], // Top-left, Top-right, Bottom-right, Bottom-left
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            color: "#FFD700", // highligt color
            borderColor: "#FFD700", // border color
            borderWidth: 2, // border width
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "#2a2b2e",
      textStyle: {
        color: "#ffffff",
      },
      borderColor: "#2a2b2e",
      borderRadius: 10,
      margin: 5,
      borderWidth: 1,
      formatter: (params) => {
        const { dataIndex } = params[0];
        const game = games[dataIndex];
        return `
          <div style="line-height: 1.6;">
            <div style="margin-bottom: 12px;">${new Date(game.gameDate).toLocaleDateString("en-US")}</div>
            <div>${statType.charAt(0).toUpperCase() + statType.slice(1)}: ${game[statType]}</div>
          </div>
        `;
      },
    },
  };

  return (
    <div className="performance-chart">
      <div className="performance-chart-header">
        <h2>Performance</h2>
        <Radio.Group
          className="performance-radio-group"
          onChange={(e) => setStatType(e.target.value)}
          value={statType}
        >
          <Radio.Button value="points">Points</Radio.Button>
          <Radio.Button value="rebounds">Rebounds</Radio.Button>
          <Radio.Button value="assists">Assists</Radio.Button>
          <Radio.Button value="steals">Steals</Radio.Button>
          <Radio.Button value="blocks">Blocks</Radio.Button>
        </Radio.Group>
      </div>
      <ReactECharts option={chartData} />
    </div>
  );
};

export default PlayerPerformanceChart;
