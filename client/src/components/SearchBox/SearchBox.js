import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBox.css";

const SearchBox = ({ players }) => {
  const { searchTerm, setSearchTerm, resetSearchTerm } = useSearch();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const onSelect = (value, option) => {
    resetSearchTerm();
    navigate(`/player/${option.id}`);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setOptions([]);
    } else {
      const filteredOptions = players
        .filter((player) => {
          const firstName = player.firstName
            ? player.firstName.toLowerCase().replace(/\s/g, "")
            : "";
          const lastName = player.lastName
            ? player.lastName.toLowerCase().replace(/\s/g, "")
            : "";
          const fullName = `${firstName}${lastName}`;
          return fullName.includes(value.toLowerCase().replace(/\s/g, ""));
        })
        .map((player) => ({
          value: `${player.firstName} ${player.lastName}`,
          id: player.id,
        }));

      setOptions(filteredOptions);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = players.filter((player) => {
        const firstName = player.firstName
          ? player.firstName.toLowerCase().replace(/\s/g, "")
          : "";
        const lastName = player.lastName
          ? player.lastName.toLowerCase().replace(/\s/g, "")
          : "";
        const fullName = `${firstName}${lastName}`;
        return fullName.includes(searchTerm.toLowerCase().replace(/\s/g, ""));
      });
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  }, [searchTerm, players]);

  return (
    <div
      className={`search-box ${isActive ? "active" : ""}`}
      onClick={() => setIsActive(true)}
    >
      {!isActive && <SearchOutlined className="search-icon" />}
      {isActive && (
        <AutoComplete
          options={options}
          style={{ width: "100%" }}
          onSelect={onSelect}
          onSearch={handleSearch}
          value={searchTerm}
          onChange={handleSearch}
        >
          <Input
            className="search-input"
            onBlur={() => setIsActive(false)}
            autoFocus
            style={{
              backgroundColor: "#1a1a2e",
              color: "white",
              borderRadius: "10px",
              height: "100%",
              width: "100%",
              border: "transparent",
            }}
          />
        </AutoComplete>
      )}
    </div>
  );
};

export default SearchBox;
