import React from "react";
import SVGLayer from "./SVGLayer/SVGLayer";

import "./Workspace.css";

const Workspace = ({ setCassette }) => {
  return (
    <div className="Workspace">
      <SVGLayer />
    </div>
  );
};

export default Workspace;
