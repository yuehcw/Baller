import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import MyTeamPage from "./pages/MyTeamPage/MyTeamPage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import "./App.css";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <div className="app">
          <div className="app-header">
            <Header />
          </div>
          <div className="app-content">
            <Routes>
              <Route path="/player/:id" element={<PlayerPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/myteam" element={<MyTeamPage />} />
            </Routes>
          </div>
          <div className="app-footer">
            <Footer />
          </div>
        </div>
      </Router>
    </SearchProvider>
  );
};

export default App;
