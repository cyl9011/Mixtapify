import React from "react";
import Login from "../../components/Login/Login";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Mixtapify</h1>
      <Login />
    </div>
  );
};

export default Home;
