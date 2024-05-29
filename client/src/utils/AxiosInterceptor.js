import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AxiosInterceptor = ({ children }) => {
  const { logoutUser } = useContext(UserContext);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logoutUser]);

  return children;
};

export default AxiosInterceptor;
