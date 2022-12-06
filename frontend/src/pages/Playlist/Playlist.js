import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";
import Tracks from "../../components/Tracks/Tracks";

function Playlist() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.href);
  }, []);

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

  async function copyToClip() {
    await navigator.clipboard.writeText(link);
    alert("link copied!");
  }

  return (
    <>
      <Tracks tracks={tracks} />
      <button className="btn" onClick={copyToClip}>
        Copy Mixtape Link
      </button>
    </>
  );
}

export default Playlist;
