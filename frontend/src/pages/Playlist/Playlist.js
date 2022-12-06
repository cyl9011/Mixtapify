import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";
import Tracks from "../../components/Tracks/Tracks";
import Cassette from "../../components/Cassette/Cassette";

function Playlist() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
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
    .then((data) => setData(data));

  const { token, setToken } = useContext(AuthContext);

  async function copyToClip() {
    await navigator.clipboard.writeText(link);
    alert("link copied!");
  }

  return (
    <>
      <Cassette cassetteStr={data?.cassette} />
      <Tracks tracks={data?.tracks ?? []} />
      <button className="btn" onClick={copyToClip}>
        Copy Mixtape Link
      </button>
    </>
  );
}

export default Playlist;
