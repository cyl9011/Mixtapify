import React, { useState, useContext } from "react";

import styles from "./Search.module.css";
import AuthContext from "../../lib/AuthContext";
import Tracks from "../Tracks/Tracks";
import { extractTrackInfo, queryString } from "../../lib/helpers";

function Search({ playlist, setPlaylist }) {
  const { token, setToken } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const base = "https://api.spotify.com/v1/search";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  async function search(q) {
    const response = await fetch(
      `${base}?${queryString({
        q,
        type: "track",
      })}`,
      {
        headers,
      }
    );
    const json = await response.json();
    setRes(json?.tracks?.items);
    console.log(res);
  }

  const handleChange = (e) => {
    setQ(e.target.value);
    search(e.target.value);
    if (e?.target?.value && e.target.value !== "") {
    }
  };

  const clickTrack = (track) => {
    setPlaylist([...playlist, track]);
  };

  return (
    <div>
      <input
        id="track"
        type="text"
        onChange={handleChange}
        value={q}
        autoComplete="off"
        placeholder="Search Songs"
        style={{ marginBottom: "20px" }}
      />
      <Tracks tracks={extractTrackInfo(res)} clickTrack={clickTrack} />
    </div>
  );
}

export default Search;
