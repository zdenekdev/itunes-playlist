import { Song } from "../types";
import TunesSong from "./TunesSong";
import "../styles/TunesList.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type Props = {
  musicList: Song[];
};

function TunesList({ musicList }: Props) {
  return (
    <TransitionGroup component="ul" className="tunes-list-wrapper">
      {musicList.map((song, index) => (
        <CSSTransition key={song.trackId} timeout={200} classNames="my-node">
          <li key={song.trackId} className="tunes-li">
            <TunesSong song={song} />
            <div
              className={index !== musicList.length - 1 ? "line" : "last-line"}
            ></div>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TunesList;
