import styles from "./Tracks.module.css";
import { fromMS, idFn } from "../../lib/helpers";

function Tracks({ tracks, addToPlaylist }) {
  return tracks?.map((track, index) => {
    const { album, artists, duration_ms, name } = track;
    const key = `${name} option ${index}`;
    const image = album.images[0].url;
    const artistStr = artists.map(({ name }) => name).join(", ");
    const albumName = album.name;

    return (
      <Track
        image={image}
        artists={artistStr}
        album={albumName}
        duration_ms={duration_ms}
        key={key}
        name={name}
        onClick={addToPlaylist ? () => addToPlaylist(track) : idFn}
      />
    );
  });
}

function Track({ image, artists, name, album, duration_ms, onClick = idFn }) {
  return (
    <div className={styles.track} onClick={onClick}>
      <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      <div className={styles.trackInfo}>
        <p>{name}</p>
        <p>{artists}</p>
      </div>
      <p>{album}</p>
      <p>{fromMS(duration_ms)}</p>
    </div>
  );
}

export default Tracks;
