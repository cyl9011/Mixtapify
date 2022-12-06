import React from "react";
import styles from "./Login.module.css";
import cn from "classnames";

function Login() {
  return (
    <a className={cn(styles.login, "btn")} href="/auth/login">
      Login with Spotify
    </a>
  );
}

export default Login;
