import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import AuthContext from "../../lib/AuthContext";
import Search from "../../components/Search/Search";
import Tracks from "../../components/Tracks/Tracks";
import styles from "./Build.module.css";
import Cassette from "../../components/Cassette/Cassette";

function Build() {
  const [playlist, setPlaylist] = useState([]);
  const { mixtape, setMixtape } = useContext(AuthContext);

  console.log(mixtape);

  const navigate = useNavigate();

  const createPlaylist = () => {
    const tracks = playlist.map((track) => {
      return {
        ...track,
        annotation: "",
      };
    });
    console.log("tracks", tracks);
    fetch(`/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...mixtape,
        tracks,
        date: Date.now(),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => navigate(`/playlist/${data?._id}`));
  };

  const deleteTrack = (index) => {
    const playlistCopy = [...playlist];
    playlistCopy.splice(index, 1);
    setPlaylist(playlistCopy);
  };

  return (
    <div className={styles.container}>
      <Cassette
        cassetteStr={mixtape?.cassette}
        style={{ top: "0%", left: "0%" }}
      />
      <div className={styles.curPlaylist}>
        {playlist.length > 0 ? (
          <Tracks tracks={playlist} deleteTrack={deleteTrack} />
        ) : (
          <p>
            You currently do not have any songs in your mixtape. Begin by
            searching for a song.
          </p>
        )}
      </div>
      <Search setPlaylist={setPlaylist} playlist={playlist} />
      <button className={cn(styles.create, "btn")} onClick={createPlaylist}>
        Create Playlist
      </button>
    </div>
  );
}

export default Build;
