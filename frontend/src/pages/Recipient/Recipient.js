import React, { useState, useContext } from "react";

import "./Recipient.css";
import AuthContext from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const Recipient = () => {
  const { mixtape, setMixtape } = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
          setMixtape({ ...mixtape, to: name });
          navigate("/title");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Recipient;
