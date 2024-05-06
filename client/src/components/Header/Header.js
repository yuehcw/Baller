import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMarketClick = () => {
    navigate("/market");
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
      style={{ lineHeight: "120px", height: "120px" }}
    >
      <div className="left-menu">
        <Menu.Item
          key="home"
          icon={<HomeOutlined style={{ fontSize: "30px" }} />}
          onClick={() => handleHomeClick()}
          style={{ marginRight: "20%" }}
        />
        <Menu.Item
          key="marketplace"
          icon={<ShopOutlined style={{ fontSize: "30px" }} />}
          onClick={() => handleMarketClick()}
        />
      </div>
      <div className="right-menu">
        <Menu.Item key="howitworks" style={{ fontSize: "20px" }}>
          How It Works
        </Menu.Item>
        <Menu.Item key="login" style={{ fontSize: "20px" }}>
          Login
        </Menu.Item>
        <Menu.Item key="signup" style={{ fontSize: "20px" }}>
          Sign Up
        </Menu.Item>
      </div>
    </Menu>
  );
};

export default Header;
