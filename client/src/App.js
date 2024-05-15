import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MyTeamPage from "./pages/MyTeamPage/MyTeamPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/myteam" element={<MyTeamPage />} />
          </Routes>
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
