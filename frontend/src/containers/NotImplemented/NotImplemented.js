import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import scotty from "../../assets/images/scotty.png";

import "./NotImplemented.css";

const NotImplemented = () => {
  return (
    <div id="notImplementedContainer">
      <img src={scotty} alt="scotty" />
      <h1>Oops, this page doesn't exist yet... how about a shirt from the last page?</h1>
    </div>
  );
};

export default NotImplemented;
