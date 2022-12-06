import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Search from "../../components/Search/Search";

function Build() {
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  const createPlaylist = () => {
    const tracks = playlist.map((track) => {
      const { id, album, artists, duration_ms, name } = track;
      const image = album.images[0].url;
      const artistStr = artists.map(({ name }) => name).join(", ");
      const albumName = album.name;
      return {
        name,
        duration_ms,
        image,
        annotation: "",
        album: albumName,
        spotifyID: id,
        artists: artistStr,
      };
    });
    console.log("tracks", tracks);
    fetch(`/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Michelle",
        to: "SSUI",
        tracks,
        date: Date.now(),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => navigate(`/playlist/${data?._id}`));
  };
  return (
    <>
      <Search setPlaylist={setPlaylist} playlist={playlist} />
      <button onClick={createPlaylist}>Create Playlist</button>
    </>
  );
}

export default Build;
