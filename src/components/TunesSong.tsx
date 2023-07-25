import "../styles/TunesSong.scss";
import { Song } from "../types/index";
import { truncate } from "lodash-es";
import AudioPlayer from "./AudioPlayer";

function TunesSong(props: { song: Song }) {
  const { song } = props;

  const shorten = (string: string, len = 60) =>
    truncate(string, { length: len });

  return (
    <div className="tunes-song-wrapper">
      <div className="tunes-song">
        {song.artworkUrl100 && (
          <img
            className="album-cover"
            src={song.artworkUrl100}
            alt="album cover"
          />
        )}
        <div className="player-wrapper">
          <h2>{shorten(`${song.trackName} - ${song.artistName}`)}</h2>
          <p className="album">album: {shorten(song.collectionName)}</p>
          <AudioPlayer song={song} />
        </div>
      </div>
    </div>
  );
}

export default TunesSong;
