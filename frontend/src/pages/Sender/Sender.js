import React, { useState, useContext, useEffect } from "react";

import "./Sender.css";
import AuthContext from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const Sender = () => {
  const { token, mixtape, setMixtape } = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const base = "https://api.spotify.com/v1/me";
  const headers = new Headers({
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  useEffect(() => {
    fetch(base, {
      headers,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json && !json.error)
          setName(json?.display_name ? json.display_name : "");
      });
  }, [token]);

  return (
    <div className="sender">
      <input
        type="text"
        autoComplete="false"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          setMixtape({ ...mixtape, from: name });
          navigate("/recipient");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Sender;
