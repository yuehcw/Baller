import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ConfigProvider } from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import homepageImage from "../../image/homepage.webp";
import "./HomePage.css";

const HomePage = () => {
  // const [nbaNews, setNBANews] = useState([]);
  // const [nbaPlayers] = useState([]);
  // const colors1 = ["#6253E1", "#04BEFE"];
  // const getHoverColors = (colors) =>
  //   colors.map((color) => new TinyColor(color).lighten(5).toString());
  // const getActiveColors = (colors) =>
  //   colors.map((color) => new TinyColor(color).darken(5).toString());
  //
  // useEffect(() => {
  //   const fetchNBANews = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/nba/nba-news`,
  //         { headers: { noAuth: true } },
  //       );
  //       setNBANews(response.data);
  //     } catch (error) {
  //       console.error("Error Client side fetching NBA news:", error);
  //     }
  //   };
  //
  //   fetchNBANews();
  // }, []);

  return (
    <div className="homepage-content">
      <div className="homepage-image-section">
        <img
          src={homepageImage}
          alt="nba-homepage"
          className="homepage-image"
        />
        <div className="homepage-image-text-overlay">
          <h1>Buy, sell trade and form collections</h1>
          <p>
            Trade NBA players like stocks. Buy, sell, and build your dream team
            by investing in your favorite players. Track performance, make
            strategic trades, and elevate your basketball experience. Join our
            marketplace today!
          </p>

          <Button type="default" size="large" className="homepage-start-button">
            LEARN MORE
          </Button>
        </div>
      </div>
      <div className="homepage-nba-news">
        {/*<h3>NBA News</h3>*/}
        {/*<ul>*/}
        {/*  {nbaNews.map((newsItem, index) => (*/}
        {/*    <li key={index}>*/}
        {/*      <a href={newsItem.url} target="_blank" rel="noopener noreferrer">*/}
        {/*        {newsItem.title}*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </div>
    </div>
  );
};

export default HomePage;
