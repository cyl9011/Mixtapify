import React, { useState } from "react";
import Search from "../../components/Search/Search";

function Build({ token }) {
  const [playlist, setPlaylist] = useState([]);

  return <Search setPlaylist={setPlaylist} playlist={playlist} token={token} />;
}

export default Build;
