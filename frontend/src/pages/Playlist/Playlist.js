import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";

import AuthContext from "../../lib/AuthContext";
import Tracks from "../../components/Tracks/Tracks";
import Cassette from "../../components/Cassette/Cassette";
import Player from "../../components/Player.js/Player";

import styles from "./Playlist.module.css";

function Playlist() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [data, setData] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [link, setLink] = useState("");
  const [playlistURL, setPlaylistURL] = useState(undefined);

  useEffect(() => {
    setLink(window.location.href);
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
  }, []);

  const base = `https://api.spotify.com/v1/users/${data?.id}/playlists`;
  const headers = new Headers({
    Authorization: "Bearer " + token,
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const playlistData = {
    name: data?.title,
    description: `Mixtapify from ${data?.from} to ${data?.to}`,
    public: false,
  };

  const makePlaylist = () => {
    fetch(base, {
      headers,
      body: JSON.stringify(playlistData),
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json, data?.tracks);

        addSongsToPlaylist(
          json?.id,
          data?.tracks.map((track) => track.uri),
          json?.external_urls.spotify
        );
      });
  };

  const addSongsToPlaylist = (playlistId, uris, spotifyUrl) => {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers,
      body: JSON.stringify({
        uris,
        position: 0,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json && !json.error) {
          setPlaylistURL(spotifyUrl);
        }
      });
  };

  async function copyToClip() {
    await navigator.clipboard.writeText(link);
    alert("link copied!");
  }

  return (
    <div>
      <h2>{data?.title}</h2>
      <h3>
        From {data?.from} to {data?.to}
      </h3>
      <Cassette cassetteStr={data?.cassette} />
      <Player
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        playlistID={id}
        tracks={data?.tracks}
      />
      <Tracks
        currentTrack={currentTrack}
        tracks={data?.tracks ?? []}
        clickTrack={(track, index) => setCurrentTrack(index)}
      />
      <div className={styles.btns}>
        <button className="btn" onClick={copyToClip}>
          Copy Mixtape Link
        </button>
        {token && (
          <button className="btn" onClick={makePlaylist}>
            Save to Spotify
          </button>
        )}
      </div>
      {playlistURL && (
        <div className={styles.viewPlaylist}>
          <a target="_blank" rel="noreferrer" href={playlistURL}>
            View Playlist on Spotify
          </a>
        </div>
      )}
    </div>
  );
}

export default Playlist;
