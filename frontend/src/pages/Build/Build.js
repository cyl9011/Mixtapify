import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../lib/AuthContext";
import Search from "../../components/Search/Search";
import Tracks from "../../components/Tracks/Tracks";

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
    <>
      <div dangerouslySetInnerHTML={{ __html: mixtape.cassette }}></div>
      <Tracks tracks={playlist} deleteTrack={deleteTrack} />
      <Search setPlaylist={setPlaylist} playlist={playlist} />
      <button onClick={createPlaylist}>Create Playlist</button>
    </>
  );
}

export default Build;
