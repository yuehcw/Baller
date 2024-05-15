import React, { useState } from "react";
import PlayerGridList from "../../components/PlayerList/PlayerGridList";
import PlayerList from "../../components/PlayerList/PlayerList";
import SearchPlayers from "../../components/SearchPlayer/SearchPlayers";
import "./MyTeamPage.css";

const MyTeamPage = () => {
  const [players] = useState([
    {
      id: 1,
      firstName: "E.",
      lastName: "Haaland",
      team: "Manchester City",
      position: "Attacker",
      headshotUrl: "https://example.com/haaland.png",
      price: 32.5,
    },
    {
      id: 2,
      firstName: "Vinicius",
      lastName: "Jr",
      team: "Real Madrid",
      position: "Attacker",
      headshotUrl: "https://example.com/vinicius.png",
      price: 29.2,
    },
    {
      id: 3,
      firstName: "A.",
      lastName: "Griezmann",
      team: "Atletico Madrid",
      position: "Attacker",
      headshotUrl: "https://example.com/griezmann.png",
      price: 23.8,
    },
    {
      id: 4,
      firstName: "Pedri",
      lastName: "",
      team: "Barcelona",
      position: "Midfielder",
      headshotUrl: "https://example.com/pedri.png",
      price: 27.0,
    },
    {
      id: 5,
      firstName: "L.",
      lastName: "Sané",
      team: "Bayern Munich",
      position: "Midfielder",
      headshotUrl: "https://example.com/sane.png",
      price: 18.5,
    },
    {
      id: 6,
      firstName: "T.",
      lastName: "Kroos",
      team: "Real Madrid",
      position: "Midfielder",
      headshotUrl: "https://example.com/kroos.png",
      price: 25.3,
    },
    {
      id: 7,
      firstName: "R.",
      lastName: "Varane",
      team: "Manchester United",
      position: "Defender",
      headshotUrl: "https://example.com/varane.png",
      price: 19.2,
    },
    {
      id: 8,
      firstName: "V.",
      lastName: "Van Dijk",
      team: "Liverpool",
      position: "Defender",
      headshotUrl: "https://example.com/vandijk.png",
      price: 21.5,
    },
    {
      id: 9,
      firstName: "J.",
      lastName: "Stones",
      team: "Manchester City",
      position: "Defender",
      headshotUrl: "https://example.com/stones.png",
      price: 17.8,
    },
  ]);

  return (
    <div className="main-content">
      <div className="left-panel">
        <PlayerGridList title="Attackers" players={players.slice(0, 3)} />
        <PlayerGridList title="Midfielders" players={players.slice(3, 6)} />
        <PlayerGridList title="Defenders" players={players.slice(6, 9)} />
      </div>
      <div className="right-panel">
        <SearchPlayers />
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default MyTeamPage;
