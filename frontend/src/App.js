import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Build from "./pages/Build/Build";
import AuthContext from "./lib/AuthContext";
import { refreshToken } from "./lib/helpers";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = refreshToken(setToken);
    getToken();
    console.log(token);
  }, []);

  return (
    <div className="container">
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/build" element={<Build />} />
          {/* <Route exact path="/playlist/:id" element={<Build />} /> */}
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
