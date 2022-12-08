import styles from "./Tracks.module.css";
import { fromMS, idFn } from "../../lib/helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import cn from "classnames";

function Tracks({ tracks, clickTrack, deleteTrack, currentTrack }) {
  return (
    <div
      className={tracks?.length > 0 ? styles.container : ""}
      style={{ height: "auto"}}
    >
      {tracks?.map((track, index) => {
        const { image, duration_ms, name, album, artists } = track;
        const key = `${name} option ${index}`;

        return (
          <Track
            index={index}
            currentTrack={currentTrack}
            image={image}
            artists={artists}
            album={album}
            duration_ms={duration_ms}
            key={key}
            name={name}
            onClick={clickTrack ? () => clickTrack(track, index) : idFn}
            deleteTrack={deleteTrack ? () => deleteTrack(index) : undefined}
          />
        );
      })}
    </div>
  );
}

function Track({
  index,
  image,
  artists,
  name,
  album,
  duration_ms,
  onClick = idFn,
  deleteTrack,
  currentTrack,
}) {
  return (
    <tr
      className={
        currentTrack !== undefined && index === currentTrack
          ? cn(styles.track, styles.currentlyPlaying)
          : styles.track
      }
      onClick={onClick}
    >
      <td style={{ width: "5%" }}>
        <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      </td>
      <td className={styles.trackInfo} style={{ width: "20%" }}>
        <p className={styles.trackTitle}>{name}</p>
        <p>{artists}</p>
      </td>
      <td style={{ width: "35%" }}>{album}</td>
      <td style={{ width: "5%" }}>{fromMS(duration_ms)}</td>
      {deleteTrack && (
        <DeleteIcon onClick={deleteTrack} style={{ margin: "auto" }} />
      )}
    </tr>
  );
}

export default Tracks;
