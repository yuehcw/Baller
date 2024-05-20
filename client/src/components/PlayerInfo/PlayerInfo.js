// PlayerInfo.js
import React from "react";
import FlagContainer from "../FlagContainer/FlagContainer";
import { Button, Badge } from "antd";
import { HeartFilled } from "@ant-design/icons";
import "./PlayerInfo.css";

const PlayerInfo = ({ player }) => {
  const countryToFlagUrl = (countryName) => {
    return `https://upload.wikimedia.org/wikipedia/commons/${getCountryFlagFileName(countryName)}`;
  };

  const getCountryFlagFileName = (countryName) => {
    const countryNameMap = {
      USA: "a/a4/Flag_of_the_United_States.svg",
      Canada: "c/cf/Flag_of_Canada.svg",
      China: "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
      Germany: "b/ba/Flag_of_Germany.svg",
      "United Kingdom": "a/ae/Flag_of_the_United_Kingdom.svg",
      France: "c/c3/Flag_of_France.svg",
      Japan: "9/9e/Flag_of_Japan.svg",
      Australia: "b/b9/Flag_of_Australia.svg",
      Brazil: "0/05/Flag_of_Brazil.svg",
      India: "4/41/Flag_of_India.svg",
      Argentina: "1/1a/Flag_of_Argentina.svg",
      Mexico: "f/fc/Flag_of_Mexico.svg",
      Italy: "0/03/Flag_of_Italy.svg",
      Russia: "f/f3/Flag_of_Russia.svg",
      "South Africa": "a/af/Flag_of_South_Africa.svg",
      "South Korea": "0/09/Flag_of_South_Korea.svg",
      Spain: "9/9a/Flag_of_Spain.svg",
      Turkey: "b/b4/Flag_of_Turkey.svg",
      Nigeria: "7/79/Flag_of_Nigeria.svg",
      Egypt: "f/fe/Flag_of_Egypt.svg",
      Pakistan: "3/32/Flag_of_Pakistan.svg",
      Bangladesh: "f/f9/Flag_of_Bangladesh.svg",
      Vietnam: "2/21/Flag_of_Vietnam.svg",
      Thailand: "a/a9/Flag_of_Thailand.svg",
      Malaysia: "6/66/Flag_of_Malaysia.svg",
      Indonesia: "9/9f/Flag_of_Indonesia.svg",
      Netherlands: "2/20/Flag_of_the_Netherlands.svg",
      Belgium: "6/65/Flag_of_Belgium.svg",
      Greece: "5/5c/Flag_of_Greece.svg",
      Portugal: "5/5c/Flag_of_Portugal.svg",
      Sweden: "4/4c/Flag_of_Sweden.svg",
      Norway: "d/d9/Flag_of_Norway.svg",
      Denmark: "9/9c/Flag_of_Denmark.svg",
      Finland: "b/bc/Flag_of_Finland.svg",
      Ireland: "4/45/Flag_of_Ireland.svg",
      Poland: "1/12/Flag_of_Poland.svg",
      "Czech Republic": "c/cb/Flag_of_the_Czech_Republic.svg",
      Austria: "4/41/Flag_of_Austria.svg",
      Switzerland: "f/f3/Flag_of_Switzerland.svg",
      Hungary: "c/c1/Flag_of_Hungary.svg",
      Romania: "7/73/Flag_of_Romania.svg",
      Bulgaria: "9/9a/Flag_of_Bulgaria.svg",
      "New Zealand": "3/3e/Flag_of_New_Zealand.svg",
      Israel: "d/d4/Flag_of_Israel.svg",
      "Saudi Arabia": "0/0d/Flag_of_Saudi_Arabia.svg",
      "United Arab Emirates": "c/cb/Flag_of_the_United_Arab_Emirates.svg",
      Iran: "c/ca/Flag_of_Iran.svg",
      Iraq: "f/f6/Flag_of_Iraq.svg",
      Syria: "5/53/Flag_of_Syria.svg",
      Lebanon: "5/59/Flag_of_Lebanon.svg",
      Jordan: "c/c0/Flag_of_Jordan.svg",
      Kuwait: "a/aa/Flag_of_Kuwait.svg",
      Qatar: "6/66/Flag_of_Qatar.svg",
      Bahrain: "2/2c/Flag_of_Bahrain.svg",
      Oman: "d/dd/Flag_of_Oman.svg",
      Yemen: "8/89/Flag_of_Yemen.svg",
      Afghanistan: "a/a8/Flag_of_Afghanistan.svg",
      Uzbekistan: "8/84/Flag_of_Uzbekistan.svg",
      Kazakhstan: "d/d3/Flag_of_Kazakhstan.svg",
      Turkmenistan: "1/1b/Flag_of_Turkmenistan.svg",
      Kyrgyzstan: "c/c7/Flag_of_Kyrgyzstan.svg",
      Tajikistan: "d/d0/Flag_of_Tajikistan.svg",
      Nepal: "9/9b/Flag_of_Nepal.svg",
      "Sri Lanka": "1/11/Flag_of_Sri_Lanka.svg",
      Myanmar: "8/8c/Flag_of_Myanmar.svg",
      Cambodia: "8/83/Flag_of_Cambodia.svg",
      Laos: "5/56/Flag_of_Laos.svg",
      Brunei: "9/9c/Flag_of_Brunei.svg",
      Mongolia: "4/4c/Flag_of_Mongolia.svg",
      "North Korea": "5/51/Flag_of_North_Korea.svg",
      Venezuela: "7/7f/Flag_of_Venezuela.svg",
      Colombia: "2/21/Flag_of_Colombia.svg",
      Chile: "7/78/Flag_of_Chile.svg",
      Peru: "c/cf/Flag_of_Peru.svg",
      Ecuador: "e/e8/Flag_of_Ecuador.svg",
      Bolivia: "4/48/Flag_of_Bolivia.svg",
      Paraguay: "2/27/Flag_of_Paraguay.svg",
      Uruguay: "f/fe/Flag_of_Uruguay.svg",
      "Costa Rica": "f/f2/Flag_of_Costa_Rica.svg",
      Panama: "a/ab/Flag_of_Panama.svg",
      Cuba: "b/bd/Flag_of_Cuba.svg",
      Honduras: "8/82/Flag_of_Honduras.svg",
      Guatemala: "e/ec/Flag_of_Guatemala.svg",
      "El Salvador": "3/3e/Flag_of_El_Salvador.svg",
      Haiti: "5/56/Flag_of_Haiti.svg",
      "Dominican Republic": "c/c4/Flag_of_the_Dominican_Republic.svg",
      "Trinidad and Tobago": "6/64/Flag_of_Trinidad_and_Tobago.svg",
      Jamaica: "0/0a/Flag_of_Jamaica.svg",
      Latvia: "8/84/Flag_of_Latvia.svg",
      Serbia: "f/ff/Flag_of_Serbia.svg",
      Slovenia: "f/f0/Flag_of_Slovenia.svg",
      Cameroon: "4/4f/Flag_of_Cameroon.svg",
      // 可以根据需要继续添加更多国家的映射
    };

    return countryNameMap[countryName] || "unknown_flag.svg";
  };
  return (
    <div className="player-info">
      <div className="player-info-image-container">
        <Badge.Ribbon text={`#${player.number}`} color="#2A2B2E">
          <img
            src={player.image.replace("260x190", "520x380")}
            alt={`${player.firstName} ${player.lastName}`}
            className="player-image"
          />
        </Badge.Ribbon>
      </div>
      <div className="player-info-name-container">
        <h2>
          {player.firstName} {player.lastName}
        </h2>
        <h2>{player.currentIndex} GC</h2>
      </div>
      <div className="player-info-team-container">
        <FlagContainer
          flagSrc={countryToFlagUrl(player.country)}
          text={player.country}
        />
        <FlagContainer flagSrc={player.teamLogo} text={player.team} />
      </div>
      <div className="player-details">
        <div className="player-details-row">
          <p>Position: </p>
          {player.position}
        </div>
        <div className="player-details-row">
          <p>Height: </p>
          {player.height}
        </div>
        <div className="player-details-row">
          <p>Weight: </p>
          {player.weight}
        </div>
      </div>
      <div className="player-add">
        <Button className="player-add-button" type="primary">
          Add to my team
        </Button>
        <Button
          className="player-add-tolist"
          shape="square"
          icon={
            <HeartFilled
              style={{ fontSize: "25px", color: "#1677FF", fill: "#1677FF" }}
            />
          }
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
