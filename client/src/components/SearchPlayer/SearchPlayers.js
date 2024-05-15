import React from "react";
import { Button, Dropdown, message, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import SearchBox from "../SearchBox/SearchBox";
import "./SearchPlayers.css";

const SearchPlayers = () => {
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="search-players">
      <h2 className="search-players-header">Search Players</h2>
      <div className="search-players-search">
        <Dropdown
          menu={menuProps}
          overlayClassName="search-players-search-dropdown"
        >
          <Button className="search-players-search-button">
            <div className="search-players-search-button-text">
              <Space direction="vertical" align="start" size="small">
                <span className="search-players-search-button-text-title">
                  Price
                </span>
                Button
              </Space>
              <DownOutlined className="search-players-down" />
            </div>
          </Button>
        </Dropdown>
        <Dropdown menu={menuProps}>
          <Button className="search-players-search-button">
            <div className="search-players-search-button-text">
              <Space direction="vertical" align="start" size="small">
                <span className="search-players-search-button-text-title">
                  Position
                </span>
                Button
              </Space>
              <DownOutlined className="search-players-down" />
            </div>
          </Button>
        </Dropdown>
        <SearchBox />
      </div>
    </div>
  );
};

export default SearchPlayers;
