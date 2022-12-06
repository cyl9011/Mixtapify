import React, { useState, useContext } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";

function Playlist() {
  const { id } = useParams();
  fetch(`/api/playlist/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data));

  const { token, setToken } = useContext(AuthContext);

  return <>{id}</>;
}

export default Playlist;
