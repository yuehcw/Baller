import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { ToolbarContext } from "../../context/ToolbarContext";
import logo from "../../image/logo.png";
import "./Header.css";

const Header = () => {
  const [activeItem, setActiveItem] = useState("home");
  const { setSelectedPlayer } = useContext(ToolbarContext);
  const navigate = useNavigate();
  const { user, logoutUser, refreshUserData } = useContext(UserContext);

  useEffect(() => {
    refreshUserData(); // 確保 Header 獲取最新的用戶數據
  }, []);

  const handleItemClick = (key) => {
    setActiveItem(key);
    setSelectedPlayer(null);
    navigate(`/${key}`);
  };

  const handleLogout = () => {
    logoutUser();
    setSelectedPlayer(null);
    navigate("/login");
  };

  const handlepersonalinfo = () => {
    setSelectedPlayer(null);
    navigate("/profile");
  };

  const content = (
    <div className="user-avatar-list">
      <button onClick={handleLogout} className="user-avatar-button-first">
        Logout
      </button>
      <button onClick={handlepersonalinfo} className="user-avatar-button">
        Personal Information
      </button>
    </div>
  );

  return (
    <div className="menu-container">
      <div className="menu-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-center">
        <div
          className={`menu-item ${activeItem === "home" ? "active" : ""}`}
          onClick={() => handleItemClick("home")}
        >
          Home
        </div>
        <div
          className={`menu-item ${activeItem === "myteam" ? "active" : ""}`}
          onClick={() => handleItemClick("myteam")}
        >
          My Team
        </div>
        <div
          className={`menu-item ${activeItem === "howtoplay" ? "active" : ""}`}
          onClick={() => handleItemClick("login")}
        >
          How to Play
        </div>
      </div>
      <div className="menu-right">
        {user ? (
          <div className="user-info">
            <Popover content={content}>
              <Avatar
                size="large"
                src={user.avatar || null}
                icon={!user.avatar && <UserOutlined />}
                style={{
                  backgroundColor: "#c0c0c0",
                  verticalAlign: "middle",
                }}
              />
            </Popover>
            <div className="user-details">
              <span className="user-name">{user.fullName}</span>
              <span className="user-gc">$ {user.GC.toFixed(1)} GC</span>
            </div>
          </div>
        ) : (
          <div
            className={`menu-item ${activeItem === "login" ? "active" : ""}`}
            onClick={() => handleItemClick("login")}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
