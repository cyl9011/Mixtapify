export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

export const fromMS = (ms) => {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
  // Pull out parts of interest
  let parts = [d.getUTCMinutes(), d.getUTCSeconds()];
  const hours = d.getUTCHours();
  parts = hours === 0 ? parts : [hours, ...parts];
  // Zero-pad
  const formatted = parts.map((s) => String(s).padStart(2, "0")).join(":");
  return formatted;
};

export const refreshToken = (setToken) => {
  return async function getToken() {
    const response = await fetch("/auth/token");
    const json = await response.json();
    setToken(json.access_token);
  };
};

export const idFn = () => {
  return undefined;
};

export const extractTrackInfo = (tracks) => {
  return tracks?.map((track) => {
    const { album, artists, duration_ms, name, id, uri } = track;
    const image = album.images[0].url;
    const artistStr = artists.map(({ name }) => name).join(", ");
    const albumName = album.name;

    return {
      image,
      duration_ms,
      name,
      id,
      uri,
      album: albumName,
      artists: artistStr,
    };
  });
};

export const camelize = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};
