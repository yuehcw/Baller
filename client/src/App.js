import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import MyTeamPage from "./pages/MyTeamPage/MyTeamPage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import { SearchProvider } from "./context/SearchContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import UserPage from "./components/UserPage";
import { UserProvider } from "./context/UserContext";
import { ToolbarProvider } from "./context/ToolbarContext";
import AxiosInterceptor from "./utils/AxiosInterceptor";
import { PlayersProvider } from "./context/PlayersContext";
import "./App.css";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AxiosInterceptor>
          <PlayersProvider>
            <SearchProvider>
              <ToolbarProvider>
                <div className="app">
                  <div className="app-header">
                    <Header />
                  </div>
                  <div className="app-content">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/player/:id" element={<PlayerPage />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route element={<PrivateRoute />}>
                        <Route path="/myteam" element={<MyTeamPage />} />
                      </Route>
                      <Route path="/login" element={<LoginPage />} />
                      <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<UserPage />} />
                      </Route>
                    </Routes>
                  </div>
                  <div className="app-footer">
                    <Footer />
                  </div>
                </div>
              </ToolbarProvider>
            </SearchProvider>
          </PlayersProvider>
        </AxiosInterceptor>
      </UserProvider>
    </Router>
  );
};

export default App;
