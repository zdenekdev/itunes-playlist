import { useEffect, useState } from "react";
import TheForm from "./components/TheForm";
import TunesList from "./components/TunesList";
import axios from "axios";
import "./App.scss";
import TheIntro from "./components/TheIntro";
import TheFooter from "./components/TheFooter";

type itunesSong = {
  trackId: number;
  artistName: string;
  previewUrl: string;
  artworkUrl100: string;
  trackName: string;
  collectionName: string;
};

const extractData = ({
  trackId,
  artistName,
  previewUrl,
  artworkUrl100,
  trackName,
  collectionName,
}: itunesSong) => {
  return {
    trackId,
    artistName,
    previewUrl,
    artworkUrl100,
    trackName,
    collectionName,
  };
};

function App() {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState("hidden");
  const [emptySearch, setEmptySearch] = useState("emptySearch display-none");

  const getSearchTerm = (term: string) => {
    setLoading("");
    axios
      .get(
        `https://itunes.apple.com/search?term=${encodeURI(
          term
        )}&entity=musicTrack&limit=10`
      )
      .then((response) => {
        let songs = response.data.results.map((song: itunesSong) =>
          extractData(song)
        );
        if (songs.length === 0) {
          setEmptySearch("emptySearch");
        } else {
          setEmptySearch("emptySearch display-none");
        }

        setMusicList(songs);
        setLoading("hidden");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSearchTerm("great");
  }, []);

  console.log(navigator.userAgent);

  return (
    <div className="app">
      {/* <div className="cover"> */}
      <div className="playlist">
        <TheIntro />
        <TheForm
          getSearchTerm={getSearchTerm}
          loading={loading}
          emptySearch={emptySearch}
        />
        <TunesList musicList={musicList} />
        <TheFooter />
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
