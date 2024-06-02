import React from "react";
import ReactECharts from "echarts-for-react";
import "./PlayerPriceChart.css";

const PlayerPriceChart = ({ player }) => {
  const monthlyIndexData = player.monthlyIndex
    ? Object.entries(player.monthlyIndex).map(([month, index]) => ({
        month: parseInt(month, 10),
        index: parseFloat(index),
      }))
    : [];

  // Order the months starting from September
  const monthOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  const orderedMonthlyIndex = monthOrder
    .map((month) => monthlyIndexData.find((data) => data.month === month))
    .filter((data) => data !== undefined); // Filter out undefined months

  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const chartData = {
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
        const month = monthNames[orderedMonthlyIndex[dataIndex].month];
        const index = orderedMonthlyIndex[dataIndex].index;
        return `
          <div style="line-height: 1.6;">
            <div>${month}</div>
            <div style="margin-top: 8px;">Index: ${index}</div>
          </div>
        `;
      },
    },
    xAxis: {
      type: "category",
      data: orderedMonthlyIndex.map((data) => monthNames[data.month]),
      axisLabel: {
        margin: 20,
        fontSize: 16,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        margin: 5,
        fontSize: 16,
        color: "#fff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    series: [
      {
        data: orderedMonthlyIndex.map((data) => data.index),
        type: "line",
        smooth: false,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#008aff" },
              { offset: 1, color: "#2a2b2e" },
            ],
          },
        },
        lineStyle: {
          width: 2,
          color: "#008aff",
        },
        itemStyle: {
          color: "#008aff",
        },
        showSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        emphasis: {
          focus: "series",
          itemStyle: {
            color: "#008aff",
            borderColor: "#fff",
            borderWidth: 2,
            opacity: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          symbolSize: 10,
        },
      },
    ],
    backgroundColor: "#1a1b1e",
  };

  return (
    <div className="price-chart">
      <h2>Monthly Avg. GC</h2>
      <ReactECharts option={chartData} className="chart" />
    </div>
  );
};

export default PlayerPriceChart;
