import React, { useState, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import appRoutes from "./lib/appRoutes";

import NavBar from "./containers/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Footer from "./containers/Footer/Footer";
import Sender from "./containers/Sender/Sender";
import Recipient from "./containers/Recipient/Recipient";
import Title from "./containers/Title/Title";
import Choose from "./containers/Choose/Choose";
import Cassette from "./containers/Cassette/Cassette";
import NotImplemented from "./containers/NotImplemented/NotImplemented";
import DesignCassette from "./containers/DesignCassette";
import Build from "./containers/Build/Build";
import AuthContext from "./lib/AuthContext";
import { refreshToken } from "./lib/helpers";

import "./App.css";
import Playlist from "./pages/Playlist/Playlist";

let globalItems = 0;

const App = () => {
  // SSUI Lab 7
  const [cartItems, setCartItems] = useState([]);
  const [newShirt, setNewShirt] = useState();

  const [token, setToken] = useState("");

  function updateNewShirt(e) {
    setNewShirt(e.target.value);
  }

  useEffect(() => {
    const getToken = refreshToken(setToken);
    getToken();
    console.log(token);
  }, []);

  function createNewShirt() {
    setCartItems([...cartItems, { text: newShirt, id: ++globalItems }]);
  }

  function deleteShirt(id) {
    let tempCartItems = [...cartItems];
    tempCartItems.splice(
      tempCartItems.findIndex((d) => d.id === d),
      1
    );
    setCartItems(tempCartItems);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
        <div className="MainContent">
          <NavBar />
          <Routes>
            <Route path={appRoutes.home.route} element={<Home />} />
            <Route path={appRoutes.sender.route} element={<Sender />} />
            <Route path={appRoutes.recipient.route} element={<Recipient />} />
            <Route path={appRoutes.title.route} element={<Title />} />
            <Route
              path={appRoutes.decorate.route}
              element={<DesignCassette />}
            />
            <Route path={appRoutes.choose.route} element={<Choose />} />
            <Route path={appRoutes.cassette.route} element={<Cassette />} />
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
          </Routes>
        </div>
        <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default App;
