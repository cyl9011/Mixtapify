import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./Container.module.css";
import { camelize } from "../../lib/helpers";
import appRoutes from "../../lib/appRoutes.js";
import NavBar from "../NavBar/NavBar";

const Container = ({ children }) => {
  const location = useLocation();
  const route = location.pathname.replaceAll("/", "");
  const pageName =
    route === "" ? "Welcome to Mixtapify" : appRoutes[camelize(route)].page;

  return (
    <div className={styles.body}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.content}>
          <h1>{pageName}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
