import React, { useState, useContext } from "react";

import styles from "./Search.module.css";
import { fromMS } from "../../lib/helpers";
import AuthContext from "../../lib/AuthContext";

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

  const displayTracks = (res, updatePlaylist = false) =>
    res?.map((track, index) => {
      const { album, artists, duration_ms, name } = track;
      const key = `${q} option ${index}`;
      const image = album.images[0].url;
      const artistStr = artists.map(({ name }) => name).join(", ");
      const albumName = album.name;

      return (
        <Track
          image={image}
          artists={artistStr}
          album={albumName}
          duration_ms={duration_ms}
          key={key}
          name={name}
          onClick={
            updatePlaylist
              ? () => addToPlaylist(track)
              : () => {
                  return undefined;
                }
          }
        />
      );
    });

  return (
    <div>
      {displayTracks(playlist)}
      <label htmlFor="track">Search</label>
      <input id="track" type="text" onChange={handleChange} value={q} />

      <button onClick={handleSubmit} disabled={q === ""}>
        Submit
      </button>
      <div className={styles.tracks}>{displayTracks(res, true)}</div>
    </div>
  );
}

function Track({ image, artists, name, album, duration_ms, onClick }) {
  return (
    <div
      className={styles.track}
      onClick={
        onClick ??
        (() => {
          return undefined;
        })
      }
    >
      <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      <div className={styles.trackInfo}>
        <p>{name}</p>
        <p>{artists}</p>
      </div>
      <p>{album}</p>
      <p>{fromMS(duration_ms)}</p>
    </div>
  );
}

export default Search;
