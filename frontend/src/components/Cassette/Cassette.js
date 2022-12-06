import React from "react";

import styles from "./Cassette.module.css";

const Cassette = ({ cassetteStr }) => {
  return (
    <div
      className={styles.cassette}
      dangerouslySetInnerHTML={{ __html: cassetteStr }}
    ></div>
  );
};

export default Cassette;
