import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import SearchBox from "../SearchBox/SearchBox";
import "./SearchPlayers.css";

const SearchPlayers = ({ players, setPriceRange, setPositionFilter }) => {
  const [selectedPriceLabel, setSelectedPriceLabel] = useState("All");
  const [selectedPositionLabel, setSelectedPositionLabel] = useState("All");
  const handlePriceClick = (e) => {
    // 根據選擇的鍵更新價格範圍
    let rangeLabel = "All";
    switch (e.key) {
      case "1":
        setPriceRange([0, 11]);
        rangeLabel = "0 - 10.9";
        break;
      case "2":
        setPriceRange([11, 21]);
        rangeLabel = "11 - 20.9";
        break;
      case "3":
        setPriceRange([21, 31]);
        rangeLabel = "21 - 30.9";
        break;
      case "4":
        setPriceRange([31, 41]);
        rangeLabel = "31 - 40.9";
        break;
      case "5":
        setPriceRange([41, 51]);
        rangeLabel = "41 - 50";
        break;
      case "6":
        setPriceRange([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]);
        rangeLabel = "All";
        break;
      default:
        setPriceRange([Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]);
    }
    setSelectedPriceLabel(rangeLabel);
  };

  const handlePositionClick = (e) => {
    let positionLabel = "";
    switch (e.key) {
      case "1":
        setPositionFilter("Guard");
        positionLabel = "Guard";
        break;
      case "2":
        setPositionFilter("Forward");
        positionLabel = "Forward";
        break;
      case "3":
        setPositionFilter("Center");
        positionLabel = "Center";
        break;
      case "4":
        setPositionFilter("");
        positionLabel = "All";
        break;
      default:
        setPositionFilter("");
    }
    setSelectedPositionLabel(positionLabel);
  };

  const priceRanges = [
    {
      label: "0 - 10.9",
      key: "1",
    },
    {
      label: "11 - 20.9",
      key: "2",
    },
    {
      label: "21 - 30.9",
      key: "3",
    },
    {
      label: "31 - 40.9",
      key: "4",
    },
    {
      label: "41 - 50",
      key: "5",
    },
    {
      label: "All",
      key: "6",
    },
  ];

  const positionRanges = [
    {
      label: "Guard",
      key: "1",
    },
    {
      label: "Forward",
      key: "2",
    },
    {
      label: "Center",
      key: "3",
    },
    {
      label: "All",
      key: "4",
    },
  ];

  const menuPriceProps = {
    items: priceRanges,
    onClick: handlePriceClick,
  };

  const menuPositionProps = {
    items: positionRanges,
    onClick: handlePositionClick,
  };

  return (
    <div className="search-players">
      <h2 className="search-players-header">Search Players</h2>
      <div className="search-players-search">
        <Dropdown
          menu={menuPriceProps}
          overlayClassName="search-players-search-dropdown"
        >
          <Button className="search-players-search-button">
            <div className="search-players-search-button-text">
              <Space direction="vertical" align="start" size="small">
                <span className="search-players-search-button-text-title">
                  GC
                </span>
                {selectedPriceLabel}
              </Space>
              <DownOutlined className="search-players-down" />
            </div>
          </Button>
        </Dropdown>
        <Dropdown
          menu={menuPositionProps}
          overlayClassName="search-players-search-dropdown"
        >
          <Button className="search-players-search-button">
            <div className="search-players-search-button-text">
              <Space direction="vertical" align="start" size="small">
                <span className="search-players-search-button-text-title">
                  Position
                </span>
                {selectedPositionLabel}
              </Space>
              <DownOutlined className="search-players-down" />
            </div>
          </Button>
        </Dropdown>
        <SearchBox players={players} />
      </div>
    </div>
  );
};

export default SearchPlayers;
