import React from "react";
import banner from "../../assets/images/banner.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="Banner">
        <img src={banner} alt="banner" />
      </div>
      <div id="boxContainer">
        <div className="box" id="box1">
          <h3>We don't ship. We're not real.</h3>
          <p>
            We sell shirts. We are passionate about selling shirts. But keep in
            mind we have no infrastructure, supply chain, or mechanism to
            actually produce these shirts or fulfill the orders. But the shirts
            will always be real in your imagination.
          </p>
        </div>
        <div className="box" id="box2">
          <h3>Design your own shirt! But help us do that...</h3>
          <p>
            Not only do we not sell shirts, but we let you design your own!
            Eventually. We actually kinda need your help implementing that. If
            you could build an actual paint-style interface that you can make
            designs in that would be great :)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
