import React, { useState, useContext } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";
import Tracks from "../../components/Tracks/Tracks";

function Playlist() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);

  fetch(`/api/playlist/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => setTracks(data ? data.tracks : []));

  const { token, setToken } = useContext(AuthContext);

  return <Tracks tracks={tracks} />;
}

export default Playlist;
