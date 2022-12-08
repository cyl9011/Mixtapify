import React, { useState, useContext, useEffect } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";

import styles from "./Player.module.css";
import AuthContext from "../../lib/AuthContext";
import Login from "../Login/Login";
import { refreshToken } from "../../lib/helpers";

const playCur =
  ({
    playerInstance: {
      _options: { getOAuthToken },
    },
    device_id,
  }) =>
  (uri) => {
    getOAuthToken((access_token) => {
      console.log("uri", uri);
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [uri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };

function Player({ playlistID, tracks }) {
  const { token, setToken } = useContext(AuthContext);
  const [deviceID, setDeviceID] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [play, setPlay] = useState(() => undefined);

  console.log("tracks", tracks);

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
        const playFn = playCur({
          playerInstance: player,
          device_id,
        });
        console.log("Ready with Device ID", device_id, playFn);
        setDeviceID(device_id);
        setPlay(playFn);
        playFn(tracks[currentTrack]?.uri);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      console.log("player", player);
      setPlayer(player);
    }
  }, [token, tracks]);

  useEffect(() => {
    if (
      deviceID &&
      tracks &&
      tracks.length > currentTrack &&
      tracks[currentTrack]
    ) {
      console.log("bruh", deviceID);
      const playFn = playCur({
        playerInstance: player,
        device_id: deviceID,
      });
      playFn(tracks[currentTrack]?.uri);
    }
  }, [tracks, currentTrack, deviceID, player]);

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
          deviceID={deviceID}
        />
      )}
    </div>
  );
}

const WebPlayback = ({
  player,
  play,
  setCurrentTrack,
  currentTrack,
  tracks,
  deviceID,
}) => {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  console.log("web player", play, deviceID);
  return (
    <div>
      <button
        className={currentTrack === 0 ? styles.btnDisabled : styles.btnControl}
        onClick={() => {
          if (currentTrack === 0) return;
          setCurrentTrack(currentTrack - 1);
        }}
        disabled={currentTrack === 0}
      >
        <FastRewindIcon
          style={{ color: currentTrack === 0 ? "grey" : "white" }}
        />
      </button>

      <button
        className={styles.btnControl}
        onClick={() => {
          player.togglePlay();
          setPaused(!is_paused);
        }}
      >
        {is_paused ? (
          <PlayArrowIcon style={{ color: "white" }} />
        ) : (
          <PauseIcon style={{ color: "white" }} />
        )}
      </button>

      <button
        className={
          currentTrack === tracks?.length - 1
            ? styles.btnDisabled
            : styles.btnControl
        }
        onClick={() => {
          if (currentTrack === tracks?.length - 1) return;
          setCurrentTrack(currentTrack + 1);
        }}
        disabled={currentTrack === tracks?.length - 1}
      >
        <FastForwardIcon
          style={{
            color: currentTrack === tracks?.length - 1 ? "grey" : "white",
          }}
        />
      </button>
    </div>
  );
};

export default Player;
