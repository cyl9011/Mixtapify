import React, { useState, useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import appRoutes from "./lib/appRoutes";

import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import Sender from "./pages/Sender/Sender";
import Recipient from "./pages/Recipient/Recipient";
import Title from "./pages/Title/Title";
import NotImplemented from "./pages/NotImplemented/NotImplemented";
import DesignCassette from "./pages/DesignCassette";
import Build from "./pages/Build/Build";
import AuthContext from "./lib/AuthContext";
import { refreshToken } from "./lib/helpers";

import "./App.css";
import Playlist from "./pages/Playlist/Playlist";
import Container from "./components/Container/Container";

let globalItems = 0;

const App = () => {
  const [token, setToken] = useState("");
  const [mixtape, setMixtape] = useState({
    date: Date.now(),
  });

  useEffect(() => {
    const getToken = refreshToken(setToken);
    getToken();
    console.log(token);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken, mixtape, setMixtape }}>
        <div className="MainContent">
          <Container>
            <Routes>
              <Route path={appRoutes.home.route} element={<Home />} />
              <Route path={appRoutes.sender.route} element={<Sender />} />
              <Route path={appRoutes.recipient.route} element={<Recipient />} />
              <Route path={appRoutes.title.route} element={<Title />} />
              <Route
                path={appRoutes.decorate.route}
                element={<DesignCassette />}
              />
              <Route exact path={appRoutes.build.route} element={<Build />} />
              <Route
                exact
                path={appRoutes.playlist.route}
                element={<Playlist />}
              />
              <Route
                path={appRoutes.notImplemented.route}
                element={<NotImplemented />}
              />
              <Route
                path="*"
                element={<Navigate to={appRoutes.notImplemented.route} />}
              />
            </Routes>
          </Container>
        </div>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
