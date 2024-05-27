import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 設置 axios 的全局請求攔截器
axios.interceptors.request.use(
  (config) => {
    // 檢查請求配置中是否有 noAuth 標記
    if (!config.headers.noAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // 移除 noAuth 標記，防止發送請求時帶上它
    delete config.headers.noAuth;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
