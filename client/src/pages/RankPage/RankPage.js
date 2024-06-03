import React, { useEffect, useState } from "react";
import "./RankPage.css";
import axios from "axios";
import { Radio } from "antd";
import goldMedal from "../../image/gold-medal.png";
import silverMedal from "../../image/silver-medal.png";
import bronzeMedal from "../../image/bronze-medal.png";
import backgroundImage from "../../image/rankpage.webp";

const RankingsPage = () => {
  const [rankingsData, setRankingsData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("week");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/rankings?filter=${timeFrame}`,
          { headers: { noAuth: true } },
        );
        console.log(response.data);
        setRankingsData(response.data);
      } catch (error) {
        console.error("Error fetching rankings data:", error);
      }
    };

    fetchRankings();
  }, [timeFrame]);

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const getMedal = (rank) => {
    if (rank === 1) return goldMedal;
    if (rank === 2) return silverMedal;
    if (rank === 3) return bronzeMedal;
    return null;
  };

  return (
    <div
      className="rankings-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="rankings-tabs">
        <Radio.Group
          className="ranking-radio-group"
          onChange={handleTimeFrameChange}
          value={timeFrame}
          defaultValue="Season"
        >
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="year">Season</Radio.Button>
        </Radio.Group>
      </div>
      <div className="rankings-list">
        {rankingsData.map((player, index) => (
          <div className="rankings-item-overall">
            <div className="rankings-item" key={index}>
              <img
                src={player.avatar}
                alt={player.fullName}
                className="avatar"
              />
              <div className="ranking-nameScore">
                <div className="name">{player.fullName}</div>
                <div className="score">
                  {player.totalPoints.toLocaleString()} pts
                </div>
              </div>
            </div>
            <div className="rank">
              {index + 1 <= 3 ? (
                <img
                  src={getMedal(index + 1)}
                  alt={`medal-${index + 1}`}
                  className="medal"
                />
              ) : (
                index + 1
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingsPage;
