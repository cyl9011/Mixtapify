import styles from "./Tracks.module.css";
import { fromMS, idFn } from "../../lib/helpers";

function Tracks({ tracks, addToPlaylist }) {
  return tracks?.map((track, index) => {
    const { image, duration_ms, name, album, artists } = track;
    const key = `${name} option ${index}`;

    return (
      <Track
        image={image}
        artists={artists}
        album={album}
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
