import React, { useState, useContext, useEffect } from "react";
import cn from "classnames";

import styles from "./Player.module.css";
import AuthContext from "../../lib/AuthContext";
import Login from "../Login/Login";
import { refreshToken } from "../../lib/helpers";

function Player({ playlistID, tracks }) {
  const { token, setToken } = useContext(AuthContext);
  const [deviceID, setDeviceID] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(0);

  console.log(playlistID);

  const play = ({
    uris,
    playerInstance: {
      _options: { getOAuthToken },
    },
    device_id,
  }) => {
    getOAuthToken((access_token) => {
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };

  const getToken = refreshToken(setToken);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("ready!");
    };
  });

  useEffect(() => {
    if (!token) {
      getToken();
    } else {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceID(device_id);
        play({
          uris: tracks.map((track) => track.uri),
          playerInstance: player,
          device_id,
        });
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      console.log("player", player);
      setPlayer(player);
    }
  }, [token]);

  return (
    <div className={styles.container}>
      {token == null || token === "" || token === undefined ? (
        <div>
          <p>
            It looks like you aren't logged into Spotify yet. Please log in to
            play the mixtape.
          </p>
          <Login referrer={playlistID} />
        </div>
      ) : (
        <WebPlayback
          player={player}
          play={play}
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
          tracks={tracks}
        />
      )}
    </div>
  );
}

const WebPlayback = ({ player, play, currentTrack, tracks }) => {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  console.log("web player", player);
  return (
    <div>
      <button
        className="btn-spotify"
        onClick={() => {
          player.previousTrack();
        }}
      >
        &lt;&lt;
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.togglePlay();
          setPaused(!is_paused);
        }}
      >
        {is_paused ? "PLAY" : "PAUSE"}
      </button>

      <button
        className="btn-spotify"
        onClick={() => {
          player.nextTrack();
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Player;
