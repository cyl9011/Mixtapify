import React, { useState, useContext } from "react";

import "./Title.css";
import AuthContext from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const { mixtape, setMixtape } = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        autoComplete="false"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          setMixtape({ ...mixtape, title: name });
          navigate("/decorate");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Title;
