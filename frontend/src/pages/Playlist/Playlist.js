import React, { useState, useContext } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";

function Playlist() {
  const { id } = useParams();
  const { token, setToken } = useContext(AuthContext);

  return <></>;
}

export default Playlist;
