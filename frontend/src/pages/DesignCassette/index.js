import cn from "classnames";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../lib/AuthContext";
import Cassette from "./Cassette";

const DesignCassette = () => {
  const { mixtape, setMixtape } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="workspace-container">
      <div className="cassette-container">
        <Cassette
          from={mixtape?.from && mixtape?.from !== "" ? mixtape?.from : "Name"}
          to={mixtape?.to && mixtape?.to !== "" ? mixtape?.to : "Name"}
        />
      </div>
      <button
        className={cn("btn", "cassette-btn")}
        onClick={() => {
          setMixtape({
            ...mixtape,
            cassette: document.getElementById("cassette")?.outerHTML ?? "",
          });
          navigate("/build");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default DesignCassette;
