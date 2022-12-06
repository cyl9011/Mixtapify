import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import appRoutes from "../../shared/appRoutes";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="controls">
        <div id="shuffle"></div>
        <div id="previous"></div>
        <div id="play"></div>
        <div id="next"></div>
        <div id="repeat"></div>
      </div>
      <div className="progress">
        <div id="progressBar"></div>
      </div>
    </div>
  );
};

export default Footer;
