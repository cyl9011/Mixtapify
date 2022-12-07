import styles from "./Tracks.module.css";
import { fromMS, idFn } from "../../lib/helpers";
import DeleteIcon from "@mui/icons-material/Delete";

function Tracks({ tracks, addToPlaylist, deleteTrack }) {
  return (
    <div
      className={tracks?.length > 0 ? styles.container : ""}
      style={{ height: deleteTrack ? "auto" : "50vh" }}
    >
      {tracks?.map((track, index) => {
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
            deleteTrack={deleteTrack ? () => deleteTrack(index) : undefined}
          />
        );
      })}
    </div>
  );
}

function Track({
  image,
  artists,
  name,
  album,
  duration_ms,
  onClick = idFn,
  deleteTrack,
}) {
  return (
    <tr className={styles.track} onClick={onClick}>
      <td style={{ width: "5%" }}>
        <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      </td>
      <td className={styles.trackInfo} style={{ width: "20%" }}>
        <p className={styles.trackTitle}>{name}</p>
        <p>{artists}</p>
      </td>
      <td style={{ width: "35%" }}>{album}</td>
      <td style={{ width: "5%" }}>{fromMS(duration_ms)}</td>
      {deleteTrack && <DeleteIcon onClick={deleteTrack} style={{margin: "auto"}}/>}
    </tr>
  );
}

export default Tracks;
