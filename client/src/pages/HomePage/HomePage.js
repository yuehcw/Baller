import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ConfigProvider } from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import nba_homepage from "../../image/image-nba-homepage.jpeg";
import "./HomePage.css";

const HomePage = () => {
  const [nbaNews, setNBANews] = useState([]);
  const [nbaPlayers] = useState([]);
  const colors1 = ["#6253E1", "#04BEFE"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  useEffect(() => {
    const fetchNBANews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/nba/nba-news`,
          { headers: { noAuth: true } },
        );
        setNBANews(response.data);
      } catch (error) {
        console.error("Error Client side fetching NBA news:", error);
      }
    };

    fetchNBANews();
  }, []);

  return (
    <div className="homepage-content">
      <div className="homepage-image-section">
        <img src={nba_homepage} alt="nba-homepage" />
        <div className="homepage-image-text-overlay">
          <h1>REVOLUTION BEGINS⚡️</h1>
          <h1>The Game-Changer in Basketball Trading</h1>
          <h3 className="homepage-image-text-overlay-body">
            Join the revolution and trade your beloved players in this unique
            stock market.
          </h3>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
                  colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(", ")})`,
                  colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(", ")})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button
              type="primary"
              size="large"
              className="homepage-start-button"
            >
              Start building your collection
            </Button>
          </ConfigProvider>
        </div>
      </div>
      <div>
        {Array.isArray(nbaPlayers) &&
          nbaPlayers.map((player, index) => (
            <li key={index}>{player.firstname}</li>
          ))}
      </div>
      <div className="homepage-nba-news">
        <h3>NBA News</h3>
        <ul>
          {nbaNews.map((newsItem, index) => (
            <li key={index}>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                {newsItem.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
