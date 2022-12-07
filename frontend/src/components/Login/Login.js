import React from "react";
import styles from "./Login.module.css";
import cn from "classnames";

function Login({ referrer }) {
  console.log(
    `/auth/login${referrer && referrer !== "" ? `?playlist=${referrer}` : ""}`
  );
  return (
    <a
      className={cn(styles.login, "btn")}
      href={`/auth/login${referrer ? `?playlist=${referrer}` : ""}`}
    >
      Login with Spotify
    </a>
  );
}

export default Login;
