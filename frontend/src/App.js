import React, { useState, useRef, useEffect } from "react";

import { Route, Routes, Router, Navigate } from "react-router-dom";
import appRoutes from "./shared/appRoutes";

import NavBar from "./containers/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Footer from "./containers/Footer/Footer";
import Sender from "./containers/Sender/Sender";
import Recipient from "./containers/Recipient/Recipient";
import Title from "./containers/Title/Title";
import Decorate from "./containers/Decorate/Decorate";
import Choose from "./containers/Choose/Choose";
import Cassette from "./containers/Cassette/Cassette";
import NotImplemented from "./containers/NotImplemented/NotImplemented";

import "./App.css";

let globalItems = 0;

const App = () => {
  // SSUI Lab 7
  const [cartItems, setCartItems] = useState([]);
  const [newShirt, setNewShirt] = useState();

  function updateNewShirt(e) {
    setNewShirt(e.target.value);
  }

  function createNewShirt() {
    setCartItems([...cartItems, { text: newShirt, id: ++globalItems }]);
  }

  function deleteShirt(id) {
    let tempCartItems = [...cartItems];
    tempCartItems.splice(
      tempCartItems.findIndex((d) => d.id === d), 1
    );
    setCartItems(tempCartItems);
  }

  return (
    <div className="App">
      <div className="MainContent">
        <NavBar />
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.sender} element={<Sender />} />
          <Route path={appRoutes.recipient} element={<Recipient />} />
          <Route path={appRoutes.title} element={<Title />} />
          <Route path={appRoutes.decorate} element={<Decorate />} />
          <Route path={appRoutes.choose} element={<Choose />} />
          <Route path={appRoutes.cassette} element={<Cassette />} />
          <Route path={appRoutes.notImplemented} element={<NotImplemented />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
