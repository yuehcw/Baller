import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     console.log("Stored user found:", JSON.parse(storedUser));
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     fetchUserData();
  //   }
  // }, []);

  const fetchUserData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`,
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
    }
  };

  const refreshUserData = async () => {
    await fetchUserData();
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    console.log("Logging out user");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, refreshUserData, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
