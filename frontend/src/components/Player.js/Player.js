import React, { useState, useContext, useEffect } from "react";
import cn from "classnames";

import styles from "./Player.module.css";
import AuthContext from "../../lib/AuthContext";
import Login from "../Login/Login";

function Player({ playlist }) {
  const { token, setToken } = useContext(AuthContext);
  console.log(playlist);

  return (
    <div className={styles.container}>
      {(token == null || token === "" || token === undefined) && (
        <div>
          <p>
            It looks like you aren't logged into Spotify yet. Please log in to
            play the mixtape.
          </p>
          <Login referrer={playlist} />
        </div>
      )}
    </div>
  );
}

export default Player;
