import React from "react";

import styles from "./Cassette.module.css";

const Cassette = ({ cassetteStr }) => {
  return (
    <div
      className={styles.cassette}
      style={{ top: "0%", left: "0%" }}
      dangerouslySetInnerHTML={{ __html: cassetteStr }}
    ></div>
  );
};

export default Cassette;
