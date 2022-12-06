import React, { useState, useContext } from "react";

import styles from "./Search.module.css";
import AuthContext from "../../lib/AuthContext";
import Tracks from "../Tracks/Tracks";

function Search({ playlist, setPlaylist }) {
  const { token, setToken } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const base = "https://api.spotify.com/v1/search";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  const queryString = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

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

  const handleSubmit = () => {
    search(q);
  };

  const handleChange = (e) => {
    setQ(e.target.value);
  };

  const addToPlaylist = (track) => {
    setPlaylist([...playlist, track]);
  };

  return (
    <div>
      <Tracks tracks={playlist} />
      <label htmlFor="track">Search</label>
      <input
        id="track"
        type="text"
        onChange={handleChange}
        value={q}
        autoComplete="false"
      />
      <button onClick={handleSubmit} disabled={q === ""}>
        Submit
      </button>
      <Tracks tracks={res} addToPlaylist={addToPlaylist} />
    </div>
  );
}

export default Search;
