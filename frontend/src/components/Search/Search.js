import React, { useState, useEffect } from "react";

function Search({ token }) {
  const [res, setRes] = useState("");
  const base = "https://api.spotify.com/v1/search";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  const queryString = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

  async function search(q) {
    const response = await fetch(
      `${base}?${queryString({
        q,
        type: "track",
      })}`,
      {
        headers,
      }
    );
    const json = await response.json();
    setRes(json);
    console.log(json);
  }

  return (
    <p onClick={() => search("all too well")}>click to search to console</p>
  );
}

export default Search;
